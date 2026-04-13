import { type FC, useState } from 'react';

import {
    Add as IconAdd,
    ChevronRight as IconRightArrow,
} from '@mui/icons-material';
import { Box, Button, Chip, ListItem, Paper, Typography } from '@mui/material';

import type { IProps } from './Watchlists.types';
import type { TDynamicCardLayoutModes } from '../../types/Common.types';

import DynamicCardList from '../../components/DynamicCardList';
import LayoutControls from '../../components/LayoutControls';
import router, {
    ROUTES,
    ROUTES_FACTORY,
} from '../../constants/routerConstants';
import ResponsiveContainer from '../../hocs/ResponsiveContainer';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHookWrappers';
import { allWatchlists } from '../../redux/selectors/watchlistSelectors';
import { changeDefaultWatchlist } from '../../redux/thunks/watchlistThunks';

/**
 * Displays all user Watchlists and allows them to edit.
 * @category Pages
 * @subcategory Watchlists
 * @component
 */
const Watchlists: FC<IProps> = () => {
    const [layout, setLayout] = useState<TDynamicCardLayoutModes>('standard');
    const watchlists = useAppSelector(allWatchlists);
    const dispatch = useAppDispatch();
    return (
        <ResponsiveContainer>
            <Typography variant='h2'>Watchlists</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gridGap: '16px',
                }}
            >
                <Button
                    onClick={() => {
                        router.navigate(ROUTES.CREATE_WATCHLIST);
                    }}
                    variant='contained'
                >
                    <IconAdd /> Create Watchlist
                </Button>
                <LayoutControls layout={layout} setLayout={setLayout} />
            </Box>
            <DynamicCardList layout={layout}>
                {watchlists.map((watchlist) => (
                    <ListItem
                        key={watchlist.watchlistId}
                        sx={{ height: '100%' }}
                    >
                        <Paper
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                p: 2,
                            }}
                        >
                            {watchlist.isDefault ? (
                                <Chip
                                    color='success'
                                    label='Default'
                                    size='medium'
                                    sx={{ alignSelf: 'flex-end' }}
                                />
                            ) : (
                                <Chip
                                    label='Make default'
                                    onClick={() => {
                                        dispatch(
                                            changeDefaultWatchlist(
                                                watchlist.watchlistId,
                                            ),
                                        );
                                    }}
                                    size='medium'
                                    sx={{ alignSelf: 'flex-end' }}
                                />
                            )}
                            <Button
                                onClick={() => {
                                    router.navigate(
                                        ROUTES_FACTORY.EDIT_WATCHLIST(
                                            watchlist.watchlistId,
                                        ),
                                    );
                                }}
                                sx={(theme) => ({
                                    height: '100%',
                                    display: 'flex',
                                    color: theme.palette.text.primary,
                                })}
                            >
                                <Box
                                    sx={{
                                        flex: 1,
                                        alignSelf: 'stretch',
                                    }}
                                >
                                    <Typography textAlign={'left'} variant='h3'>
                                        {watchlist.title}
                                    </Typography>
                                    {watchlist.description ? (
                                        <Typography textAlign={'left'}>
                                            {watchlist.description}
                                        </Typography>
                                    ) : null}
                                    <Typography textAlign={'left'}>
                                        {watchlist.instances.length} instances
                                    </Typography>
                                </Box>
                                <IconRightArrow />
                            </Button>
                        </Paper>
                    </ListItem>
                ))}
                <ListItem sx={{ alignSelf: 'stretch' }}>
                    <Button
                        onClick={() => {
                            router.navigate(ROUTES.CREATE_WATCHLIST);
                        }}
                        sx={{ width: '100%', height: '100%' }}
                        variant='outlined'
                    >
                        <IconAdd /> Add Watchlist
                    </Button>
                </ListItem>
            </DynamicCardList>
        </ResponsiveContainer>
    );
};

export default Watchlists;
