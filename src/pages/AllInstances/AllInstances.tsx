import { type FC, useEffect } from 'react';

import { Box, Typography } from '@mui/material';

import type { IProps } from './AllInstances.types';

import InstanceDisplay from '../../components/InstanceDisplay';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHookWrappers';
import {
    instancesLoading,
    listAllInstances,
} from '../../redux/selectors/instanceSelectors';

/**
 * Displays a full list of Instances the user has access to.
 * @category Pages
 * @subcategory All Instances
 * @component
 */
const AllInstances: FC<IProps> = () => {
    const dispatch = useAppDispatch();

    const instances = useAppSelector(listAllInstances);
    const loading = useAppSelector(instancesLoading);

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
            <Typography
                sx={{ gridColumn: '1/-1', textAlign: 'left', mb: 4 }}
                variant='h2'
            >
                All Instances
            </Typography>
            <InstanceDisplay
                highlightAlerts
                instances={instances}
                loading={loading}
            />
            {/* </ResponsiveContainer> */}
        </Box>
    );
};

export default AllInstances;
