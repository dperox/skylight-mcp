export interface MealCategoryResource {
    type: "meal_category";
    id: string;
    attributes: {
        name?: string;
        position?: number;
        [key: string]: unknown;
    };
}
export interface MealRecipeResource {
    type: "meal_recipe";
    id: string;
    attributes: {
        summary?: string;
        description?: string | null;
        [key: string]: unknown;
    };
    relationships?: {
        meal_category?: {
            data: {
                type: string;
                id: string;
            } | null;
        };
    };
}
export interface MealSittingResource {
    type: "meal_sitting";
    id: string;
    attributes: {
        date?: string;
        meal_time?: string;
        [key: string]: unknown;
    };
    relationships?: {
        meal_recipe?: {
            data: {
                type: string;
                id: string;
            } | null;
        };
    };
}
/**
 * Get meal categories (Breakfast, Lunch, Dinner, etc.)
 */
export declare function getMealCategories(): Promise<MealCategoryResource[]>;
export interface GetRecipesOptions {
    include?: string;
}
/**
 * Get all recipes
 */
export declare function getRecipes(options?: GetRecipesOptions): Promise<MealRecipeResource[]>;
/**
 * Get a specific recipe
 */
export declare function getRecipe(recipeId: string): Promise<MealRecipeResource>;
export interface CreateRecipeOptions {
    summary: string;
    description?: string;
    mealCategoryId?: string;
}
/**
 * Create a new recipe
 */
export declare function createRecipe(options: CreateRecipeOptions): Promise<MealRecipeResource>;
export interface UpdateRecipeOptions {
    summary?: string;
    description?: string | null;
    mealCategoryId?: string | null;
}
/**
 * Update a recipe
 */
export declare function updateRecipe(recipeId: string, options: UpdateRecipeOptions): Promise<MealRecipeResource>;
/**
 * Delete a recipe
 */
export declare function deleteRecipe(recipeId: string): Promise<void>;
/**
 * Add recipe ingredients to grocery list
 */
export declare function addRecipeToGroceryList(recipeId: string): Promise<void>;
export interface GetMealSittingsOptions {
    dateMin?: string;
    dateMax?: string;
}
/**
 * Get meal sittings (scheduled meals)
 */
export declare function getMealSittings(options?: GetMealSittingsOptions): Promise<MealSittingResource[]>;
export interface CreateMealSittingOptions {
    date: string;
    mealCategoryId: string;
    recipeId?: string;
}
/**
 * Create a meal sitting (schedule a meal)
 */
export declare function createMealSitting(options: CreateMealSittingOptions): Promise<MealSittingResource>;
//# sourceMappingURL=meals.d.ts.map