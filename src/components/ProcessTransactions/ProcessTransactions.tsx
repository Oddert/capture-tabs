import { type FC, useCallback, useEffect, useState } from 'react';

import {
    ArrowBack as IconLeft,
    ArrowDownward as IconDown,
    ArrowForward as IconRight,
    ArrowUpward as IconUp,
} from '@mui/icons-material';
import { Box, Button } from '@mui/material';

import type { IProps } from './ProcessTransactions.types';

import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHookWrappers';
import {
    getUploadCursor,
    getUploadItems,
} from '../../redux/selectors/uploadSelectors';
import { toggleEditMode } from '../../redux/slices/uploadSlice';
import { refreshBookmarksFromLocalStore } from '../../redux/thunks/bookmarksThunks';
import {
    actionDefaultNextItem,
    decrementCursor,
} from '../../redux/thunks/uploadThunks';
import { convertToCSVAndDownload } from '../../utils/exportUtils';
import ModalBookmark from '../ModalBookmark';
import ModalNextActionText from '../ModalNextActionText';

import URLItem from './components/URLItem/URLItem';

const ProcessTransactions: FC<IProps> = () => {
    const [bookmarkOpen, setBookmarkOpen] = useState(false);
    const [nextActionOpen, setNextActionOpen] = useState(false);

    const items = useAppSelector(getUploadItems);
    const cursor = useAppSelector(getUploadCursor);

    const dispatch = useAppDispatch();

    const handleClickOpen = () => {};

    const handleClickReview = () => {};

    const handleClickClear = () => {};

    const handleClickUpload = () => {};

    const handleClickEdit = useCallback(() => {
        dispatch(toggleEditMode({ editMode: true }));
    }, [dispatch]);

    const handleClickSave = useCallback(() => {
        convertToCSVAndDownload(items);
    }, [items]);

    const handleClickNext = useCallback(() => {
        dispatch(actionDefaultNextItem());
    }, [dispatch]);

    const handleClickPrev = useCallback(() => {
        dispatch(decrementCursor());
    }, [dispatch]);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (bookmarkOpen || nextActionOpen) {
                return;
            }
            // eslint-disable-next-line no-console
            console.log(event.key);
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                handleClickNext();
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                handleClickPrev();
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                setNextActionOpen(true);
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                setBookmarkOpen(true);
            } else if (event.key === 'e') {
                event.preventDefault();
                handleClickEdit();
            } else if (event.key === 's') {
                event.preventDefault();
                handleClickSave();
            }
        },
        [
            bookmarkOpen,
            handleClickEdit,
            handleClickNext,
            handleClickPrev,
            handleClickSave,
            nextActionOpen,
        ],
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        dispatch(refreshBookmarksFromLocalStore());
    }, [dispatch]);

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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Button
                        onClick={() => {
                            setNextActionOpen(true);
                        }}
                        startIcon={<IconLeft />}
                        variant='outlined'
                    >
                        Next Action
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
                    {cursor > 1 ? <URLItem index={cursor - 2} /> : null}
                    {cursor > 0 ? <URLItem index={cursor - 1} /> : null}
                    <URLItem focused index={cursor} />
                    {cursor < items.length - 1 ? (
                        <URLItem index={cursor + 1} />
                    ) : null}
                    {cursor < items.length - 2 ? (
                        <URLItem index={cursor + 2} />
                    ) : null}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Button
                        onClick={() => {
                            setBookmarkOpen(true);
                        }}
                        endIcon={<IconRight />}
                        variant='outlined'
                    >
                        Bookmark
                    </Button>
                </Box>
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
            <Box
                sx={(theme) => ({
                    backgroundColor: theme.palette.background.default,
                    position: 'sticky',
                    bottom: '20px',
                    display: 'flex',
                    gap: '8px',
                    width: '100%',
                })}
            >
                <Button disabled onClick={handleClickOpen} variant='outlined'>
                    (O) Open
                </Button>
                <Button disabled onClick={handleClickReview} variant='outlined'>
                    (R) Review
                </Button>
                <Button disabled onClick={handleClickClear} variant='outlined'>
                    (C) Clear all
                </Button>
                <Button disabled onClick={handleClickUpload} variant='outlined'>
                    (U) Upload
                </Button>
                <Button onClick={handleClickEdit} variant='outlined'>
                    (E) Edit loaded items
                </Button>
                <Button onClick={handleClickSave} variant='outlined'>
                    (S) Save Reports
                </Button>
            </Box>
            <ModalNextActionText
                onClose={() => {
                    setNextActionOpen(false);
                }}
                open={nextActionOpen}
            />
            <ModalBookmark
                onClose={() => {
                    setBookmarkOpen(false);
                }}
                open={bookmarkOpen}
            />
        </Box>
    );
};

export default ProcessTransactions;
