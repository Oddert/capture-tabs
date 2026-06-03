import type { Theme } from '@mui/material';

const components: Partial<Theme['components']> = {
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: 'none',
            },
        },
    },
    MuiTab: {
        styleOverrides: {
            root: {
                textTransform: 'none',
            },
        },
    },
    MuiFormControlLabel: {
        defaultProps: {
            slotProps: {
                typography: {
                    sx: {
                        alignSelf: 'flex-start',
                    },
                },
            },
        },
    },
};

export default components;
