import { getClient } from "../client.js";
/**
 * Get chores for a date range
 */
export async function getChores(options = {}) {
    const client = getClient();
    const params = {
        after: options.after,
        before: options.before,
        include_late: options.includeLate,
    };
    if (options.filterLinkedToProfile) {
        params.filter = "linked_to_profile";
    }
    const response = await client.get("/api/frames/{frameId}/chores", params);
    return {
        chores: response.data,
        categories: response.included ?? [],
    };
}
/**
 * Create a new chore
 */
export async function createChore(options) {
    const client = getClient();
    // The Skylight API uses a flat request body (not JSON:API format)
    const body = {
        summary: options.summary,
        start: options.start,
        start_time: options.startTime ?? null,
        recurring: options.recurring ?? false,
        reward_points: options.rewardPoints ?? null,
        emoji_icon: options.emojiIcon ?? null,
    };
    if (options.categoryId) {
        body.category_id = options.categoryId;
        body.category_ids = [options.categoryId];
    }
    if (options.recurrenceSet) {
        body.recurrence_set = [options.recurrenceSet];
    }
    // create_multiple returns { data: ChoreResource[] }
    const response = await client.post("/api/frames/{frameId}/chores/create_multiple", body);
    return response.data[0];
}
/**
 * Update an existing chore
 */
export async function updateChore(choreId, options) {
    const client = getClient();
    // The Skylight API expects a FLAT request body for PUT (not JSON:API
    // format). A wrapped { data: { type, attributes } } body is accepted with a
    // 200 but silently applies nothing.
    const body = {};
    if (options.summary !== undefined)
        body.summary = options.summary;
    if (options.start !== undefined)
        body.start = options.start;
    if (options.startTime !== undefined)
        body.start_time = options.startTime;
    if (options.status !== undefined)
        body.status = options.status;
    if (options.recurring !== undefined)
        body.recurring = options.recurring;
    if (options.recurrenceSet !== undefined)
        body.recurrence_set = options.recurrenceSet;
    if (options.rewardPoints !== undefined)
        body.reward_points = options.rewardPoints;
    if (options.emojiIcon !== undefined)
        body.emoji_icon = options.emojiIcon;
    // Reassignment: the flat body takes category_id / category_ids directly.
    if (options.categoryId !== undefined) {
        body.category_id = options.categoryId;
        body.category_ids = options.categoryId === null ? [] : [options.categoryId];
    }
    const url = `/api/frames/{frameId}/chores/${choreId}`;
    // The API rejects (400) a PUT that changes the completion status AND other
    // attributes in the same request ("you can either update the completion
    // status, or update non-completion attributes, but not both at the same
    // time"). Split into two sequential requests when needed.
    const { status, ...rest } = body;
    let response;
    if (Object.keys(rest).length > 0) {
        response = await client.request(url, { method: "PUT", body: rest });
    }
    if (status !== undefined) {
        response = await client.request(url, { method: "PUT", body: { status } });
    }
    // If no fields were provided, fall through to a no-op PUT so callers still
    // get the current chore back.
    if (!response) {
        response = await client.request(url, { method: "PUT", body: {} });
    }
    return response.data;
}
/**
 * Update a recurring chore template without splitting the series.
 *
 * Uses PATCH with a flat body on the base template ID (no date suffix).
 * This updates all future instances of the recurring series, unlike PUT
 * on an instance ID which splits the series.
 */
export async function updateChoreTemplate(templateId, attrs) {
    const client = getClient();
    const body = {};
    if (attrs.summary !== undefined)
        body.summary = attrs.summary;
    if (attrs.reward_points !== undefined)
        body.reward_points = attrs.reward_points;
    if (attrs.emoji_icon !== undefined)
        body.emoji_icon = attrs.emoji_icon;
    if (attrs.recurrence_set !== undefined)
        body.recurrence_set = attrs.recurrence_set;
    if (attrs.category_id !== undefined)
        body.category_id = attrs.category_id;
    const response = await client.request(`/api/frames/{frameId}/chores/${templateId}`, { method: "PATCH", body });
    return response.data;
}
/**
 * Delete a chore
 */
export async function deleteChore(choreId, applyTo) {
    const client = getClient();
    const url = applyTo
        ? `/api/frames/{frameId}/chores/${choreId}?apply_to=${encodeURIComponent(applyTo)}`
        : `/api/frames/{frameId}/chores/${choreId}`;
    await client.request(url, { method: "DELETE" });
}
//# sourceMappingURL=chores.js.map