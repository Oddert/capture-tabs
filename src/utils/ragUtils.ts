import type { ButtonProps, Theme } from '@mui/material';

import type { IInstance } from '../types/Instance.types';

/**
 * Selects a colour from the theme to display as the status colour.
 *
 * Defaults to 'transparent'.
 * @param theme The current theme config.
 * @param status The status code from the Instance.
 * @returns A CSS compatible colour from the theme.
 */
export const getRagCSSColour = (theme: Theme, status: IInstance['status']) => {
    switch (status) {
        case 'RUNNING':
            return theme.palette.success.main;
        case 'STARTING':
            return theme.palette.warning.main;
        case 'DOWN':
            return theme.palette.error.main;
        case 'STOPPED':
            return theme.palette.info.main;
        default:
            return 'transparent';
    }
};

/**
 * Returns and MUI compatible theme colour based on a current Instance status.
 * @param status The current status of the Instance.
 * @returns The theme-compatible colour code.
 */
export const getRagColourCode = (
    status: IInstance['status'],
): ButtonProps['color'] => {
    switch (status) {
        case 'RUNNING':
            return 'success';
        case 'STARTING':
            return 'warning';
        case 'DOWN':
            return 'error';
        case 'STOPPED':
            return 'info';
        default:
            return 'primary';
    }
};
