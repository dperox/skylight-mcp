import { type Config } from "../config.js";
/**
 * Skylight subscription status types
 */
export type SubscriptionStatus = "plus" | "free" | "trial" | null;
export interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    params?: Record<string, string | boolean | number | undefined>;
    body?: unknown;
}
/**
 * Skylight API Client
 * Handles authentication and HTTP requests to the Skylight API
 */
export declare class SkylightClient {
    private config;
    private resolvedToken;
    private loginPromise;
    private subscriptionStatus;
    constructor(config?: Config);
    /**
     * Get the authentication credentials
     * If using email/password auth, will login first
     */
    private getCredentials;
    /**
     * Perform login and return token and userId
     */
    private performLogin;
    /**
     * Build the Authorization header
     * Email/password auth now resolves to an OAuth bearer token.
     * Manual token auth still respects the configured auth type.
     */
    private getAuthHeader;
    /**
     * Build URL with query parameters
     */
    private buildUrl;
    /**
     * Handle API response errors
     */
    private handleResponseError;
    /**
     * Make an authenticated request to the Skylight API
     */
    request<T>(endpoint: string, options?: RequestOptions, isRetry?: boolean): Promise<T>;
    /**
     * GET request helper
     */
    get<T>(endpoint: string, params?: Record<string, string | boolean | number | undefined>): Promise<T>;
    /**
     * POST request helper
     */
    post<T>(endpoint: string, body: unknown): Promise<T>;
    /**
     * Get the frame ID from config
     */
    get frameId(): string;
    /**
     * Get the timezone from config
     */
    get timezone(): string;
    /**
     * Check if user has Plus subscription
     */
    hasPlus(): boolean;
    /**
     * Get the subscription status
     */
    getSubscriptionStatus(): SubscriptionStatus;
    /**
     * Initialize the client (triggers login if using email/password auth)
     */
    initialize(): Promise<void>;
}
export declare function getClient(): SkylightClient;
/**
 * Initialize the client singleton and return it
 * This triggers login if using email/password auth
 */
export declare function initializeClient(): Promise<SkylightClient>;
//# sourceMappingURL=client.d.ts.map