import { type FC, useMemo, useState } from 'react';

import { OpenInNew as IconExternalLink } from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
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
    const [clicked, setClicked] = useState<Record<string, boolean>>({});

    const open = useAppSelector(getIsReviewMode);
    const items = useAppSelector(getUploadItems);

    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(toggleReviewMode({ reviewMode: false }));
    };

    const handleClickLink = (url: string) => () => {
        console.log('click');
        setClicked((state) => ({ ...state, [url]: true }));
    };

    console.log('clicked', clicked);

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
                <Accordion defaultExpanded={bookmark.length > 0}>
                    <AccordionSummary>
                        To bookmark: {bookmark.length}
                    </AccordionSummary>
                    <AccordionDetails>
                        <Table size='small'>
                            <TableHead>
                                <TableCell>Opened</TableCell>
                                <TableCell>URL</TableCell>
                                <TableCell>Action</TableCell>
                            </TableHead>
                            <TableBody>
                                {bookmark.map((item, idx) => {
                                    return (
                                        <TableRow key={idx}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={clicked[item.url]}
                                                    onChange={() => {}}
                                                />
                                            </TableCell>
                                            <TableCell
                                                onClick={handleClickLink(
                                                    item.url,
                                                )}
                                            >
                                                <ListItemButton
                                                    href={item.url}
                                                    target='_blank'
                                                    sx={{
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow:
                                                            'ellipsis',
                                                    }}
                                                >
                                                    {item.url}{' '}
                                                    <IconExternalLink
                                                        sx={{
                                                            fontSize: '16px',
                                                            ml: '8px',
                                                        }}
                                                    />
                                                </ListItemButton>
                                            </TableCell>
                                            <TableCell>{item.reason}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded={nextAction.length > 0}>
                    <AccordionSummary>
                        Next Actions: {nextAction.length}
                    </AccordionSummary>
                    <AccordionDetails>
                        <Table size='small'>
                            <TableHead>
                                <TableCell>URL</TableCell>
                                <TableCell>Action</TableCell>
                            </TableHead>
                            <TableBody>
                                {nextAction.map((item, idx) => {
                                    return (
                                        <TableRow key={idx}>
                                            <TableCell
                                                onClick={handleClickLink(
                                                    item.url,
                                                )}
                                            >
                                                <ListItemButton
                                                    href={item.url}
                                                    target='_blank'
                                                    sx={{
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow:
                                                            'ellipsis',
                                                    }}
                                                >
                                                    {item.url}{' '}
                                                    <IconExternalLink
                                                        sx={{
                                                            fontSize: '16px',
                                                            ml: '8px',
                                                        }}
                                                    />
                                                </ListItemButton>
                                            </TableCell>
                                            <TableCell>{item.reason}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </AccordionDetails>
                </Accordion>
            </DialogContent>
        </Dialog>
    );
};

export default ModalReview;
