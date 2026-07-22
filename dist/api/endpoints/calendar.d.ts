import type { CalendarEventResource, SourceCalendarResource, CreateCalendarEventRequest, UpdateCalendarEventRequest } from "../types.js";
export interface GetCalendarEventsOptions {
    dateMin: string;
    dateMax: string;
    timezone?: string;
    include?: string;
}
/**
 * Get calendar events for a date range
 * Note: The API treats date_max as exclusive, so we add 1 day to include events on the end date
 */
export declare function getCalendarEvents(options: GetCalendarEventsOptions): Promise<CalendarEventResource[]>;
/**
 * Get source calendars (connected calendar accounts)
 */
export declare function getSourceCalendars(): Promise<SourceCalendarResource[]>;
/**
 * Create a calendar event
 */
export declare function createCalendarEvent(data: CreateCalendarEventRequest): Promise<CalendarEventResource>;
/**
 * Update a calendar event
 */
export declare function updateCalendarEvent(eventId: string, data: UpdateCalendarEventRequest): Promise<CalendarEventResource>;
/**
 * Delete a calendar event
 */
export declare function deleteCalendarEvent(eventId: string): Promise<void>;
//# sourceMappingURL=calendar.d.ts.map