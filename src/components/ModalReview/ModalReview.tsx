import { type FC, useMemo } from 'react';

import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
} from '@mui/material';

import type { IProps } from './ModalReview.types';
import type { IUploadItem } from '../../types/Upload.types';

import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHookWrappers';
import {
    getIsReviewMode,
    getUploadItems,
} from '../../redux/selectors/uploadSelectors';
import { toggleReviewMode } from '../../redux/slices/uploadSlice';

const ModalReview: FC<IProps> = () => {
    const open = useAppSelector(getIsReviewMode);
    const items = useAppSelector(getUploadItems);

    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(toggleReviewMode({ reviewMode: false }));
    };

    const {
        bookmark,
        nextAction,
    }: { bookmark: IUploadItem[]; nextAction: IUploadItem[] } = useMemo(() => {
        return items.reduce(
            (
                acc: { bookmark: IUploadItem[]; nextAction: IUploadItem[] },
                each,
            ) => {
                if (each.bookmark) {
                    acc.bookmark.push(each);
                } else if (each.reason) {
                    acc.nextAction.push(each);
                }
                return acc;
            },
            { bookmark: [], nextAction: [] },
        );
    }, [items]);

    return (
        <Dialog fullWidth maxWidth='xl' onClose={handleClose} open={open}>
            <DialogTitle></DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <List>
                        {bookmark.map((item, idx) => (
                            <ListItem key={idx}>{item.url}</ListItem>
                        ))}
                    </List>
                    <List>
                        {nextAction.map((item, idx) => (
                            <ListItem key={idx}>{item.url}</ListItem>
                        ))}
                    </List>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ModalReview;
