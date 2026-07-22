import { getClient } from "../client.js";
/**
 * Get photo albums
 */
export async function getAlbums() {
    const client = getClient();
    const response = await client.get("/api/frames/{frameId}/albums");
    return response.data;
}
//# sourceMappingURL=photos.js.map