import { type FC, useCallback, useEffect } from 'react';

import {
    ArrowDownward as IconDown,
    ArrowUpward as IconUp,
} from '@mui/icons-material';
import { Box, Button } from '@mui/material';

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

import URLItem from './components/URLItem/URLItem';

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
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Button
                    disabled={cursor === 0}
                    onClick={handleClickPrev}
                    startIcon={<IconUp />}
                    variant='outlined'
                >
                    Previous
                </Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 2,
                    minHeight: '250px',
                }}
            >
                {cursor > 0 ? <URLItem index={cursor - 1} /> : null}
                <URLItem focused index={cursor} />
                {cursor < items.length - 1 ? (
                    <URLItem index={cursor + 1} />
                ) : null}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Button
                    disabled={cursor === items.length - 1}
                    onClick={handleClickNext}
                    startIcon={<IconDown />}
                    variant='outlined'
                >
                    Next (discard)
                </Button>
            </Box>
        </Box>
    );
};

export default ProcessTransactions;
