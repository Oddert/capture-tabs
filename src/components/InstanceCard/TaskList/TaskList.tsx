import { type FC, useCallback, useEffect, useState } from 'react';

import { Refresh as IconRefresh } from '@mui/icons-material';
import {
    Box,
    CircularProgress,
    Divider,
    IconButton,
    List,
    ListItem,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';

import dayjs from 'dayjs';

import type { IProps } from './TaskList.types';
import type { ITaskResponse } from '../../../types/Instance.types';

import { useAppDispatch } from '../../../hooks/ReduxHookWrappers';
import { intakeError } from '../../../redux/thunks/errorThunks';
import InstanceService from '../../../services/instance.service';

const placeholderResponse = {
    pagination: {
        total_results: 0,
        total_pages: 0,
        first: {
            href: '',
        },
        last: {
            href: '',
        },
        next: {
            href: null,
        },
        previous: null,
    },
    resources: [],
};

const readableDate = (date: string) => {
    const parsedDate = dayjs(date);
    const today = dayjs();
    if (
        today.year === parsedDate.year &&
        today.month === parsedDate.month &&
        today.date === parsedDate.date
    ) {
        return parsedDate.format('HH:mm:ss');
    }
    return parsedDate.format('DD/MM/YY HH:mm:ss');
};

const TaskList: FC<IProps> = ({ pcfGuid }) => {
    const [data, setData] = useState<ITaskResponse>(placeholderResponse);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();
    const theme = useTheme();

    const request = useCallback(async () => {
        try {
            setLoading(true);
            const response = await InstanceService.taskListByGuid(pcfGuid);
            if (response.status === 200) {
                setData(response.tasks);
                setLoaded(true);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            dispatch(intakeError(error));
        }
    }, [dispatch, pcfGuid]);

    useEffect(() => {
        request();
    }, [request]);

    return (
        <Box>
            <Typography>Events</Typography>
            {loading ? (
                <CircularProgress />
            ) : loaded && data.resources.length ? (
                <List>
                    {data.resources.map((task) => (
                        <ListItem
                            key={task.guid}
                            sx={{
                                width: '100%',
                                flexDirection: 'column',
                                py: 0,
                            }}
                        >
                            <Tooltip title={task.updated_at}>
                                <Box
                                    sx={{
                                        width: '100%',
                                        p: 2,
                                        display: 'grid',
                                        gridTemplateColumns: '130px 1fr auto',
                                        '&:hover': {
                                            background:
                                                theme.palette.background
                                                    .default,
                                        },
                                    }}
                                >
                                    <Typography>{task.name}</Typography>
                                    {task.result.failure_reason ? (
                                        <Typography>
                                            Reason: {task.result.failure_reason}
                                        </Typography>
                                    ) : (
                                        <Box />
                                    )}
                                    <Typography>
                                        {readableDate(task.updated_at)}
                                    </Typography>
                                </Box>
                            </Tooltip>
                            <Divider sx={{ width: '100%' }} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography>
                    No data available{' '}
                    <IconButton
                        onClick={() => {
                            request();
                        }}
                    >
                        <IconRefresh />
                    </IconButton>
                </Typography>
            )}
        </Box>
    );
};

export default TaskList;
