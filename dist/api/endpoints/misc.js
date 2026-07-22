import { getClient } from "../client.js";
/**
 * Get available avatar options
 */
export async function getAvatars() {
    const client = getClient();
    const response = await client.get("/api/avatars");
    return response.data;
}
/**
 * Get available color options
 */
export async function getColors() {
    const client = getClient();
    const response = await client.get("/api/colors");
    return response.data;
}
//# sourceMappingURL=misc.js.map