import type { FC } from 'react';

import { TextField } from '@mui/material';

import type { IProps } from './UploadText.types';

import { useAppSelector } from '../../hooks/ReduxHookWrappers';
import { getUploadRawContent } from '../../redux/selectors/uploadSelectors';

const UploadText: FC<IProps> = () => {
    const rawContent = useAppSelector(getUploadRawContent);
    return (
        <TextField
            minRows={4}
            multiline
            placeholder='Manually enter URLs...'
            style={{ width: '100%' }}
            value={rawContent ?? undefined}
        />
    );
};

export default UploadText;
