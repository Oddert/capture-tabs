import type { FC } from 'react';

import { Box, CircularProgress } from '@mui/material';

import type { IProps } from './LoadingIndicator.types';

/**
 * Reusable centred loading spinner.
 * @category Components
 * @subcategory Loading Indicator
 * @component
 */
const LoadingIndicator: FC<IProps> = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    );
};

export default LoadingIndicator;
