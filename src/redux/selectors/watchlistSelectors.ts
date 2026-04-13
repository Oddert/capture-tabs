import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../constants/store';

/**
 * Returns the 'instance' section of the redux state.
 * @category Redux
 * @subcategory Selectors
 */
const getWatchlistState = (state: RootState) => state.watchlist;

/**
 * Returns all of the user's Watchlists.
 * @category Redux
 * @subcategory Selectors
 */
export const allWatchlists = createSelector(
    getWatchlistState,
    (watchlistState) => watchlistState.watchlists,
);

/**
 * Returns the the user's default Watchlist.
 * @category Redux
 * @subcategory Selectors
 */
export const defaultWatchlist = createSelector(
    getWatchlistState,
    (watchlistState) => watchlistState.defaultWatchlist,
);

/**
 * True if the Instance request is pending.
 * @category Redux
 * @subcategory Selectors
 */
export const watchlistsLoading = createSelector(
    getWatchlistState,
    (watchlistState) => watchlistState.loading,
);
