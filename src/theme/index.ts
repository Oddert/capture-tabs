import { type ThemeOptions, createTheme } from '@mui/material';

import breakpoints from './breakpoints';
import components from './components';
import palette from './palette';
import typography from './typography';

const themeOptions: ThemeOptions = {
    breakpoints,
    components,
    palette,
    typography,
};

const theme = createTheme(themeOptions);

export default theme;
