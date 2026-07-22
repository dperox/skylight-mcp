export interface AlbumResource {
    type: "album";
    id: string;
    attributes: {
        name?: string;
        [key: string]: unknown;
    };
}
/**
 * Get photo albums
 */
export declare function getAlbums(): Promise<AlbumResource[]>;
//# sourceMappingURL=photos.d.ts.map