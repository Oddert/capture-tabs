export interface IUploadItem {
    decisionType: 'discard' | 'export' | 'bookmark' | null;
    original: string;
    url: string;
    reason?: string;
}

export interface IUploadError {
    original: string;
    error: string;
}
