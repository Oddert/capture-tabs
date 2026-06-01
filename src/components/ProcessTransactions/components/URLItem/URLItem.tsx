import type { FC } from 'react';

import {
    Bookmark as IconBookmark,
    CheckCircle as IconDone,
    HighlightOff as IconDelete,
} from '@mui/icons-material';
import { Paper, Tooltip, Typography } from '@mui/material';

import type { IProps } from './URLItem.types';
import type { IUploadItem } from '../../../../types/Upload.types';

import { useAppSelector } from '../../../../hooks/ReduxHookWrappers';
import { getUploadItems } from '../../../../redux/selectors/uploadSelectors';

/**
 * Returns the appropriate status badge based on the decision type.
 * @param decisionType The decision type of the upload item, which can be 'discard', 'bookmark', 'export', or undefined.
 */
const getStatusBadge = (decisionType: IUploadItem['decisionType']) => {
    switch (decisionType) {
        case 'discard':
            return (
                <Tooltip title={'discarded'}>
                    <IconDelete color='error' sx={{ ml: 0.5 }} />
                </Tooltip>
            );
        case 'bookmark':
            return (
                <Tooltip title={'bookmarked'}>
                    <IconBookmark color='primary' sx={{ ml: 0.5 }} />
                </Tooltip>
            );
        case 'export':
            return (
                <Tooltip title={'next action created'}>
                    <IconDone color='success' sx={{ ml: 0.5 }} />
                </Tooltip>
            );
        default:
            return null;
    }
};

/**
 * Displays a single URL item with its status badge.
 * @component
 * @category Components
 * @subcategory ProcessTransactions
 */
const URLItem: FC<IProps> = ({ focused, index }) => {
    const items = useAppSelector(getUploadItems);
    return (
        <Paper
            elevation={1}
            sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'center',
                opacity: focused ? 1 : 0.5,
            }}
        >
            {getStatusBadge(items[index].decisionType)}
            <Typography
                sx={{
                    ml: 2,
                    wordBreak: 'break-all',
                    fontSize: focused ? '1.25rem' : '1rem',
                }}
                variant='body1'
            >
                {items[index].url}
            </Typography>
        </Paper>
    );
};

export default URLItem;
