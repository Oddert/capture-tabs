import {
    type FC,
    type ReactNode,
    type SyntheticEvent,
    useMemo,
    useState,
} from 'react';

import { OpenInNew as IconExternalLink } from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    ListItemButton,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tabs,
} from '@mui/material';

import type { IProps } from './ModalReview.types';
import type { IUploadItem } from '../../types/Upload.types';

import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHookWrappers';
import {
    getIsReviewMode,
    getUploadItems,
} from '../../redux/selectors/uploadSelectors';
import { toggleReviewMode } from '../../redux/slices/uploadSlice';

import AllItems from './AllItems/AllItems';

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            aria-labelledby={`review-tab-${String(index)}`}
            hidden={value !== index}
            id={`review-tabpanel-${String(index)}`}
            role='tabpanel'
            {...other}
        >
            {value === index && children}
        </div>
    );
};

const a11yProps = (index: number) => {
    return {
        'aria-controls': `review-tabpanel-${String(index)}`,
        id: `review-tab-${String(index)}`,
    };
};

const ModalReview: FC<IProps> = () => {
    const [tab, setTab] = useState(0);
    const [clicked, setClicked] = useState<Record<string, boolean>>({});

    const open = useAppSelector(getIsReviewMode);
    const items = useAppSelector(getUploadItems);

    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(toggleReviewMode({ reviewMode: false }));
    };

    const handleClickLink = (url: string) => () => {
        setClicked((state) => ({ ...state, [url]: true }));
    };

    const handleChangeTab = (_event: SyntheticEvent, nextTab: number) => {
        setTab(nextTab);
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
        <Dialog
            fullWidth
            maxWidth='xl'
            onClose={handleClose}
            open={open}
            slotProps={{
                container: {
                    sx: {
                        alignItems: 'flex-start',
                    },
                },
            }}
        >
            <DialogTitle></DialogTitle>
            <DialogContent>
                <Tabs
                    aria-label='choose what to review'
                    onChange={handleChangeTab}
                    sx={{ mb: 2 }}
                    value={tab}
                >
                    <Tab label='Actioned items' {...a11yProps(0)} />
                    <Tab label='Full list' {...a11yProps(1)} />
                </Tabs>
                <CustomTabPanel value={tab} index={0}>
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
                                                        checked={
                                                            clicked[item.url]
                                                        }
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
                                                            whiteSpace:
                                                                'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow:
                                                                'ellipsis',
                                                        }}
                                                    >
                                                        {item.url}{' '}
                                                        <IconExternalLink
                                                            sx={{
                                                                fontSize:
                                                                    '16px',
                                                                ml: '8px',
                                                            }}
                                                        />
                                                    </ListItemButton>
                                                </TableCell>
                                                <TableCell>
                                                    {item.reason}
                                                </TableCell>
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
                                                            whiteSpace:
                                                                'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow:
                                                                'ellipsis',
                                                        }}
                                                    >
                                                        {item.url}{' '}
                                                        <IconExternalLink
                                                            sx={{
                                                                fontSize:
                                                                    '16px',
                                                                ml: '8px',
                                                            }}
                                                        />
                                                    </ListItemButton>
                                                </TableCell>
                                                <TableCell>
                                                    {item.reason}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </AccordionDetails>
                    </Accordion>
                </CustomTabPanel>
                <CustomTabPanel value={tab} index={1}>
                    <AllItems />
                </CustomTabPanel>
            </DialogContent>
        </Dialog>
    );
};

export default ModalReview;
