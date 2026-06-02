import {
    type FC,
    type FormEvent,
    useCallback,
    useEffect,
    useState,
} from 'react';

import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormLabel,
    TextField,
} from '@mui/material';

import type { IProps } from './ModalBookmark.types';
import type { IBookmarkItem } from '../../types/Bookmarks.types';

import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHookWrappers';
import {
    getBookmarksList,
    getBookmarksRecent,
} from '../../redux/selectors/bookmarksSelectors';
import {
    actionBookmark,
    actionBookmarkQuickDial,
} from '../../redux/thunks/uploadThunks';

const ModalBookmark: FC<IProps> = ({ onClose, open }) => {
    const [selectedBm, setSelectedBm] = useState<IBookmarkItem | null | string>(
        null,
    );
    const [nextAction, setNextAction] = useState<null | string>(null);

    const dispatch = useAppDispatch();

    const bookmarks = useAppSelector(getBookmarksList);
    const recents = useAppSelector(getBookmarksRecent);

    const handleClickCancel = () => {
        setSelectedBm(null);
        setNextAction(null);
        if (onClose) {
            onClose();
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (selectedBm) {
            dispatch(
                actionBookmark(
                    selectedBm,
                    nextAction?.length ? nextAction : undefined,
                ),
            );
        }
        handleClickCancel();
    };

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (/[1-5]/.test(event.key)) {
                dispatch(actionBookmarkQuickDial(event.key));
                if (onClose) {
                    onClose();
                }
            }
        },
        [dispatch, onClose],
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <Dialog
            fullWidth
            maxWidth='lg'
            onClose={handleClickCancel}
            open={Boolean(open)}
        >
            <DialogTitle>Bookmark item</DialogTitle>
            <DialogContent>
                <FormLabel htmlFor='quick-dial-list'>
                    Recent bookmarks
                </FormLabel>
                <Box
                    id='quick-dial-list'
                    sx={{ my: 2, display: 'flex', gap: '8px' }}
                >
                    {recents.map((bm, idx) => (
                        <Button
                            key={bm.id}
                            onClick={() => {
                                dispatch(actionBookmarkQuickDial(idx));
                                if (onClose) {
                                    onClose();
                                }
                            }}
                            variant='outlined'
                        >
                            ({idx + 1}) {bm.name}
                        </Button>
                    ))}
                </Box>
                <form onSubmit={handleSubmit}>
                    <FormControlLabel
                        control={
                            <Autocomplete
                                autoSelect
                                freeSolo
                                fullWidth
                                getOptionKey={(opt) =>
                                    typeof opt === 'string' ? opt : opt.id
                                }
                                getOptionLabel={(opt) =>
                                    typeof opt === 'string' ? opt : opt.name
                                }
                                onChange={(_, value) => {
                                    setSelectedBm(value);
                                }}
                                options={bookmarks}
                                renderInput={(props) => (
                                    <TextField autoFocus {...props} />
                                )}
                                value={selectedBm}
                            />
                        }
                        label='Bookmark'
                        labelPlacement='top'
                        sx={{ width: '95%', mb: 2 }}
                    />
                    <FormControlLabel
                        control={
                            <TextField
                                fullWidth
                                onChange={(event) => {
                                    setNextAction(event.target.value);
                                }}
                                value={nextAction}
                            />
                        }
                        label='Next Action notes (optional)'
                        labelPlacement='top'
                        sx={{ width: '95%' }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '8px',
                            mt: 2,
                        }}
                    >
                        <Button onClick={handleClickCancel} size='small'>
                            Cancel
                        </Button>
                        <Button type='submit' size='small' variant='contained'>
                            Submit
                        </Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ModalBookmark;
