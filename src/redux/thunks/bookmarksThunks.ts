import type { IBookmarkItem } from '../../types/Bookmarks.types';
import type { AppDispatch, RootState } from '../constants/store';

import { createAndStoreBookmarks } from '../../utils/bookmarkUtils';
import { loadBookmarks } from '../slices/bookmarksSlice';

import { intakeError } from './errorThunks';

/**
 * Reads stored bookmarks from localstorage and writes them to state.
 */
export const refreshBookmarksFromLocalStore =
    () => async (dispatch: AppDispatch) => {
        try {
            const localState = localStorage.getItem('CT_BOOKMARKS');
            if (localState) {
                const parsed = JSON.parse(
                    localState,
                ) as unknown as IBookmarkItem[];
                dispatch(loadBookmarks({ bookmarks: parsed }));
            }
        } catch (error) {
            dispatch(intakeError(error));
        }
    };

/**
 *
 */
export const createBookmarks =
    (newBookmarks: string[]) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const bookmarks = getState().bookmarks.bookmarks;
            const [nextBookmarks] = createAndStoreBookmarks(
                bookmarks,
                newBookmarks,
            );
            dispatch(loadBookmarks({ bookmarks: nextBookmarks }));
        } catch (error) {
            dispatch(intakeError(error));
        }
    };
