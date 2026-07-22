export interface AvatarResource {
    type: "avatar";
    id: string;
    attributes: {
        name?: string;
        url?: string;
        [key: string]: unknown;
    };
}
export interface ColorResource {
    type: "color";
    id: string;
    attributes: {
        name?: string;
        hex?: string;
        [key: string]: unknown;
    };
}
/**
 * Get available avatar options
 */
export declare function getAvatars(): Promise<AvatarResource[]>;
/**
 * Get available color options
 */
export declare function getColors(): Promise<ColorResource[]>;
//# sourceMappingURL=misc.d.ts.map