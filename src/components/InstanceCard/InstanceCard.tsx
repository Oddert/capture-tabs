import { type FC, Fragment, useEffect, useMemo, useRef, useState } from 'react';

import { EditSquare as IconEdit } from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogContent,
    Paper,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';

import type { IProps } from './InstanceCard.types';

import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHookWrappers';
import { orgNames } from '../../redux/selectors/instanceSelectors';
import { clearFlash } from '../../redux/slices/instanceSlice';
import { getRagCSSColour, getRagColourCode } from '../../utils/ragUtils';
import { displayTimeFrom } from '../../utils/timeUtils';

import TaskList from './TaskList/TaskList';
import EditDetailsForm from './components/EditDetailsForm';
import RefreshButton from './components/RefreshButton';

/**
 * Displays a single Instance as a card.
 * @category Components
 * @subcategory Instance Card
 * @component
 * @param props.instance The Instance to display.
 */
const InstanceCard: FC<IProps> = ({ instance }) => {
    const [lastChange, setLastChange] = useState('');
    const [lastUpdate, setLastUpdate] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogEditMode, setDialogEditMode] = useState(false);

    const organisationNames = useAppSelector(orgNames);

    const dispatch = useAppDispatch();
    const ref = useRef(0);
    const theme = useTheme();

    const orgName = useMemo(
        () =>
            instance.pcfOrganisationId in organisationNames ? (
                <Chip
                    label={organisationNames[instance.pcfOrganisationId]}
                    size='small'
                />
            ) : null,
        [instance.pcfOrganisationId, organisationNames],
    );

    const {
        title,
        titleOverridden,
    }: { title: string; titleOverridden: boolean } = useMemo(() => {
        if (instance.userOverrides?.readableName) {
            return {
                title: instance.userOverrides.readableName,
                titleOverridden: true,
            };
        } else if (instance.readableName !== instance.pcfAppName) {
            return { title: instance.readableName, titleOverridden: true };
        } else {
            return { title: instance.pcfAppName, titleOverridden: false };
        }
    }, [instance.pcfAppName, instance.readableName, instance.userOverrides]);

    useEffect(() => {
        setLastChange(
            `Last event: ${displayTimeFrom(instance.updatedAt * 1000)}`,
        );
        if (instance.received) {
            setLastUpdate(displayTimeFrom(instance.received));
        }
        ref.current = setInterval(() => {
            setLastChange(
                `Last event: ${displayTimeFrom(instance.updatedAt * 1000)}`,
            );
            if (instance.received) {
                setLastUpdate(displayTimeFrom(instance.received));
            }
        }, 15 * 1000);
        return () => {
            clearInterval(ref.current);
        };
    }, [instance.updatedAt, instance.received]);

    useEffect(() => {
        if (instance.flash) {
            const timeout = setTimeout(() => {
                dispatch(clearFlash({ pcfGuid: instance.pcfGuid }));
            }, 20000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [dispatch, instance.flash, instance.pcfGuid]);

    return (
        <Fragment>
            <Paper
                sx={{
                    px: 3,
                    py: 1,
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderLeftColor: getRagCSSColour(theme, instance.status),
                    display: 'grid',
                    gridGap: '8px',
                    gridTemplateColumns: 'auto auto auto',
                    alignItems: 'start',
                    height: '100%',
                    position: 'relative',
                    ...(instance.flash
                        ? {
                              '&:before': {
                                  content: '""',
                                  zIndex: -100,
                                  position: 'absolute',
                                  opacity: 0.2,
                                  borderRadius: '4px',
                                  top: '-5px',
                                  left: '-13px',
                                  width: 'calc(100% + 26px)',
                                  height: 'calc(100% + 10px)',
                                  background: theme.palette.info.light,
                              },
                          }
                        : {}),
                }}
            >
                <Button
                    onClick={() => {
                        setDialogOpen(true);
                    }}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                    title={`Open details for ${
                        instance.readableName !== instance.pcfAppName
                            ? instance.readableName
                            : instance.pcfAppName
                    }`}
                />
                <Box sx={{ gridColumn: '1 / -2' }}>
                    <Button
                        color={getRagColourCode(instance.status)}
                        sx={{ mt: '8px' }}
                        size='small'
                        variant='outlined'
                    >
                        {instance.status}
                    </Button>
                </Box>
                {instance.received ? (
                    <Box
                        sx={{
                            gridColumn: 3,
                            display: 'grid',
                            gridTemplateColumns: 'auto 40px',
                            gridTemplateRows: '40px',
                            alignItems: 'center',
                            justifyContent: 'end',
                        }}
                    >
                        <Tooltip
                            title={`Last checked ${new Date(
                                instance.received,
                            ).toLocaleString('en-GB')}`}
                        >
                            <Typography
                                sx={{ fontSize: '10px' }}
                                variant='body2'
                            >
                                {lastUpdate}
                            </Typography>
                        </Tooltip>
                        <RefreshButton pcfGuid={instance.pcfGuid} />
                    </Box>
                ) : null}
                <Box sx={{ gridColumn: '1 / -1' }}>
                    {titleOverridden ? (
                        <Fragment>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gridGap: '4px',
                                }}
                            >
                                <Typography variant='subtitle1'>
                                    {title}
                                </Typography>
                                {orgName}
                            </Box>
                            <Typography variant='subtitle2'>
                                {instance.pcfAppName}
                            </Typography>
                        </Fragment>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography variant='subtitle1'>{title}</Typography>
                            {orgName}
                        </Box>
                    )}
                </Box>
                <Tooltip title='This is the date of the last change on PCF.'>
                    <Typography
                        sx={{
                            gridColumn: '2 / -1',
                            gridRow: 3,
                            textAlign: 'right',
                        }}
                        variant='body2'
                    >
                        {lastChange}
                    </Typography>
                </Tooltip>
            </Paper>
            <Dialog
                fullWidth
                maxWidth='lg'
                onClose={() => {
                    setDialogOpen(false);
                }}
                open={dialogOpen}
            >
                {dialogEditMode ? (
                    <EditDetailsForm
                        instance={instance}
                        onCancel={() => {
                            setDialogEditMode(false);
                        }}
                    />
                ) : (
                    <DialogContent sx={{ mx: 4 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            {orgName}
                            <Tooltip title='Edit the display of this Instance'>
                                <Button
                                    onClick={() => {
                                        setDialogEditMode(true);
                                    }}
                                >
                                    <IconEdit />
                                </Button>
                            </Tooltip>
                        </Box>
                        <Box sx={{ my: 2 }}>
                            <Typography sx={{ mb: 2 }} variant='h3'>
                                {title}
                            </Typography>
                            {titleOverridden ? (
                                <Typography variant='h4'>
                                    {instance.pcfAppName}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mb: 3,
                            }}
                        >
                            <Button
                                color={getRagColourCode(instance.status)}
                                sx={{ mt: '8px' }}
                                size='small'
                                variant='outlined'
                            >
                                {instance.status}
                            </Button>
                            {instance.received ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Tooltip
                                        title={`Last checked ${new Date(
                                            instance.received,
                                        ).toLocaleString('en-GB')}`}
                                    >
                                        <Typography
                                            sx={{ fontSize: '10px' }}
                                            variant='body2'
                                        >
                                            {lastUpdate}
                                        </Typography>
                                    </Tooltip>
                                    <RefreshButton pcfGuid={instance.pcfGuid} />
                                </Box>
                            ) : null}
                        </Box>
                        <TaskList pcfGuid={instance.pcfGuid} />
                    </DialogContent>
                )}
            </Dialog>
        </Fragment>
    );
};

export default InstanceCard;
