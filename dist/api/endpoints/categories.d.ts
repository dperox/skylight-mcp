import type { CategoryResource } from "../types.js";
/**
 * Get all categories (family members/profiles)
 */
export declare function getCategories(useCache?: boolean): Promise<CategoryResource[]>;
/**
 * Clear the categories cache
 */
export declare function clearCategoriesCache(): void;
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
export declare function findCategoryByName(name: string): Promise<CategoryResource | undefined>;
/**
 * Get categories that are linked to profiles (actual family members)
 */
export declare function getFamilyMembers(): Promise<CategoryResource[]>;
/**
 * Get categories selected for the chore chart
 */
export declare function getChoreChartCategories(): Promise<CategoryResource[]>;
//# sourceMappingURL=categories.d.ts.map