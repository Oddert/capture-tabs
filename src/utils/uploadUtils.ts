import type { IUploadError, IUploadItem } from '../types/Upload.types';

/**
 * Interprets a list of links exported from a browser into the application state.
 *
 * Can deal with a variety of formats, as long as the URL is present in the line and is delineated by spaces.
 *
 * Lines may vary in structure, the only requirement being that one segment (delineated by spaces) must be a URL. The URL must contain either 'duck' or 'http' to be considered valid.
 * @param content The incoming file, expected to be a list of links delineated by newlines.
 * @returns The items and errors.
 */
export const parseUploadContent = (content: string) => {
    const { items, errors }: { items: IUploadItem[]; errors: IUploadError[] } =
        content.split('\n').reduce(
            (acc: { items: IUploadItem[]; errors: IUploadError[] }, line) => {
                try {
                    const split = line.split(' ');
                    const foundValidUrl = split.find((part) =>
                        /(duck|http).+/.test(part),
                    );
                    if (foundValidUrl) {
                        acc.items.push({
                            original: line,
                            url: foundValidUrl,
                            decisionType: null,
                        });
                    }
                } catch (error: unknown) {
                    acc.errors.push({
                        error: (error as Error).message,
                        original: line,
                    });
                }
                return acc;
            },
            { items: [], errors: [] },
        );
    return { items, errors };
};

/**
 * Opens a URL in a new tab.
 * @param URL The URL to open.
 */
export const openLinkInNewTab = (url: string) => {
    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.target = '_blank';
    aTag.click();
    aTag.remove();
};
