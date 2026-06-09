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
}

const initialState: IBookmarkState = {
    bookmarks: [],
    loaded: false,
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
        },
    },
});

export const { loadBookmarks } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
