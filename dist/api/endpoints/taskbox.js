import { getClient } from "../client.js";
/**
 * Create a task box item
 * Task box items are unscheduled tasks that can later be assigned to specific dates
 */
export async function createTaskBoxItem(options) {
    const client = getClient();
    const request = {
        data: {
            type: "task_box_item",
            attributes: {
                summary: options.summary,
                emoji_icon: options.emojiIcon ?? null,
                routine: options.routine ?? false,
                reward_points: options.rewardPoints ?? null,
            },
        },
    };
    const response = await client.post("/api/frames/{frameId}/task_box/items", request);
    return response.data;
}
//# sourceMappingURL=taskbox.js.map