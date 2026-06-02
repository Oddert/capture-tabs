import { json2csv } from 'json-2-csv';

import type { IUploadItem } from '../types/Upload.types';

/**
 * Downloads data as a CSV file for the user.
 * @param fileData The CSV data as a string.
 * @param fileName The filename. Defaults to "download".
 */
export const downloadCsv = (fileData: string, fileName?: string) => {
    const blob = new Blob([fileData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.download = fileName?.length ? `${fileName}.csv` : 'download.csv';
    aTag.click();
    aTag.remove();
};

export const convertToCSVAndDownload = (items: IUploadItem[]) => {
    const { bookmark, nextAction } = items.reduce(
        (acc: { bookmark: IUploadItem[]; nextAction: IUploadItem[] }, each) => {
            if (each.bookmark) {
                acc.bookmark.push(each);
            } else if (each.reason) {
                acc.nextAction.push(each);
            }
            return acc;
        },
        { bookmark: [], nextAction: [] },
    );
    const bookmarkSorted = bookmark.sort((a, b) =>
        (a.bookmark?.name ?? '').localeCompare(b.bookmark?.name ?? ''),
    );
    const bookmarkSortedConverted = json2csv(bookmarkSorted);
    const nextActionConverted = json2csv(nextAction);
    const date = new Date().toLocaleString('en-GB');
    downloadCsv(bookmarkSortedConverted, `capture-tabs-bookmark-${date}`);
    downloadCsv(nextActionConverted, `capture-tabs-next-actions-${date}`);
};
