import { getClient } from "../client.js";
/**
 * Get all Skylight devices in the household
 */
export async function getDevices() {
    const client = getClient();
    const response = await client.get("/api/frames/{frameId}/devices");
    return response.data;
}
//# sourceMappingURL=devices.js.map