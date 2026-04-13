import type { IStandardResponse } from '../types/Request.types';
import type { IWatchlist } from '../types/Watchlist.types';

import request from '../common/request';

/**
 * Primary interface for interacting with the Watchlist API.
 *
 * Contains a list of functions for calling endpoints.
 * @category Services
 * @subcategory API Service
 */
const WatchlistService = Object.freeze({
    /**
     * Queries all the user's Watchlists.
     */
    allWatchlists: async () => {
        const response: IStandardResponse & {
            watchlists: IWatchlist[];
        } = await request.get('/watchlist');
        return response;
    },

    /**
     * Creates a new watchlist.
     * @param watchlist The watchlist parameters to create from.
     */
    createWatchlist: async (watchlist: Partial<IWatchlist>) => {
        const response: IStandardResponse & {
            watchlist: IWatchlist;
        } = await request.post('/watchlist', watchlist);
        return response;
    },

    /**
     * Queries the user's default Watchlist.
     */
    defaultWatchlist: async () => {
        const response: IStandardResponse & {
            watchlist: IWatchlist | null;
        } = await request.get('/watchlist/default');
        return response;
    },

    /**
     * Deleted as single Watchlist.
     */
    deletetWatchlist: async (watchlistId: string) => {
        const response: IStandardResponse = await request.delete(
            `/watchlist/${watchlistId}`,
        );
        return response;
    },

    /**
     * Queries a Watchlist by ID.
     * @param watchlistId The ID of the watchlist being requested.
     */
    getById: async (watchlistId: string) => {
        const response: IStandardResponse & {
            watchlist: IWatchlist;
        } = await request.get(`/watchlist/${watchlistId}`);
        return response;
    },

    /**
     * Changes the user's default Watchlist to the current ID.
     * @param watchlistId The ID to attempt to update.
     * @param watchlist The watchlist parameters to update.
     */
    setDefault: async (watchlistId: string) => {
        const response: IStandardResponse & {
            watchlist: IWatchlist;
        } = await request.put(`/watchlist/make-default/${watchlistId}`);
        return response;
    },

    /**
     * Updates a Watchlist by ID.
     * @param watchlistId The ID to attempt to update.
     * @param watchlist The watchlist parameters to update.
     */
    updateWatchlist: async (
        watchlistId: string,
        watchlist: Partial<IWatchlist>,
    ) => {
        const response: IStandardResponse & {
            watchlist: IWatchlist;
        } = await request.put(`/watchlist/${watchlistId}`, watchlist);
        return response;
    },
});

export default WatchlistService;
