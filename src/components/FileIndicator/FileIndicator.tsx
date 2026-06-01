import type { FC } from 'react';

import {
    Bookmark as IconBookmark,
    CheckCircle as IconDone,
    Edit as IconEdit,
    HighlightOff as IconDelete,
} from '@mui/icons-material';
import {
    Box,
    Button,
    CircularProgress,
    Tooltip,
    Typography,
} from '@mui/material';

import type { IProps } from './FileIndicator.types';

import { useAppSelector } from '../../hooks/ReduxHookWrappers';
import { getUploadCounts } from '../../redux/selectors/uploadSelectors';

/**
 * Displays a summary of the uploaded file, including counts of total, completed, next actions, bookmarked, and discarded items.
 * @component
 * @category Components
 * @subcategory FileIndicator
 */
const FileIndicator: FC<IProps> = () => {
    const count = useAppSelector(getUploadCounts);
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button endIcon={<IconEdit />} variant='outlined'>
                {count.total} loaded
            </Button>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Tooltip
                    title={`${String(count.done)} of ${String(count.total)} completed`}
                >
                    <CircularProgress
                        thickness={4}
                        size={20}
                        value={(count.done / count.total) * 100}
                        variant='determinate'
                    />
                </Tooltip>
                <Tooltip
                    title={`${String(count.nextAction)} next actions captured`}
                >
                    <Typography
                        variant='body2'
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        {count.nextAction}
                        <IconDone color='success' sx={{ ml: 0.5 }} />
                    </Typography>
                </Tooltip>
                <Tooltip title={`${String(count.discard)} discarded`}>
                    <Typography
                        variant='body2'
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        {count.discard}
                        <IconDelete color='error' sx={{ ml: 0.5 }} />
                    </Typography>
                </Tooltip>
                <Tooltip title={`${String(count.bookmark)} bookmarked`}>
                    <Typography
                        variant='body2'
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        {count.bookmark}
                        <IconBookmark color='primary' sx={{ ml: 0.5 }} />
                    </Typography>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default FileIndicator;
