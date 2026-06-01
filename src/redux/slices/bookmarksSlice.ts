import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { IBookmarkItem } from '../../types/Bookmarks.types';

/**
 * Redux state key for the bookmarks state.
 * @category Redux
 * @subcategory Budget Slice
 */
export interface IBookmarkState {
    bookmarks: IBookmarkItem[];
    loaded: boolean;
    recent: IBookmarkItem[];
}

const initialState: IBookmarkState = {
    bookmarks: [],
    loaded: false,
    recent: [],
};

export const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        loadBookmarks(
            state,
            { payload }: PayloadAction<{ bookmarks: IBookmarkItem[] }>,
        ) {
            state.bookmarks = payload.bookmarks;
            state.loaded = true;
            state.recent = payload.bookmarks.slice(0, 5);
        },
        pushLastBookmark(
            state,
            { payload }: PayloadAction<{ bookmark: IBookmarkItem }>,
        ) {
            state.recent = [payload.bookmark, ...state.recent.slice(0, 4)];
        },
    },
});

export const { loadBookmarks, pushLastBookmark } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
