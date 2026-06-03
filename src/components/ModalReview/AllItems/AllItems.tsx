import { type FC, useMemo, useState } from 'react';

import {
    Box,
    Button,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

import {
    type ColumnDef,
    type PaginationState,
    type SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import type { IUploadItem } from '../../../types/Upload.types';
import type { IProps } from '../ModalReview.types';

import { useAppSelector } from '../../../hooks/ReduxHookWrappers';
import { getUploadItems } from '../../../redux/selectors/uploadSelectors';

const AllItems: FC<IProps> = () => {
    const data = useAppSelector(getUploadItems);
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'url', desc: false },
    ]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const columns = useMemo<ColumnDef<IUploadItem>[]>(
        () => [
            {
                accessorKey: 'url',
                header: 'URL',
                cell: (info) => info.getValue<string>(),
            },
            {
                accessorFn: (row) => Boolean(row.bookmark),
                id: 'bookmark',
                header: 'Bookmark',
                cell: (info) => (info.getValue<boolean>() ? 'Yes' : 'No'),
                sortingFn: 'basic',
            },
            {
                accessorFn: (row) => Boolean(row.reason),
                id: 'nextAction',
                header: 'Next Action',
                cell: (info) => (info.getValue<boolean>() ? 'Yes' : 'No'),
                sortingFn: 'basic',
            },
        ],
        [],
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            pagination,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <Box sx={{ overflowX: 'auto' }}>
            <Table>
                <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const canSort = header.column.getCanSort();
                                const sortState = header.column.getIsSorted();

                                return (
                                    <TableCell
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        sx={{
                                            cursor: canSort
                                                ? 'pointer'
                                                : 'default',
                                            userSelect: 'none',
                                            padding: '8px 12px',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                        {canSort && (
                                            <Typography
                                                component='span'
                                                sx={{ marginLeft: 8 }}
                                            >
                                                {sortState === 'asc' && '▲'}
                                                {sortState === 'desc' && '▼'}
                                                {sortState === false && '↕'}
                                            </Typography>
                                        )}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
                                    key={cell.id}
                                    sx={{
                                        padding: '8px 12px',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'space-between',
                    mt: 2,
                }}
            >
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Button
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => {
                            table.previousPage();
                        }}
                        variant='outlined'
                        size='small'
                    >
                        Previous
                    </Button>
                    <Button
                        disabled={!table.getCanNextPage()}
                        onClick={() => {
                            table.nextPage();
                        }}
                        variant='outlined'
                        size='small'
                    >
                        Next
                    </Button>
                    <Typography component='span'>
                        Page {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Typography component='span'>Rows per page:</Typography>
                    <Select
                        size='small'
                        value={table.getState().pagination.pageSize}
                        onChange={(event) => {
                            table.setPageSize(event.target.value);
                        }}
                    >
                        {[5, 10, 20, 50].map((size) => (
                            <MenuItem key={size} value={size}>
                                {size}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </Box>
        </Box>
    );
};

export default AllItems;
