import { useMemo } from 'react';

import { listAllInstances } from '../redux/selectors/instanceSelectors';
import { allWatchlists } from '../redux/selectors/watchlistSelectors';

import { useAppSelector } from './ReduxHookWrappers';

/**
 * Provides a subset of all held Instances by attempting to filter on watchlistId.
 *
 * If no ID is provided or the ID is invalid, all instances will be returned, making it functionally the same as the {@link listAllInstances} selector
 *
 * If the watchlist is found but no instances match, and empty array will be returned.
 * @category Hooks
 * @subcategory useContentWidth
 */
const useWatchlist = (watchlistId?: string | null) => {
    const allInstances = useAppSelector(listAllInstances);
    const watchlists = useAppSelector(allWatchlists);

    const watchlist = useMemo(
        () =>
            watchlists.find(
                (watchlist) => watchlist.watchlistId === watchlistId,
            ),
        [watchlists, watchlistId],
    );

    const instances = useMemo(() => {
        if (watchlist) {
            return allInstances.filter((instance) => {
                return watchlist.instances.includes(instance.pcfGuid);
            });
        }
        return allInstances;
    }, [allInstances, watchlist]);

    return { instances, watchlist, watchlists };
};

export default useWatchlist;
