import { afterEach, describe, expect, it, vi } from "vitest";

// Token auth avoids the OAuth login flow; fetch is stubbed per test.
// (Config is read lazily on first request, after this module body runs.)
process.env.SKYLIGHT_TOKEN = "test-token";
process.env.SKYLIGHT_FRAME_ID = "123";

import { registerChoreTools } from "../src/tools/chores.js";
import { clearCategoriesCache } from "../src/api/endpoints/categories.js";

type ToolHandler = (args: Record<string, unknown>) => Promise<{
  content: Array<{ type: string; text: string }>;
  isError?: boolean;
}>;

/** Capture tool handlers registered on a fake MCP server. */
function captureTools(): Map<string, ToolHandler> {
  const handlers = new Map<string, ToolHandler>();
  const fakeServer = {
    tool: (name: string, _desc: string, _schema: unknown, handler: ToolHandler) => {
      handlers.set(name, handler);
    },
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerChoreTools(fakeServer as any);
  return handlers;
}

function choresListResponse(
  chores: Array<{ id: string; summary: string; status: string }>
) {
  return new Response(
    JSON.stringify({
      data: chores.map((c) => ({
        id: c.id,
        type: "chore",
        attributes: {
          summary: c.summary,
          status: c.status,
          start: "2026-07-21",
          start_time: null,
          recurring: false,
          reward_points: null,
        },
        relationships: {},
      })),
      included: [],
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

describe("chore tools status mapping", () => {
  afterEach(() => {
    clearCategoriesCache();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("get_chores status=completed matches the API's 'complete' value", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        choresListResponse([
          { id: "1", summary: "Done chore", status: "complete" },
          { id: "2", summary: "Open chore", status: "pending" },
        ])
      )
    );

    const handlers = captureTools();
    const result = await handlers.get("get_chores")!({ status: "completed" });

    const text = result.content[0].text;
    expect(text).toContain("Done chore");
    expect(text).not.toContain("Open chore");
  });

  it("get_chores status=pending still filters pending chores", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        choresListResponse([
          { id: "1", summary: "Done chore", status: "complete" },
          { id: "2", summary: "Open chore", status: "pending" },
        ])
      )
    );

    const handlers = captureTools();
    const result = await handlers.get("get_chores")!({ status: "pending" });

    const text = result.content[0].text;
    expect(text).toContain("Open chore");
    expect(text).not.toContain("Done chore");
  });

  it("update_chore maps status 'completed' to the API's 'complete'", async () => {
    const bodies: Array<Record<string, unknown>> = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_input: string | URL | Request, init?: RequestInit) => {
        if (init?.body) bodies.push(JSON.parse(String(init.body)));
        return new Response(
          JSON.stringify({
            data: { id: "c1", type: "chore", attributes: { summary: "x", status: "complete" } },
          }),
          { status: 200, headers: { "content-type": "application/json" } }
        );
      })
    );

    const handlers = captureTools();
    const result = await handlers.get("update_chore")!({
      choreId: "c1",
      status: "completed",
      applyToSeries: false,
    });

    expect(result.isError).toBeUndefined();
    expect(bodies).toHaveLength(1);
    // The wire value must be "complete" — sending "completed" makes the API 500.
    expect(bodies[0]).toEqual({ status: "complete" });
  });
});
