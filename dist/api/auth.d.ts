/**
 * Skylight Authentication
 * Handles the browser-style OAuth login flow used by Skylight web.
 */
export interface OAuthTokenResponse {
    access_token?: string;
    token?: string;
    token_type?: string;
    scope?: string;
    refresh_token?: string;
    expires_in?: number;
    created_at?: number;
    [key: string]: unknown;
}
export interface AuthResult {
    email: string;
    token: string;
    subscriptionStatus: string | null;
}
/**
 * Login to Skylight with email and password.
 * Replays the same browser OAuth flow observed from Skylight web.
 */
export declare function login(email: string, password: string): Promise<AuthResult>;
/**
 * Get cached auth result or login if needed
 */
export declare function getAuth(email: string, password: string): Promise<AuthResult>;
/**
 * Clear cached auth (for re-login)
 */
export declare function clearAuthCache(): void;
//# sourceMappingURL=auth.d.ts.map