import type { TaskBoxItemResource } from "../types.js";
export interface CreateTaskBoxItemOptions {
    summary: string;
    emojiIcon?: string;
    routine?: boolean;
    rewardPoints?: number;
}
/**
 * Create a task box item
 * Task box items are unscheduled tasks that can later be assigned to specific dates
 */
export declare function createTaskBoxItem(options: CreateTaskBoxItemOptions): Promise<TaskBoxItemResource>;
//# sourceMappingURL=taskbox.d.ts.map