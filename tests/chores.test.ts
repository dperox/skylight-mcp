import { afterEach, describe, expect, it, vi } from "vitest";

// Token auth avoids the OAuth login flow; fetch is stubbed per test.
process.env.SKYLIGHT_TOKEN = "test-token";
process.env.SKYLIGHT_FRAME_ID = "123";

import { updateChore, deleteChore } from "../src/api/endpoints/chores.js";

interface Captured {
  method: string;
  url: string;
  body: Record<string, unknown> | null;
}

function choreResponse(attrs: Record<string, unknown>) {
  return new Response(
    JSON.stringify({ data: { id: "c1", type: "chore", attributes: attrs } }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

function stubFetch(handler: (c: Captured) => Response, sink: Captured[]) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
      const captured: Captured = {
        method: init?.method ?? "GET",
        url,
        body: init?.body ? JSON.parse(String(init.body)) : null,
      };
      sink.push(captured);
      return handler(captured);
    })
  );
}

describe("updateChore", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("sends a flat body (not JSON:API) for a simple attribute update", async () => {
    const calls: Captured[] = [];
    stubFetch(() => choreResponse({ summary: "New" }), calls);

    await updateChore("c1", { summary: "New" });

    expect(calls).toHaveLength(1);
    expect(calls[0].method).toBe("PUT");
    // Flat: top-level summary, no JSON:API "data" wrapper.
    expect(calls[0].body).toEqual({ summary: "New" });
    expect(calls[0].body).not.toHaveProperty("data");
  });

  it("maps a category reassignment to flat category_id / category_ids", async () => {
    const calls: Captured[] = [];
    stubFetch(() => choreResponse({ summary: "x" }), calls);

    await updateChore("c1", { categoryId: "42" });

    expect(calls[0].body).toEqual({ category_id: "42", category_ids: ["42"] });
  });

  it("splits status and non-status attributes into two sequential PUTs", async () => {
    const calls: Captured[] = [];
    stubFetch(() => choreResponse({ summary: "Edited", status: "complete" }), calls);

    await updateChore("c1", { summary: "Edited", status: "complete" });

    // The API rejects changing status + other fields at once, so we split.
    expect(calls).toHaveLength(2);
    expect(calls[0].body).toEqual({ summary: "Edited" });
    expect(calls[1].body).toEqual({ status: "complete" });
  });

  it("sends a single request when only status changes", async () => {
    const calls: Captured[] = [];
    stubFetch(() => choreResponse({ status: "complete" }), calls);

    await updateChore("c1", { status: "complete" });

    expect(calls).toHaveLength(1);
    expect(calls[0].body).toEqual({ status: "complete" });
  });

  it("still returns the chore for a no-op update with no fields", async () => {
    const calls: Captured[] = [];
    stubFetch(() => choreResponse({ summary: "Unchanged" }), calls);

    const chore = await updateChore("c1", {});

    expect(calls).toHaveLength(1);
    expect(calls[0].body).toEqual({});
    expect(chore.attributes.summary).toBe("Unchanged");
  });
});

describe("deleteChore", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("does not throw when the API returns 200 with an empty body", async () => {
    const calls: Captured[] = [];
    stubFetch(() => new Response("", { status: 200 }), calls);

    await expect(deleteChore("c1")).resolves.toBeUndefined();
    expect(calls[0].method).toBe("DELETE");
  });

  it("does not throw on a 204 No Content response", async () => {
    const calls: Captured[] = [];
    stubFetch(() => new Response(null, { status: 204 }), calls);

    await expect(deleteChore("c1")).resolves.toBeUndefined();
  });
});
