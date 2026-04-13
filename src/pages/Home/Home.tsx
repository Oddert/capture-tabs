import { useEffect, useState } from 'react';

import { Autocomplete, Box, TextField } from '@mui/material';

import type { IWatchlist } from '../../types/Watchlist.types';

import InstanceDisplay from '../../components/InstanceDisplay';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHookWrappers';
import useWatchlist from '../../hooks/useWatchlist';
import { instancesLoading } from '../../redux/selectors/instanceSelectors';
import { defaultWatchlist } from '../../redux/selectors/watchlistSelectors';
import { createWatchlist } from '../../utils/factories';

// import './Home.css';
// import ResponsiveContainer from '../../hocs/ResponsiveContainer';

/**
 * Main home page component.
 *
 * Displays a series of Modules as composable cards.
 * @component
 * @category Pages
 * @subcategory Home
 */
const Home = () => {
    const dispatch = useAppDispatch();

    const defaultWL = useAppSelector(defaultWatchlist);
    const loading = useAppSelector(instancesLoading);

    const [selectedWL, setSelectedWL] = useState<IWatchlist>(createWatchlist());
    const { instances, watchlists } = useWatchlist(selectedWL.watchlistId);

    useEffect(() => {
        if (defaultWL) {
            setSelectedWL(defaultWL);
        }
    }, [defaultWL]);

    useEffect(() => {
        dispatch({ type: 'socket/connect' });
        return () => {
            dispatch({ type: 'socket/disconnect' });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        //  <ResponsiveContainer>
        <Box
            sx={{
                height: '200vh',
                gridGap: '20px',
                // border: '1px dashed tomato',
                width: '100%',
                mx: 'auto',
                // gridAutoRows: '400px',
            }}
        >
            {/* <Typography
                sx={{ gridColumn: '1/-1', textAlign: 'left', mb: 4 }}
                variant='h2'
            >
                Welcome
            </Typography> */}
            <Autocomplete
                getOptionKey={(opt) => opt.watchlistId}
                getOptionLabel={(opt) => opt.title}
                onChange={(_, nextWatchlist) => {
                    if (nextWatchlist) {
                        setSelectedWL(nextWatchlist);
                    }
                }}
                options={watchlists}
                sx={{ minWidth: '300px', mb: 4 }}
                renderInput={(props) => (
                    <TextField variant='standard' {...props} />
                )}
                value={selectedWL}
            />
            <InstanceDisplay
                highlightAlerts
                instances={instances}
                loading={loading}
            />
            {/* </ResponsiveContainer> */}
        </Box>
    );
};

export default Home;
