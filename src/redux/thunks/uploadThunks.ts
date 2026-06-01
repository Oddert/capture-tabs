import type { AppDispatch, RootState } from '../constants/store';

import { actionItem, setCursor } from '../slices/uploadSlice';

import { intakeError } from './errorThunks';

/**
 * Moves the cursor back one item, if possible. Does not make any assumptions about the state of the item at the new cursor position.
 */
export const decrementCursor =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { cursor } = getState().upload;
            dispatch(setCursor({ cursor: cursor - 1 }));
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
            const { cursor } = getState().upload;
            dispatch(setCursor({ cursor: cursor + 1 }));
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
