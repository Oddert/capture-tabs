import { v4 as uuid } from 'uuid';

import type { IBookmarkItem } from '../types/Bookmarks.types';

export const createAndStoreBookmarks = (
    prevBookmarks: IBookmarkItem[],
    newBookmarks: string[],
): [IBookmarkItem[], IBookmarkItem[]] => {
    const createdBookmarks = newBookmarks.map((bookmark) => ({
        name: bookmark,
        id: String(uuid()),
    }));
    const nextBookmarks: IBookmarkItem[] = [
        ...prevBookmarks,
        ...createdBookmarks,
    ];
    localStorage.setItem('CT_BOOKMARKS', JSON.stringify(nextBookmarks));
    return [nextBookmarks, createdBookmarks];
};
