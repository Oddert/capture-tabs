import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../constants/store';

/**
 * Returns the 'instance' section of the redux state.
 * @category Redux
 * @subcategory Selectors
 */
const getInstanceState = (state: RootState) => state.instance;

/**
 * Returns the list of all the user's instances.
 * @category Redux
 * @subcategory Selectors
 */
export const listAllInstances = createSelector(
    getInstanceState,
    (instanceState) => instanceState.instances,
);

/**
 * True if the Instance request is pending.
 * @category Redux
 * @subcategory Selectors
 */
export const instancesLoading = createSelector(
    getInstanceState,
    (instanceState) => instanceState.loading,
);

/**
 * Retrieves the organisation name mapping.
 * @category Redux
 * @subcategory Selectors
 */
export const orgNames = createSelector(
    getInstanceState,
    (instanceState) => instanceState.orgNames,
);
