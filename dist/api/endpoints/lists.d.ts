import type { ListResource, ListItemResource, UpdateListItemRequest } from "../types.js";
/**
 * Get all lists
 */
export declare function getLists(): Promise<ListResource[]>;
export interface GetListWithItemsResult {
    list: ListResource;
    items: ListItemResource[];
    sections?: unknown[];
}
/**
 * Get a specific list with its items
 */
export declare function getListWithItems(listId: string): Promise<GetListWithItemsResult>;
/**
 * Find a list by name (case-insensitive)
 */
export declare function findListByName(name: string): Promise<ListResource | undefined>;
/**
 * Find a list by type (shopping or to_do)
 */
export declare function findListByType(kind: "shopping" | "to_do", preferDefault?: boolean): Promise<ListResource | undefined>;
/**
 * Create a new list
 */
export declare function createList(label: string, kind: "shopping" | "to_do", color?: string): Promise<ListResource>;
/**
 * Update an existing list
 */
export declare function updateList(listId: string, updates: {
    label?: string;
    kind?: "shopping" | "to_do";
    color?: string | null;
}): Promise<ListResource>;
/**
 * Delete a list
 */
export declare function deleteList(listId: string): Promise<void>;
/**
 * Create a new list item
 * Note: This endpoint uses simple JSON format, not JSON:API like other endpoints
 */
export declare function createListItem(listId: string, label: string, section?: string): Promise<ListItemResource>;
/**
 * Update a list item
 * Note: This endpoint uses simple JSON format, not JSON:API like other endpoints
 */
export declare function updateListItem(listId: string, itemId: string, updates: UpdateListItemRequest): Promise<ListItemResource>;
/**
 * Delete a list item
 */
export declare function deleteListItem(listId: string, itemId: string): Promise<void>;
//# sourceMappingURL=lists.d.ts.map