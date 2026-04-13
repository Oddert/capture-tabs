import type { AppDispatch } from '../constants/store';

import WatchlistService from '../../services/watchlist.service';
import { instancesError } from '../slices/instanceSlice';
import {
    changeDefault,
    watchlistsLoading,
    writeAllWatchlists,
} from '../slices/watchlistSlice';

import { intakeError } from './errorThunks';

/**
 * Performs a full load for all user's Watchlist instances.
 * @category Redux
 * @subcategory Thunks
 */
export const fetchAllWatchlists = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(watchlistsLoading());
        const response = await WatchlistService.allWatchlists();
        if (response.status === 200) {
            dispatch(
                writeAllWatchlists({
                    watchlists: response.watchlists,
                }),
            );
        }
    } catch (error) {
        dispatch(instancesError());
        dispatch(intakeError(error));
    }
};

/**
 * Changes the user's default Watchlist to the one matching the supplied ID.
 * @category Redux
 * @subcategory Thunks
 * @param watchlistId The ID of the Watchlist to set as default.
 */
export const changeDefaultWatchlist =
    (watchlistId: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(watchlistsLoading());
            const response = await WatchlistService.setDefault(watchlistId);
            if (response.status === 201) {
                dispatch(
                    changeDefault({
                        watchlist: response.watchlist,
                    }),
                );
            }
        } catch (error) {
            dispatch(instancesError());
            dispatch(intakeError(error));
        }
    };
