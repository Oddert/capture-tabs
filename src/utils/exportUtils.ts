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
    const converted = json2csv(items);
    downloadCsv(
        converted,
        `capture-tabs-${new Date().toLocaleString('en-GB')}`,
    );
};
