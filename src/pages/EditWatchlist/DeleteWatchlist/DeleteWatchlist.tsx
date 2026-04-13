import { type FC, Fragment, useState } from 'react';

import { Error as IconError } from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

import type { IProps } from './DeleteWatchlist.types';

import LoadingIndicator from '../../../components/LoadingIndicator';
import router, { ROUTES } from '../../../constants/routerConstants';
import { useAppDispatch } from '../../../hooks/ReduxHookWrappers';
import { deleteWatchlist } from '../../../redux/slices/watchlistSlice';
import { intakeError } from '../../../redux/thunks/errorThunks';
import WatchlistService from '../../../services/watchlist.service';

/**
 * Presents a Delete Watchlist button with a modal to confirm delete.
 * @component
 * @category Components
 * @subcategory Delete Watchlist
 * @param props.watchlistId The ID of the Watchlist to potentially be deleted.
 */
const DeleteWatchlist: FC<IProps> = ({ watchlistId }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const handleClickDelete = () => {
        const request = async () => {
            setLoading(true);
            try {
                await WatchlistService.deletetWatchlist(watchlistId);
                dispatch(deleteWatchlist({ watchlistId }));
                setLoading(false);
                setOpen(false);
                router.navigate(ROUTES.WATCHLISTS);
            } catch (error) {
                dispatch(intakeError(error));
                setLoading(false);
            }
        };
        request();
    };

    return (
        <Fragment>
            <Button
                onClick={() => {
                    setOpen(true);
                }}
                color='error'
                size='large'
            >
                Delete watchlist
            </Button>
            <Dialog
                onClose={() => {
                    setOpen(false);
                }}
                open={open}
                sx={(theme) => ({
                    '& .MuiPaper-root': {
                        backgroundColor: theme.palette.error.light,
                        minWidth: '50vw',
                        borderLeft: `15px solid ${theme.palette.error.dark}`,
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                        padding: '16px 16px 0 16px',
                        '& *': {
                            color: theme.palette.common.black,
                        },
                    },
                })}
            >
                <Box sx={{ padding: '16px 24px' }}>
                    <IconError sx={{ width: '40px', height: '40px' }} />
                </Box>
                <DialogTitle variant='h2'>Delete Watchlist?</DialogTitle>
                <DialogContent sx={{ gridColumn: 2 }}>
                    <DialogContentText>
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                {loading ? (
                    <DialogActions sx={{ gridColumn: 2 }}>
                        <LoadingIndicator />
                    </DialogActions>
                ) : (
                    <DialogActions sx={{ gridColumn: 2 }}>
                        <Button
                            onClick={() => {
                                setOpen(false);
                            }}
                            size='large'
                            sx={(theme) => ({
                                color: theme.palette.error.contrastText,
                            })}
                        >
                            Cancel
                        </Button>
                        <Button
                            color='error'
                            onClick={handleClickDelete}
                            size='large'
                            sx={(theme) => ({
                                color: theme.palette.error.contrastText,
                            })}
                            variant='outlined'
                        >
                            Delete
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        </Fragment>
    );
};

export default DeleteWatchlist;
