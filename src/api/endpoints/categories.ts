import { getClient } from "../client.js";
import type { CategoriesResponse, CategoryResource } from "../types.js";

// Cache for categories (family members)
let categoriesCache: CategoryResource[] | null = null;

/**
 * Get all categories (family members/profiles)
 */
export async function getCategories(useCache = true): Promise<CategoryResource[]> {
  if (useCache && categoriesCache) {
    return categoriesCache;
  }

  const client = getClient();
  const response = await client.get<CategoriesResponse>("/api/frames/{frameId}/categories");
  categoriesCache = response.data;
  return response.data;
}

/**
 * Clear the categories cache
 */
export function clearCategoriesCache(): void {
  categoriesCache = null;
}

/**
 * Find a category by name (case-insensitive).
 * Categories represent family members like "Dad", "Mom", "Kids", etc.
 *
 * An exact label match always wins. Only if there is no exact match do we
 * fall back to a partial match, and even then we prefer a real family member
 * (a profile or chore-chart category) over an unrelated calendar/source
 * category that merely contains the text. This prevents "Sam" from resolving
 * to a "Samantha Jones" calendar category: the API accepts a chore created
 * against such a category with a 200 but never shows it on the chore chart.
 */
export async function findCategoryByName(name: string): Promise<CategoryResource | undefined> {
  const categories = await getCategories();
  const lowerName = name.toLowerCase();

  // 1. Exact (case-insensitive) label match.
  const exact = categories.find((cat) => cat.attributes.label?.toLowerCase() === lowerName);
  if (exact) {
    return exact;
  }

  // 2. Partial match, preferring real family members over other categories.
  const partial = categories.filter((cat) => cat.attributes.label?.toLowerCase().includes(lowerName));
  const preferred = partial.find(
    (cat) => cat.attributes.linked_to_profile || cat.attributes.selected_for_chore_chart
  );
  return preferred ?? partial[0];
}

/**
 * Get categories that are linked to profiles (actual family members)
 */
export async function getFamilyMembers(): Promise<CategoryResource[]> {
  const categories = await getCategories();
  return categories.filter((cat) => cat.attributes.linked_to_profile);
}

/**
 * Get categories selected for the chore chart
 */
export async function getChoreChartCategories(): Promise<CategoryResource[]> {
  const categories = await getCategories();
  return categories.filter((cat) => cat.attributes.selected_for_chore_chart);
}
