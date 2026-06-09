import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../constants/store';

/**
 * Returns the 'bookmarks' section of the redux state.
 * @category Redux
 * @subcategory Selectors
 */
export const getBookmarkState = (state: RootState) => state.bookmarks;

/**
 * Returns whether the bookmarks state has been loaded.
 * @category Redux
 * @subcategory Selectors
 */
export const getBookmarksLoaded = createSelector(
    getBookmarkState,
    (bookmarks) => bookmarks.loaded,
);

/**
 * Returns the list of all held bookmarks.
 * @category Redux
 * @subcategory Selectors
 */
export const getBookmarksList = createSelector(
    getBookmarkState,
    (bookmarks) => bookmarks.bookmarks,
);

/**
 * Returns the list of recently used bookmarks.
 * @category Redux
 * @subcategory Selectors
 */
export const getBookmarksRecent = createSelector(
    getBookmarkState,
    (bookmarks) => bookmarks.bookmarks.slice(0, 9),
);
