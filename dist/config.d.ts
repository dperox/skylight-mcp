import { z } from "zod";
declare const ConfigSchema: z.ZodEffects<z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    token: z.ZodOptional<z.ZodString>;
    authType: z.ZodDefault<z.ZodEnum<["bearer", "basic"]>>;
    frameId: z.ZodString;
    timezone: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    authType: "bearer" | "basic";
    frameId: string;
    timezone: string;
    email?: string | undefined;
    password?: string | undefined;
    token?: string | undefined;
}, {
    frameId: string;
    email?: string | undefined;
    password?: string | undefined;
    token?: string | undefined;
    authType?: "bearer" | "basic" | undefined;
    timezone?: string | undefined;
}>, {
    authType: "bearer" | "basic";
    frameId: string;
    timezone: string;
    email?: string | undefined;
    password?: string | undefined;
    token?: string | undefined;
}, {
    frameId: string;
    email?: string | undefined;
    password?: string | undefined;
    token?: string | undefined;
    authType?: "bearer" | "basic" | undefined;
    timezone?: string | undefined;
}>;
export type Config = z.infer<typeof ConfigSchema>;
export interface ResolvedConfig {
    token: string;
    frameId: string;
    timezone: string;
    authType: "bearer" | "basic";
}
export declare function loadConfig(): Config;
export declare function getConfig(): Config;
/**
 * Check if config uses managed OAuth login via email/password
 */
export declare function usesEmailAuth(config: Config): boolean;
export {};
//# sourceMappingURL=config.d.ts.map