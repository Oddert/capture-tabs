export interface IUploadItem {
    original: string;
    url: string;
    decisionType: 'discard' | 'export' | 'bookmark' | null;
}

export interface IUploadError {
    original: string;
    error: string;
}
