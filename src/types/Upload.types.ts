import type { IBookmarkItem } from './Bookmarks.types';

export interface IUploadItem {
    bookmark?: IBookmarkItem;
    decisionType: 'discard' | 'export' | 'bookmark' | null;
    original: string;
    url: string;
    reason?: string;
}

export interface IUploadError {
    original: string;
    error: string;
}
