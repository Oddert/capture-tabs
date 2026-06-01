import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../constants/store';

/**
 * Returns the 'upload' section of the redux state.
 * @category Redux
 * @subcategory Selectors
 */
export const getUploadState = (state: RootState) => state.upload;

/**
 * Returns whether the upload state has been loaded.
 * @category Redux
 * @subcategory Selectors
 */
export const getIsUploaded = createSelector(
    getUploadState,
    (upload) => upload.loaded,
);

/**
 * Returns the upload counts.
 * @category Redux
 * @subcategory Selectors
 */
export const getUploadCounts = createSelector(
    getUploadState,
    (upload) => upload.counts,
);

/**
 * Returns the upload items.
 * @category Redux
 * @subcategory Selectors
 */
export const getUploadItems = createSelector(
    getUploadState,
    (upload) => upload.items,
);

/**
 * Returns the upload errors.
 * @category Redux
 * @subcategory Selectors
 */
export const getUploadErrors = createSelector(
    getUploadState,
    (upload) => upload.errors,
);
