import type { ChoreResource, CategoryResource } from "../types.js";
export interface GetChoresOptions {
    after?: string;
    before?: string;
    includeLate?: boolean;
    filterLinkedToProfile?: boolean;
}
export interface GetChoresResult {
    chores: ChoreResource[];
    categories: CategoryResource[];
}
/**
 * Get chores for a date range
 */
export declare function getChores(options?: GetChoresOptions): Promise<GetChoresResult>;
export interface CreateChoreOptions {
    summary: string;
    start: string;
    startTime?: string;
    status?: string;
    recurring?: boolean;
    recurrenceSet?: string;
    categoryId?: string;
    rewardPoints?: number;
    emojiIcon?: string;
}
/**
 * Create a new chore
 */
export declare function createChore(options: CreateChoreOptions): Promise<ChoreResource>;
export interface UpdateChoreOptions {
    summary?: string;
    start?: string;
    startTime?: string | null;
    status?: string;
    recurring?: boolean;
    recurrenceSet?: string | null;
    categoryId?: string | null;
    rewardPoints?: number | null;
    emojiIcon?: string | null;
}
/**
 * Update an existing chore
 */
export declare function updateChore(choreId: string, options: UpdateChoreOptions): Promise<ChoreResource>;
export interface UpdateChoreTemplateOptions {
    summary?: string;
    reward_points?: number | null;
    emoji_icon?: string | null;
    recurrence_set?: string | null;
    category_id?: string | null;
}
/**
 * Update a recurring chore template without splitting the series.
 *
 * Uses PATCH with a flat body on the base template ID (no date suffix).
 * This updates all future instances of the recurring series, unlike PUT
 * on an instance ID which splits the series.
 */
export declare function updateChoreTemplate(templateId: string, attrs: UpdateChoreTemplateOptions): Promise<ChoreResource>;
/**
 * Delete a chore
 */
export declare function deleteChore(choreId: string, applyTo?: string): Promise<void>;
//# sourceMappingURL=chores.d.ts.map