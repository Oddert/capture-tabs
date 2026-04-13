import { type FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChevronLeft as IconBackArrow } from '@mui/icons-material';
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    FormControlLabel,
    Snackbar,
    Switch,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';

import type { IProps } from './EditWatchlist.types';
import type { IInstance } from '../../types/Instance.types';
import type { IWatchlist } from '../../types/Watchlist.types';

import LoadingIndicator from '../../components/LoadingIndicator';
import router from '../../constants/routerConstants';
import ResponsiveContainer from '../../hocs/ResponsiveContainer';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHookWrappers';
import { listAllInstances } from '../../redux/selectors/instanceSelectors';
import {
    createWatchlist,
    updateWatchlist,
} from '../../redux/slices/watchlistSlice';
import { intakeError } from '../../redux/thunks/errorThunks';
import WatchlistService from '../../services/watchlist.service';
import { createWatchlist as createBlankWatchlist } from '../../utils/factories';

import DeleteWatchlist from './DeleteWatchlist';

/**
 * Presents the edit form to create or update a Watchlist.
 *
 * To update, the form will detect `watchlistId` form the query parameters.
 * @component
 * @category Pages
 * @subcategory Edit Watchlist
 */
const EditWatchlist: FC<IProps> = () => {
    const [stagedWatchlist, setStagedWatchlist] = useState<IWatchlist>(
        createBlankWatchlist({
            title: `New watchlist ${new Date().toLocaleString('en-GB')}`,
        }),
    );
    const [instances, setInstances] = useState<IInstance[]>([]);
    const [loading, setLoading] = useState(false);
    const [isEdit, steIsEdit] = useState(false);
    const [message, setMessage] = useState<null | string>(null);

    const allInstances = useAppSelector(listAllInstances);

    const dispatch = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        setLoading(true);
        try {
            const fetchWatchlist = async (watchlistId: string) => {
                const response = await WatchlistService.getById(watchlistId);
                setStagedWatchlist(response.watchlist);
                setInstances(
                    allInstances.filter((instance) =>
                        response.watchlist.instances.includes(instance.pcfGuid),
                    ),
                );
                setLoading(false);
            };
            if ('watchlistId' in params) {
                fetchWatchlist(String(params.watchlistId));
                steIsEdit(true);
            } else {
                steIsEdit(false);
                setLoading(false);
            }
        } catch (error) {
            dispatch(intakeError(error));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allInstances]);

    const handleClickSave = () => {
        const request = async () => {
            setLoading(true);
            try {
                if (isEdit) {
                    const response = await WatchlistService.updateWatchlist(
                        stagedWatchlist.watchlistId,
                        {
                            ...stagedWatchlist,
                            instances: instances.map(
                                (instance) => instance.pcfGuid,
                            ),
                        },
                    );
                    if (response.status === 200 || response.status === 201) {
                        setStagedWatchlist(response.watchlist);
                        setInstances(
                            allInstances.filter((instance) =>
                                response.watchlist.instances.includes(
                                    instance.pcfGuid,
                                ),
                            ),
                        );
                        setLoading(false);
                        setMessage('Watchlist saved');
                        dispatch(
                            updateWatchlist({ watchlist: response.watchlist }),
                        );
                    }
                } else {
                    const response = await WatchlistService.createWatchlist({
                        ...stagedWatchlist,
                        instances: instances.map(
                            (instance) => instance.pcfGuid,
                        ),
                    });
                    if (response.status === 200 || response.status === 201) {
                        setStagedWatchlist(response.watchlist);
                        setInstances(
                            allInstances.filter((instance) =>
                                response.watchlist.instances.includes(
                                    instance.pcfGuid,
                                ),
                            ),
                        );
                        setLoading(false);
                        steIsEdit(true);
                        dispatch(
                            createWatchlist({ watchlist: response.watchlist }),
                        );
                        setMessage('Watchlist created successfully');
                    }
                }
            } catch (error) {
                setLoading(false);
                dispatch(intakeError(error));
            }
        };
        request();
    };

    return (
        <ResponsiveContainer>
            <Button
                onClick={() => {
                    router.navigate(-1);
                }}
            >
                <IconBackArrow /> Back
            </Button>
            <Typography variant='h2'>
                {isEdit ? 'Edit' : 'Create a new'} Watchlist
            </Typography>
            <Dialog open={loading}>
                <LoadingIndicator />
            </Dialog>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gridGap: '24px',
                    mt: 6,
                }}
            >
                <Tooltip title='If selected, this Watchlist will appear on your homepage'>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={stagedWatchlist.isDefault}
                                onChange={(_, checked) => {
                                    setStagedWatchlist({
                                        ...stagedWatchlist,
                                        isDefault: checked,
                                    });
                                }}
                            />
                        }
                        label='Homepage default watchlist'
                    />
                </Tooltip>
                <FormControlLabel
                    control={
                        <TextField
                            fullWidth
                            onChange={(event) => {
                                setStagedWatchlist({
                                    ...stagedWatchlist,
                                    title: event.target.value,
                                });
                            }}
                            value={stagedWatchlist.title}
                        />
                    }
                    label='Watchlist Title'
                    labelPlacement='top'
                />
                <FormControlLabel
                    control={
                        <TextField
                            fullWidth
                            multiline
                            minRows={2}
                            onChange={(event) => {
                                setStagedWatchlist({
                                    ...stagedWatchlist,
                                    description: event.target.value,
                                });
                            }}
                            value={stagedWatchlist.description}
                        />
                    }
                    label='Description (optional)'
                    labelPlacement='top'
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Button
                            onClick={() => {
                                setInstances(allInstances);
                            }}
                        >
                            Add all instances
                        </Button>
                        <Button
                            onClick={() => {
                                setInstances([]);
                            }}
                        >
                            Clear instance list
                        </Button>
                    </Box>
                    <FormControlLabel
                        control={
                            <Autocomplete
                                fullWidth
                                getOptionKey={(opt) => opt.pcfGuid}
                                getOptionLabel={(opt) =>
                                    opt.readableName !== opt.pcfAppName
                                        ? `${opt.readableName} (${opt.pcfAppName})`
                                        : opt.pcfAppName
                                }
                                multiple
                                onChange={(_, value) => {
                                    setInstances(value);
                                }}
                                options={allInstances}
                                renderInput={(props) => (
                                    <TextField {...props} />
                                )}
                                value={instances}
                            />
                        }
                        label='Instances to include'
                        labelPlacement='top'
                    />
                </Box>
                <Button
                    onClick={handleClickSave}
                    size='large'
                    sx={{ alignSelf: 'flex-end' }}
                    variant='contained'
                >
                    {isEdit ? 'Save' : 'Create Watchlist'}
                </Button>
            </Box>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                {isEdit ? (
                    <DeleteWatchlist
                        watchlistId={stagedWatchlist.watchlistId}
                    />
                ) : null}
            </Box>
            <Snackbar
                autoHideDuration={2000}
                message={message}
                onClose={() => {
                    setMessage(null);
                }}
                open={Boolean(message)}
            />
        </ResponsiveContainer>
    );
};

export default EditWatchlist;
