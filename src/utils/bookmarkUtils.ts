import { v4 as uuid } from 'uuid';

import type { IBookmarkItem } from '../types/Bookmarks.types';

export const createAndStoreBookmarks = (
    prevBookmarks: IBookmarkItem[],
    newBookmarks: string[],
): [IBookmarkItem[], IBookmarkItem[]] => {
    const bookmarkMap = prevBookmarks.reduce(
        (acc: Record<string, IBookmarkItem>, each) => {
            acc[each.name.trim()] = each;
            return acc;
        },
        {},
    );

    // Loop over all requests to create new BMs, reconcile those which already exist and create new BMs if required.
    const {
        nextBmState,
        createdBookmarks,
    }: {
        /** The next state of the total bookmarks list */
        nextBmState: IBookmarkItem[];
        /** A list of any new bookmarks which have been created. */
        createdBookmarks: IBookmarkItem[];
    } = newBookmarks.reduce(
        (
            acc: {
                nextBmState: IBookmarkItem[];
                createdBookmarks: IBookmarkItem[];
            },
            bookmark,
        ) => {
            const cleanedBm = bookmark.trim();
            // Bookmark already exists in the previous list.
            if (cleanedBm in bookmarkMap) {
                const filteredNextBm = [
                    // Move the previous entry to the front of the array in order to preserve the order of the quick access buttons.
                    bookmarkMap[cleanedBm],
                    ...acc.nextBmState.filter((bm) => bm.name !== cleanedBm),
                ];
                // Do not change the 'createdBookmarks' list as this BM already exists.
                return { ...acc, nextBmState: filteredNextBm };
            }
            const createdBm = {
                name: cleanedBm,
                id: uuid(),
            };
            // BM does not already exist.
            // Create a new BM and add it to both the 'created' list and the front of the total list.
            return {
                createdBookmarks: [createdBm, ...acc.createdBookmarks],
                nextBmState: [createdBm, ...acc.nextBmState],
            };
        },
        {
            nextBmState: [...prevBookmarks],
            createdBookmarks: [],
        },
    );

    localStorage.setItem('CT_BOOKMARKS', JSON.stringify(nextBmState));
    return [nextBmState, createdBookmarks];
};
