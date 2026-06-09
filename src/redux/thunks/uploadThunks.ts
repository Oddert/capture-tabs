import type { IBookmarkItem } from '../../types/Bookmarks.types';
import type { AppDispatch, RootState } from '../constants/store';

import { createAndStoreBookmarks } from '../../utils/bookmarkUtils';
import { openLinkInNewTab } from '../../utils/uploadUtils';
import { loadBookmarks } from '../slices/bookmarksSlice';
import { actionItem, setCursor, toggleReviewMode } from '../slices/uploadSlice';

import { intakeError } from './errorThunks';

/**
 * Moves the cursor back one item, if possible. Does not make any assumptions about the state of the item at the new cursor position.
 */
export const decrementCursor =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { cursor } = getState().upload;
            if (cursor > 0) {
                dispatch(setCursor({ cursor: cursor - 1 }));
            }
        } catch (error) {
            dispatch(intakeError(error));
        }
    };

/**
 * Moves the cursor forward one item, if possible. Does not make any assumptions about the state of the item at the new cursor position.
 */
export const incrementCursor =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { cursor, items } = getState().upload;
            if (cursor === items.length - 1) {
                dispatch(toggleReviewMode({ reviewMode: true }));
            } else {
                dispatch(setCursor({ cursor: cursor + 1 }));
            }
        } catch (error) {
            dispatch(intakeError(error));
        }
    };

/**
 * Discards the current item, and moves the cursor forward one item. If the current item has already been decided, just moves the cursor forward one item.
 */
export const actionDiscard =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { cursor, items } = getState().upload;
            dispatch(
                actionItem({
                    index: cursor,
                    url: items[cursor].url,
                    decisionType: 'discard',
                }),
            );
        } catch (error) {
            dispatch(intakeError(error));
        }
    };

/**
 * Default action for next item - if no decision has been made, discard. Otherwise, move the cursor on, expecting that the user is browsing items.
 */
export const actionDefaultNextItem =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { cursor, items } = getState().upload;
            const currentItem = items[cursor];
            if (currentItem.decisionType === null) {
                dispatch(actionDiscard());
            } else {
                dispatch(incrementCursor());
            }
        } catch (error) {
            dispatch(intakeError(error));
        }
    };

export const actionCreateNextAction =
    (text?: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { cursor, items } = getState().upload;
            dispatch(
                actionItem({
                    decisionType: 'export',
                    index: cursor,
                    url: items[cursor].url,
                    reason: text,
                }),
            );
        } catch (error) {
            dispatch(intakeError(error));
        }
    };

export const actionBookmark =
    (bookmark: string | IBookmarkItem, nextAction?: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const state = getState();
            const { bookmarks } = state.bookmarks;
            const { cursor, items } = state.upload;

            if (typeof bookmark === 'string') {
                // NOTE: passive provision is created in `createAndStoreBookmarks` for multiple BMs at once.
                // As we are only using it for one item here we can use indexes to address the created item.
                // If this functionality is adapted to multiple BMs, consideration will need to be given as to how to resolve created BMs with the incoming list.
                const [nextBookmarks, createdBookmarks] =
                    createAndStoreBookmarks(bookmarks, [bookmark]);
                dispatch(loadBookmarks({ bookmarks: nextBookmarks }));
                dispatch(
                    actionItem({
                        bookmark: createdBookmarks[0],
                        decisionType: 'bookmark',
                        index: cursor,
                        url: items[cursor].url,
                        reason: nextAction,
                    }),
                );
            } else {
                const foundBm = bookmarks.find((bm) => bm.id === bookmark.id);
                if (foundBm) {
                    dispatch(
                        actionItem({
                            bookmark: foundBm,
                            decisionType: 'bookmark',
                            index: cursor,
                            url: items[cursor].url,
                            reason: nextAction,
                        }),
                    );
                }
            }
        } catch (error) {
            dispatch(intakeError(error));
        }
    };

export const actionBookmarkQuickDial =
    (index: string | number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const indexParsed = Number(index);
            const { bookmarks } = getState().bookmarks;

            const foundBm = bookmarks[indexParsed];

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (foundBm) {
                dispatch(actionBookmark(foundBm, undefined));
            }
        } catch (error) {
            dispatch(intakeError(error));
        }
    };

export const previewLinkNewTab =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { items, cursor } = getState().upload;

            const item = items[cursor];

            openLinkInNewTab(item.url);
        } catch (error) {
            dispatch(intakeError(error));
        }
    };
