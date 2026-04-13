import { type FC, Fragment } from 'react';

import { Box, Button, TextField, Typography, useTheme } from '@mui/material';

import type { IProps } from './ThemeTester.types';

/**
 * Debug page component to test changes to the Theme by displaying variants of core components.
 * @category Components
 * @subcategory Theme Tester
 * @component
 */
const ThemeTester: FC<IProps> = () => {
    const theme = useTheme();
    return (
        <Fragment>
            <TextField />
            <Button variant='contained'>Contained</Button>
            <Button variant='outlined'>Outlined</Button>
            <Button variant='text'>Text</Button>
            <Box>
                <Typography>Red</Typography>
                <Box
                    sx={{
                        w: '200px',
                        h: '200px',
                        background: theme.palette.error.main,
                        color: theme.palette.error.contrastText,
                    }}
                >
                    Main
                </Box>
                <Box
                    sx={{
                        w: '200px',
                        h: '200px',
                        background: theme.palette.error.light,
                    }}
                >
                    Light
                </Box>
                <Box
                    sx={{
                        w: '200px',
                        h: '200px',
                        background: theme.palette.error.dark,
                        color: theme.palette.error.contrastText,
                    }}
                >
                    Dark
                </Box>
            </Box>
            <Box>
                <Typography>Amber</Typography>
                <Box
                    sx={{
                        w: '200px',
                        h: '200px',
                        background: theme.palette.warning.main,
                        color: theme.palette.warning.contrastText,
                    }}
                >
                    Main
                </Box>
                <Box
                    sx={{
                        w: '200px',
                        h: '200px',
                        background: theme.palette.warning.light,
                    }}
                >
                    Light
                </Box>
                <Box
                    sx={{
                        w: '200px',
                        h: '200px',
                        background: theme.palette.warning.dark,
                        color: theme.palette.warning.contrastText,
                    }}
                >
                    Dark
                </Box>
            </Box>
            <Box>
                <Typography>Green</Typography>
                <Box
                    sx={{
                        w: '200px',
                        h: '200px',
                        background: theme.palette.success.main,
                        color: theme.palette.success.contrastText,
                    }}
                >
                    Main
                </Box>
                <Box
                    sx={{
                        w: '200px',
                        h: '200px',
                        background: theme.palette.success.light,
                    }}
                >
                    Light
                </Box>
                <Box
                    sx={{
                        w: '200px',
                        h: '200px',
                        background: theme.palette.success.dark,
                        color: theme.palette.success.contrastText,
                    }}
                >
                    Dark
                </Box>
            </Box>
        </Fragment>
    );
};

export default ThemeTester;
