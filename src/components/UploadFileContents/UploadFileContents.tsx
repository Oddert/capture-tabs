import { type FC } from 'react';

import { Box } from '@mui/material';

import type { IProps } from './UploadFileContents.types';

import { useAppDispatch } from '../../hooks/ReduxHookWrappers';
import { uploadContent } from '../../redux/slices/uploadSlice';
import DropZone from '../DropZone/DropZone';

/**
 * Presents a drag-drop file upload for the URL files.
 *
 * Writes the file to state on change.
 * @component
 * @category Components
 * @subcategory UploadFileContents
 */
const UploadFileContents: FC<IProps> = () => {
    const dispatch = useAppDispatch();

    const handleUpload = (files: FileList) => {
        const getFiles = async () => {
            const fileContents = await Promise.all(
                Array.from(files).map((file) => file.text()),
            );
            dispatch(uploadContent({ content: fileContents.join('\n') }));
        };
        getFiles();
    };

    return (
        <Box sx={{ mb: 2 }}>
            <DropZone onChange={handleUpload} />
        </Box>
    );
};

export default UploadFileContents;
