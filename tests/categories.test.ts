import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Token auth avoids the OAuth login flow; fetch is stubbed per test.
process.env.SKYLIGHT_TOKEN = "test-token";
process.env.SKYLIGHT_FRAME_ID = "123";

import { findCategoryByName, clearCategoriesCache } from "../src/api/endpoints/categories.js";

function categoriesResponse(cats: Array<{ id: string; label: string; profile?: boolean; chart?: boolean }>) {
  return new Response(
    JSON.stringify({
      data: cats.map((c) => ({
        id: c.id,
        type: "category",
        attributes: {
          label: c.label,
          linked_to_profile: c.profile ?? false,
          selected_for_chore_chart: c.chart ?? false,
        },
      })),
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

describe("findCategoryByName", () => {
  beforeEach(() => {
    clearCategoriesCache();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("prefers an exact label match over a partial one that appears first", async () => {
    // "Samantha Jones" (a calendar category) contains "sam" and comes first,
    // but the exact "Sam" chore-chart member must win.
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        categoriesResponse([
          { id: "1", label: "Samantha Jones", profile: false, chart: false },
          { id: "2", label: "Sam", profile: true, chart: true },
        ])
      )
    );

    const cat = await findCategoryByName("Sam");
    expect(cat?.id).toBe("2");
  });

  it("is case-insensitive for exact matches", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => categoriesResponse([{ id: "5", label: "Dad", profile: true, chart: true }]))
    );

    const cat = await findCategoryByName("dad");
    expect(cat?.id).toBe("5");
  });

  it("falls back to a partial match, preferring a real family member", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        categoriesResponse([
          { id: "10", label: "Jewish Holidays", profile: false, chart: false },
          { id: "11", label: "Holidays in Israel", profile: false, chart: false },
          { id: "12", label: "Holiday Helper", profile: true, chart: true },
        ])
      )
    );

    // No exact "holiday" match; prefer the profile/chore-chart category.
    const cat = await findCategoryByName("holiday");
    expect(cat?.id).toBe("12");
  });

  it("returns undefined when nothing matches", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => categoriesResponse([{ id: "1", label: "Mom", profile: true, chart: true }]))
    );

    expect(await findCategoryByName("Nobody")).toBeUndefined();
  });
});
