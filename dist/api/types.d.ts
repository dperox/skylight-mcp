/**
 * TypeScript types for Skylight API responses (JSON:API format)
 */
export interface JsonApiResourceId {
    type: string;
    id: string;
}
export interface JsonApiResponse<D, I = unknown> {
    data: D;
    included?: I[];
    meta?: Record<string, unknown>;
}
export interface CategoryAttributes {
    label: string | null;
    color: string | null;
    selected_for_chore_chart: boolean | null;
    linked_to_profile: boolean | null;
    profile_pic_url: string | null;
}
export interface CategoryResource {
    type: "category";
    id: string;
    attributes: CategoryAttributes;
}
export interface ChoreAttributes {
    id?: number | null;
    summary: string;
    status: string;
    start: string;
    start_time: string | null;
    completed_on: string | null;
    is_future: boolean | null;
    recurring: boolean;
    recurring_until: string | null;
    recurrence_set: string | null;
    reward_points: number | null;
    emoji_icon: string | null;
    routine: boolean | null;
    position: number | null;
}
export interface ChoreRelationships {
    category?: {
        data: JsonApiResourceId | null;
    };
}
export interface ChoreResource {
    type: "chore";
    id: string;
    attributes: ChoreAttributes;
    relationships?: ChoreRelationships;
}
export interface ListAttributes {
    label: string;
    color: string | null;
    kind: "shopping" | "to_do";
    default_grocery_list: boolean;
}
export interface ListRelationships {
    list_items?: {
        data: JsonApiResourceId[];
    };
}
export interface ListResource {
    type: "list";
    id: string;
    attributes: ListAttributes;
    relationships?: ListRelationships;
}
export interface ListItemAttributes {
    label: string;
    status: "pending" | "completed";
    section: string | null;
    position: number | null;
    created_at: string | null;
}
export interface ListItemResource {
    type: "list_item";
    id: string;
    attributes: ListItemAttributes;
}
export interface TaskBoxItemAttributes {
    id?: number | null;
    summary: string;
    emoji_icon: string | null;
    routine: boolean | null;
    reward_points: number | null;
}
export interface TaskBoxItemResource {
    type: "task_box_item";
    id: string;
    attributes: TaskBoxItemAttributes;
}
export interface FrameAttributes {
    [key: string]: unknown;
}
export interface FrameResource {
    type: "frame";
    id: string;
    attributes: FrameAttributes;
}
export interface SourceCalendarAttributes {
    [key: string]: unknown;
}
export interface SourceCalendarResource {
    type: "source_calendar";
    id: string;
    attributes: SourceCalendarAttributes;
}
export interface CalendarEventAttributes {
    [key: string]: unknown;
}
export interface CalendarEventResource {
    type: "calendar_event";
    id: string;
    attributes: CalendarEventAttributes;
}
export interface DeviceAttributes {
    [key: string]: unknown;
}
export interface DeviceResource {
    type: "device";
    id: string;
    attributes: DeviceAttributes;
}
export interface RewardAttributes {
    [key: string]: unknown;
}
export interface RewardResource {
    type: "reward";
    id: string;
    attributes: RewardAttributes;
}
export interface RewardPointEntry {
    category_id: number;
    current_point_balance: number;
    lifetime_points_earned: number;
}
export type ChoresResponse = JsonApiResponse<ChoreResource[], CategoryResource>;
export type ChoreResponse = JsonApiResponse<ChoreResource, CategoryResource>;
export type ListsResponse = JsonApiResponse<ListResource[]>;
export type ListResponse = JsonApiResponse<ListResource, ListItemResource>;
export type CategoriesResponse = JsonApiResponse<CategoryResource[]>;
export type DevicesResponse = JsonApiResponse<DeviceResource[]>;
export type FrameResponse = JsonApiResponse<FrameResource>;
export type SourceCalendarsResponse = JsonApiResponse<SourceCalendarResource[]>;
export type CalendarEventsResponse = JsonApiResponse<CalendarEventResource[], CategoryResource | SourceCalendarResource>;
export type TaskBoxItemResponse = JsonApiResponse<TaskBoxItemResource>;
export type RewardsResponse = JsonApiResponse<RewardResource[]>;
export interface CreateTaskBoxItemRequest {
    data: {
        type: "task_box_item";
        attributes: Partial<TaskBoxItemAttributes>;
    };
}
export interface CreateListRequest {
    data: {
        type: "list";
        attributes: {
            label: string;
            kind: "shopping" | "to_do";
            color?: string | null;
        };
    };
}
export interface UpdateListRequest {
    data: {
        type: "list";
        attributes: Partial<{
            label: string;
            kind: "shopping" | "to_do";
            color: string | null;
        }>;
    };
}
export interface CreateListItemRequest {
    label: string;
    section?: string | null;
}
export interface UpdateListItemRequest {
    label?: string;
    status?: "pending" | "completed";
    section?: string | null;
    position?: number | null;
}
export type ListItemResponse = JsonApiResponse<ListItemResource>;
export interface CreateCalendarEventRequest {
    summary: string;
    starts_at: string;
    ends_at: string;
    all_day?: boolean;
    description?: string;
    location?: string;
    category_ids?: string[];
    calendar_account_id?: string;
    calendar_id?: string;
    rrule?: string[] | null;
    timezone?: string;
    countdown_enabled?: boolean;
    kind?: string;
}
export interface UpdateCalendarEventRequest {
    summary?: string;
    starts_at?: string;
    ends_at?: string;
    all_day?: boolean;
    description?: string;
    location?: string;
    category_ids?: string[];
    rrule?: string[] | null;
    timezone?: string;
    countdown_enabled?: boolean;
}
export type CalendarEventResponse = JsonApiResponse<CalendarEventResource>;
export interface CreateRewardRequest {
    data: {
        type: "reward";
        attributes: {
            name: string;
            description?: string | null;
            emoji_icon?: string | null;
            point_value: number;
            respawn_on_redemption?: boolean;
        };
        relationships?: {
            categories?: {
                data: JsonApiResourceId[];
            };
        };
    };
}
export interface UpdateRewardRequest {
    data: {
        type: "reward";
        attributes: Partial<{
            name: string;
            description: string | null;
            emoji_icon: string | null;
            point_value: number;
            respawn_on_redemption: boolean;
        }>;
        relationships?: {
            categories?: {
                data: JsonApiResourceId[];
            };
        };
    };
}
export type RewardResponse = JsonApiResponse<RewardResource>;
//# sourceMappingURL=types.d.ts.map