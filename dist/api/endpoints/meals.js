import { getClient } from "../client.js";
/**
 * Get meal categories (Breakfast, Lunch, Dinner, etc.)
 */
export async function getMealCategories() {
    const client = getClient();
    const response = await client.get("/api/frames/{frameId}/meals/categories");
    return response.data;
}
/**
 * Get all recipes
 */
export async function getRecipes(options = {}) {
    const client = getClient();
    const response = await client.get("/api/frames/{frameId}/meals/recipes", { include: options.include ?? "meal_category" });
    return response.data;
}
/**
 * Get a specific recipe
 */
export async function getRecipe(recipeId) {
    const client = getClient();
    const response = await client.get(`/api/frames/{frameId}/meals/recipes/${recipeId}`, { include: "meal_category" });
    return response.data;
}
/**
 * Create a new recipe
 */
export async function createRecipe(options) {
    const client = getClient();
    const body = {
        summary: options.summary,
        description: options.description ?? null,
    };
    if (options.mealCategoryId) {
        body.meal_category_id = options.mealCategoryId;
    }
    const response = await client.post("/api/frames/{frameId}/meals/recipes", body);
    return response.data;
}
/**
 * Update a recipe
 */
export async function updateRecipe(recipeId, options) {
    const client = getClient();
    const body = {};
    if (options.summary !== undefined)
        body.summary = options.summary;
    if (options.description !== undefined)
        body.description = options.description;
    if (options.mealCategoryId !== undefined)
        body.meal_category_id = options.mealCategoryId;
    const response = await client.request(`/api/frames/{frameId}/meals/recipes/${recipeId}`, { method: "PATCH", body });
    return response.data;
}
/**
 * Delete a recipe
 */
export async function deleteRecipe(recipeId) {
    const client = getClient();
    await client.request(`/api/frames/{frameId}/meals/recipes/${recipeId}`, {
        method: "DELETE",
    });
}
/**
 * Add recipe ingredients to grocery list
 */
export async function addRecipeToGroceryList(recipeId) {
    const client = getClient();
    await client.post(`/api/frames/{frameId}/meals/recipes/${recipeId}/add_to_grocery_list`, {});
}
/**
 * Get meal sittings (scheduled meals)
 */
export async function getMealSittings(options = {}) {
    const client = getClient();
    const params = {};
    if (options.dateMin)
        params.date_min = options.dateMin;
    if (options.dateMax)
        params.date_max = options.dateMax;
    const response = await client.get("/api/frames/{frameId}/meals/sittings", params);
    return response.data;
}
/**
 * Create a meal sitting (schedule a meal)
 */
export async function createMealSitting(options) {
    const client = getClient();
    const body = {
        date: options.date,
        meal_category_id: options.mealCategoryId,
    };
    if (options.recipeId) {
        body.meal_recipe_id = options.recipeId;
    }
    const response = await client.post("/api/frames/{frameId}/meals/sittings", body);
    return response.data;
}
//# sourceMappingURL=meals.js.map