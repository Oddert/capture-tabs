import { type FC, type FormEvent, Fragment, useEffect, useState } from 'react';

import { Notes as IconNote } from '@mui/icons-material';
import { Button, FormControlLabel, Popover, TextField } from '@mui/material';

import type { IProps } from './BadgeNextAction.types';

const BadgeNextAction: FC<IProps> = ({ item }) => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const [value, setValue] = useState<string | null>(null);

    useEffect(() => {
        setValue(item.reason ?? null);
    }, [item.reason]);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    };

    const open = Boolean(anchorEl);

    return (
        <Fragment>
            <IconNote color='info' sx={{ ml: 0.5 }} />
            <Popover anchorEl={anchorEl} onClose={handleClose} open={open}>
                <form onSubmit={handleSubmit}>
                    <FormControlLabel
                        control={
                            <TextField
                                multiline
                                minRows={3}
                                onChange={(event) => {
                                    setValue(event.target.value);
                                }}
                                value={value}
                            />
                        }
                        label='Next Action note'
                        labelPlacement='top'
                    />
                    <Button size='small'>Cancel</Button>
                    <Button size='small' type='submit' variant='contained'>
                        Save
                    </Button>
                </form>
            </Popover>
        </Fragment>
    );
};

export default BadgeNextAction;
