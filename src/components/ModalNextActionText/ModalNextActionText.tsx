import { type FC, type SubmitEvent, useState } from 'react';

import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';

import type { IProps } from './ModalNextActionText.types';

import { useAppDispatch } from '../../hooks/ReduxHookWrappers';
import { actionCreateNextAction } from '../../redux/thunks/uploadThunks';

const ModalNextActionText: FC<IProps> = ({ onClose, open }) => {
    const [text, setText] = useState('');

    const dispatch = useAppDispatch();

    const handleClickCancel = () => {
        setText('');
        if (onClose) {
            onClose();
        }
    };

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(actionCreateNextAction(text.length ? text : undefined));
        handleClickCancel();
    };

    return (
        <Dialog
            fullWidth
            maxWidth='lg'
            onClose={handleClickCancel}
            open={Boolean(open)}
        >
            <DialogTitle>Next Action note</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        autoFocus
                        fullWidth
                        onChange={(event) => {
                            setText(event.target.value);
                        }}
                        value={text}
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

export default ModalNextActionText;
