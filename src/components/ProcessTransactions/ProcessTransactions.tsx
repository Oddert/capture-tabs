import { type FC, useCallback, useEffect } from 'react';

import { Box, Typography } from '@mui/material';

import type { IProps } from './ProcessTransactions.types';

import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHookWrappers';
import {
    getUploadCursor,
    getUploadItems,
} from '../../redux/selectors/uploadSelectors';
import {
    actionDefaultNextItem,
    decrementCursor,
} from '../../redux/thunks/uploadThunks';

const ProcessTransactions: FC<IProps> = () => {
    const items = useAppSelector(getUploadItems);
    const cursor = useAppSelector(getUploadCursor);

    const dispatch = useAppDispatch();

    const handleClickNext = useCallback(() => {
        dispatch(actionDefaultNextItem());
    }, [dispatch]);

    const handleClickPrev = useCallback(() => {
        dispatch(decrementCursor());
    }, [dispatch]);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                handleClickNext();
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                handleClickPrev();
            }
        },
        [handleClickNext, handleClickPrev],
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <Box>
            <Box>
                <Typography variant='body1'>{items[cursor].url}</Typography>
            </Box>
        </Box>
    );
};

export default ProcessTransactions;
