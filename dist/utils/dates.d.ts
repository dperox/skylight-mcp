/**
 * Date utility functions for Skylight MCP
 */
/**
 * Get today's date in YYYY-MM-DD format
 */
export declare function getTodayDate(timezone?: string): string;
/**
 * Get a date N days from today in YYYY-MM-DD format
 */
export declare function getDateOffset(days: number, timezone?: string): string;
/**
 * Parse a date string to YYYY-MM-DD format
 * Accepts: YYYY-MM-DD, MM/DD/YYYY, or natural language like "today", "tomorrow"
 */
export declare function parseDate(input: string, timezone?: string): string;
/**
 * Parse a time string to HH:MM format (24-hour)
 * Accepts: "10:00", "10:00 AM", "2:30 PM", "14:30"
 */
export declare function parseTime(input: string): string;
/**
 * Format a date for display
 */
export declare function formatDateForDisplay(dateStr: string): string;
//# sourceMappingURL=dates.d.ts.map