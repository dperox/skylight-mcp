import type { RewardResource } from "../types.js";
export interface GetRewardsOptions {
    redeemedAtMin?: string;
}
/**
 * Get rewards (items that can be redeemed with points)
 */
export declare function getRewards(options?: GetRewardsOptions): Promise<RewardResource[]>;
export interface RewardPointBalance {
    category_id: number;
    current_point_balance: number;
    lifetime_points_earned: number;
}
/**
 * Get reward points for family members
 * Returns a plain array (not JSON:API format)
 */
export declare function getRewardPoints(): Promise<RewardPointBalance[]>;
/**
 * Add (or subtract) points for a family member
 */
export declare function addRewardPoints(categoryIds: string[], points: number): Promise<RewardPointBalance[]>;
export interface CreateRewardOptions {
    name: string;
    pointValue: number;
    description?: string;
    emojiIcon?: string;
    categoryIds?: string[];
    respawnOnRedemption?: boolean;
}
/**
 * Create a new reward
 */
export declare function createReward(options: CreateRewardOptions): Promise<RewardResource>;
export interface UpdateRewardOptions {
    name?: string;
    pointValue?: number;
    description?: string | null;
    emojiIcon?: string | null;
    categoryIds?: string[];
    respawnOnRedemption?: boolean;
}
/**
 * Update an existing reward
 */
export declare function updateReward(rewardId: string, options: UpdateRewardOptions): Promise<RewardResource>;
/**
 * Delete a reward
 */
export declare function deleteReward(rewardId: string): Promise<void>;
/**
 * Redeem a reward (spend points)
 */
export declare function redeemReward(rewardId: string, categoryId?: string): Promise<RewardResource>;
/**
 * Unredeem a reward (cancel redemption)
 */
export declare function unredeemReward(rewardId: string): Promise<RewardResource>;
//# sourceMappingURL=rewards.d.ts.map