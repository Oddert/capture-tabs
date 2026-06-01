import { type FC, Fragment, useEffect, useState } from 'react';

import { Box, Button, FormControlLabel, TextField } from '@mui/material';

import type { IProps } from './UploadText.types';

import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHookWrappers';
import { getUploadRawContent } from '../../redux/selectors/uploadSelectors';
import { uploadContent } from '../../redux/slices/uploadSlice';

/**
 * Presents a text field for users to input URLs directly.
 *
 * Writes the text to state on change, and to the store on submit.
 * @component
 * @category Components
 * @subcategory UploadText
 */
const UploadText: FC<IProps> = () => {
    const [state, setState] = useState<string | null>(null);

    const rawContent = useAppSelector(getUploadRawContent);

    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        dispatch(uploadContent({ content: state ?? '' }));
    };

    useEffect(() => {
        setState(rawContent);
    }, [rawContent]);

    return (
        <Fragment>
            <FormControlLabel
                control={
                    <TextField
                        minRows={4}
                        multiline
                        onChange={(event) => {
                            setState(event.target.value);
                        }}
                        placeholder='https://mui.com/material-ui/customization/dark-mode/'
                        style={{ width: '100%' }}
                        value={state ?? undefined}
                    />
                }
                label={'Enter URLs manually'}
                labelPlacement='top'
                sx={{ width: '100%' }}
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    color='primary'
                    disabled={!state?.length}
                    onClick={handleSubmit}
                    variant='contained'
                >
                    Parse
                </Button>
            </Box>
        </Fragment>
    );
};

export default UploadText;
