/**
 * Base error class for Skylight API errors
 */
export declare class SkylightError extends Error {
    code: string;
    statusCode?: number | undefined;
    recoverable: boolean;
    constructor(message: string, code: string, statusCode?: number | undefined, recoverable?: boolean);
}
/**
 * Authentication failed - token may be expired or invalid
 */
export declare class AuthenticationError extends SkylightError {
    constructor(message?: string);
}
/**
 * Configuration error - missing or invalid settings
 */
export declare class ConfigurationError extends SkylightError {
    constructor(message: string);
}
/**
 * Resource not found
 */
export declare class NotFoundError extends SkylightError {
    constructor(resource: string);
}
/**
 * Rate limited by the API
 */
export declare class RateLimitError extends SkylightError {
    constructor(retryAfter?: number);
}
/**
 * API returned an unexpected response format
 */
export declare class ParseError extends SkylightError {
    constructor(message?: string);
}
/**
 * Format an error for MCP tool response
 * Accepts unknown to handle any value from catch blocks safely
 */
export declare function formatErrorForMcp(error: unknown): string;
//# sourceMappingURL=errors.d.ts.map