import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { IUploadError, IUploadItem } from '../../types/Upload.types';

import { parseUploadContent } from '../../utils/uploadUtils';

/**
 * Redux state key for the upload state.
 * @category Redux
 * @subcategory Budget Slice
 */
export interface IUploadState {
    counts: {
        bookmark: number;
        discard: number;
        done: number;
        nextAction: number;
        total: number;
    };
    cursor: number;
    editMode: boolean;
    errors: IUploadError[];
    items: IUploadItem[];
    loaded: boolean;
    raw: string | null;
}

const initialState: IUploadState = {
    counts: {
        bookmark: 0,
        discard: 0,
        done: 0,
        nextAction: 0,
        total: 0,
    },
    cursor: 0,
    editMode: false,
    errors: [],
    items: [],
    loaded: false,
    raw: null,
};

export const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        actionItem(
            state,
            {
                payload,
            }: PayloadAction<{
                bookmark?: IUploadItem['bookmark'];
                decisionType: IUploadItem['decisionType'];
                index: number;
                url: string;
                reason?: IUploadItem['reason'];
            }>,
        ) {
            if (state.items[payload.index].decisionType !== null) {
                state.counts.done -= 1;
                switch (state.items[payload.index].decisionType) {
                    case 'discard':
                        state.counts.discard -= 1;
                        break;
                    case 'bookmark':
                        state.counts.bookmark -= 1;
                        break;
                    case 'export':
                        state.counts.nextAction -= 1;
                        break;
                    default:
                        break;
                }
            }
            state.counts.done += 1;
            switch (payload.decisionType) {
                case 'discard':
                    state.counts.discard += 1;
                    break;
                case 'bookmark':
                    state.counts.bookmark += 1;
                    break;
                case 'export':
                    state.counts.nextAction += 1;
                    break;
                default:
                    break;
            }
            if (payload.bookmark) {
                state.items[payload.index].bookmark = payload.bookmark;
            }
            if (payload.reason) {
                state.items[payload.index].reason = payload.reason;
            }
            state.items[payload.index].decisionType = payload.decisionType;
            state.cursor = state.cursor + 1;
        },
        setCursor(state, action: PayloadAction<{ cursor: number }>) {
            if (
                action.payload.cursor >= 0 &&
                action.payload.cursor <= state.items.length - 1
            ) {
                state.cursor = action.payload.cursor;
            }
        },
        toggleEditMode(state, action: PayloadAction<{ editMode?: boolean }>) {
            state.editMode = Boolean(action.payload.editMode);
        },
        uploadContent(state, action: PayloadAction<{ content: string }>) {
            const { errors, items } = parseUploadContent(
                action.payload.content,
            );
            state.counts = {
                bookmark: 0,
                discard: 0,
                done: 0,
                nextAction: 0,
                total: items.length,
            };
            state.editMode = false;
            state.errors = errors;
            state.items = items;
            state.loaded = true;
            state.raw = action.payload.content;
        },
    },
});

export const { actionItem, setCursor, toggleEditMode, uploadContent } =
    uploadSlice.actions;

export default uploadSlice.reducer;
