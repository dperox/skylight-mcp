import { getClient } from "../client.js";
/**
 * Get frame (household) information
 */
export async function getFrame() {
    const client = getClient();
    const response = await client.get("/api/frames/{frameId}");
    return response.data;
}
//# sourceMappingURL=frames.js.map