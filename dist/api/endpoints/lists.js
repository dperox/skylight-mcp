import { getClient } from "../client.js";
/**
 * Get all lists
 */
export async function getLists() {
    const client = getClient();
    const response = await client.get("/api/frames/{frameId}/lists");
    return response.data;
}
/**
 * Get a specific list with its items
 */
export async function getListWithItems(listId) {
    const client = getClient();
    const response = await client.get(`/api/frames/{frameId}/lists/${listId}`);
    return {
        list: response.data,
        items: response.included ?? [],
        sections: response.meta?.sections,
    };
}
/**
 * Find a list by name (case-insensitive)
 */
export async function findListByName(name) {
    const lists = await getLists();
    const lowerName = name.toLowerCase();
    return lists.find((list) => list.attributes.label.toLowerCase().includes(lowerName));
}
/**
 * Find a list by type (shopping or to_do)
 */
export async function findListByType(kind, preferDefault = true) {
    const lists = await getLists();
    const filtered = lists.filter((list) => list.attributes.kind === kind);
    if (preferDefault && kind === "shopping") {
        const defaultList = filtered.find((list) => list.attributes.default_grocery_list);
        if (defaultList)
            return defaultList;
    }
    return filtered[0];
}
/**
 * Create a new list
 */
export async function createList(label, kind, color) {
    const client = getClient();
    const request = {
        data: {
            type: "list",
            attributes: {
                label,
                kind,
                color: color ?? null,
            },
        },
    };
    const response = await client.post("/api/frames/{frameId}/lists", request);
    return response.data;
}
/**
 * Update an existing list
 */
export async function updateList(listId, updates) {
    const client = getClient();
    const request = {
        data: {
            type: "list",
            attributes: updates,
        },
    };
    const response = await client.request(`/api/frames/{frameId}/lists/${listId}`, {
        method: "PUT",
        body: request,
    });
    return response.data;
}
/**
 * Delete a list
 */
export async function deleteList(listId) {
    const client = getClient();
    await client.request(`/api/frames/{frameId}/lists/${listId}`, { method: "DELETE" });
}
/**
 * Create a new list item
 * Note: This endpoint uses simple JSON format, not JSON:API like other endpoints
 */
export async function createListItem(listId, label, section) {
    const client = getClient();
    const request = {
        label,
        section: section ?? null,
    };
    const response = await client.post(`/api/frames/{frameId}/lists/${listId}/list_items`, request);
    return response.data;
}
/**
 * Update a list item
 * Note: This endpoint uses simple JSON format, not JSON:API like other endpoints
 */
export async function updateListItem(listId, itemId, updates) {
    const client = getClient();
    const response = await client.request(`/api/frames/{frameId}/lists/${listId}/list_items/${itemId}`, { method: "PUT", body: updates });
    return response.data;
}
/**
 * Delete a list item
 */
export async function deleteListItem(listId, itemId) {
    const client = getClient();
    await client.request(`/api/frames/{frameId}/lists/${listId}/list_items/${itemId}`, {
        method: "DELETE",
    });
}
//# sourceMappingURL=lists.js.map