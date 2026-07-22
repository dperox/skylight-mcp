import { getClient } from "../client.js";
/**
 * Get rewards (items that can be redeemed with points)
 */
export async function getRewards(options = {}) {
    const client = getClient();
    const response = await client.get("/api/frames/{frameId}/rewards", {
        redeemed_at_min: options.redeemedAtMin,
    });
    return response.data;
}
/**
 * Get reward points for family members
 * Returns a plain array (not JSON:API format)
 */
export async function getRewardPoints() {
    const client = getClient();
    return client.get("/api/frames/{frameId}/reward_points");
}
/**
 * Add (or subtract) points for a family member
 */
export async function addRewardPoints(categoryIds, points) {
    const client = getClient();
    return client.post("/api/frames/{frameId}/reward_points", {
        category_ids: categoryIds,
        points,
    });
}
/**
 * Create a new reward
 */
export async function createReward(options) {
    const client = getClient();
    // API uses flat JSON body, not JSON:API format. category_ids is required.
    const body = {
        name: options.name,
        point_value: options.pointValue,
        description: options.description ?? null,
        emoji_icon: options.emojiIcon ?? null,
        respawn_on_redemption: options.respawnOnRedemption ?? false,
        category_ids: options.categoryIds ?? [],
    };
    // Response is { data: RewardResource[] }
    const response = await client.post("/api/frames/{frameId}/rewards", body);
    return response.data[0];
}
/**
 * Update an existing reward
 */
export async function updateReward(rewardId, options) {
    const client = getClient();
    const request = {
        data: {
            type: "reward",
            attributes: {},
        },
    };
    if (options.name !== undefined)
        request.data.attributes.name = options.name;
    if (options.pointValue !== undefined)
        request.data.attributes.point_value = options.pointValue;
    if (options.description !== undefined)
        request.data.attributes.description = options.description;
    if (options.emojiIcon !== undefined)
        request.data.attributes.emoji_icon = options.emojiIcon;
    if (options.respawnOnRedemption !== undefined) {
        request.data.attributes.respawn_on_redemption = options.respawnOnRedemption;
    }
    if (options.categoryIds) {
        request.data.relationships = {
            categories: {
                data: options.categoryIds.map((id) => ({ type: "category", id })),
            },
        };
    }
    const response = await client.request(`/api/frames/{frameId}/rewards/${rewardId}`, { method: "PATCH", body: request });
    return response.data;
}
/**
 * Delete a reward
 */
export async function deleteReward(rewardId) {
    const client = getClient();
    await client.request(`/api/frames/{frameId}/rewards/${rewardId}`, {
        method: "DELETE",
    });
}
/**
 * Redeem a reward (spend points)
 */
export async function redeemReward(rewardId, categoryId) {
    const client = getClient();
    const body = categoryId ? { category_id: categoryId } : {};
    const response = await client.post(`/api/frames/{frameId}/rewards/${rewardId}/redeem`, body);
    return response.data;
}
/**
 * Unredeem a reward (cancel redemption)
 */
export async function unredeemReward(rewardId) {
    const client = getClient();
    const response = await client.post(`/api/frames/{frameId}/rewards/${rewardId}/unredeem`, {});
    return response.data;
}
//# sourceMappingURL=rewards.js.map