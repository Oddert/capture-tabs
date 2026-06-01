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
    errors: [],
    items: [],
    loaded: false,
    raw: null,
};

export const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
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
            state.errors = errors;
            state.items = items;
            state.loaded = true;
            state.raw = action.payload.content;
        },
    },
});

export const { uploadContent } = uploadSlice.actions;

export default uploadSlice.reducer;
