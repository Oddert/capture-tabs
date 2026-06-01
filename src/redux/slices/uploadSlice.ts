import { createSlice } from '@reduxjs/toolkit';

/**
 * Redux state key for 'error'
 * @category Redux
 * @subcategory Budget Slice
 */
export interface IUploadState {
    dialogOpen: boolean;
    title: string;
    message: string;
    error: string;
    stackTrace: string;
    timestamp: number;
}

const initialState: IUploadState = {
    dialogOpen: false,
    title: '',
    message: '',
    error: '',
    stackTrace: '',
    timestamp: 0,
};

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        clearError(state) {
            state.dialogOpen = false;
            state.title = '';
            state.message = '';
            state.error = '';
            state.stackTrace = '';
        },
    },
});

export const { clearError } = errorSlice.actions;

export default errorSlice.reducer;
