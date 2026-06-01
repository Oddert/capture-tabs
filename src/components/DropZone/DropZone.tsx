import { type FC, useState } from 'react';

import { CloudUpload as IconUpload } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';

import type { IProps } from './DropZone.types';

/**
 * Component for handling file uploads via drag-and-drop or file selection.
 * @component
 * @category Components
 * @subcategory DropZone
 */
const DropZone: FC<IProps> = ({label = 'Click to upload or drop your file here', onChange}) => {
    const [highlight, setHighlight] = useState(false);

    const handleUpload = (files: FileList) => {
        onChange(files);
    };

    return (
        <Button
            component='label'
            htmlFor='file-upload'
            onDragEnter={() => {
                setHighlight(true);
            }}
            onDragLeave={() => {
                setHighlight(false);
            }}
            onDrop={(e) => {
                e.preventDefault();
                setHighlight(false);
                if (e.dataTransfer.files.length > 0) {
                    handleUpload(e.dataTransfer.files);
                }
            }}
            sx={(theme) => ({
                alignItems: 'center',
                backgroundColor: highlight
                    ? theme.palette.action.hover
                    : 'transparent',
                border: highlight
                    ? `2px solid ${theme.palette.primary.light}`
                    : `2px dashed ${theme.palette.primary.main}`,
                borderRadius: '8px',
                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                },
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                justifyContent: 'center',
                py: 3,
                transition: 'all 0.2s ease',
                width: '100%',
            })}
        >
            <IconUpload fontSize='large' />
            <Typography>{label}</Typography>
            <input
                accept='.txt,.md'
                hidden
                id='file-upload'
                onChange={(event) => {
                    if (event.target.files && event.target.files.length > 0) {
                        handleUpload(event.target.files);
                    }
                }}
                type='file'
            />
        </Button>
    );
};

export default DropZone;
