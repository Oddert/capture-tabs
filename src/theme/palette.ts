import { type Palette } from '@mui/material';

// Purples
// regal: '#3C1053',
// champion: '#5A287D',
// bright: '#5E10B1',
// secondary: '#8B3FB2',

// UI
// lilac: '#F2EAF9',
// blush: '#FFDBEC',
// sand: '#FFEAE6',
// mist: '#DBEDFA',

// Gray
// black: '#000000',
// headingGray: '#333333',
// lightGray: '#CCCFD0',
// bodyGray: '#646068',
// groundGray: '#F2F2FB',
// white: '#FFFFFF',

// RAG
// red: '#CF223F',
// amber: '#FCB900',
// green: '#429448',

const palette: Partial<Palette> = {
    // primary: {
    //     main: '#5E10B1', // Bright Purple
    //     light: '#8B3FB2', // Secondary Purple
    //     dark: '#3C1053', // Regal Purple
    //     contrastText: '#FFFFFF', // White
    // },
    // secondary: {
    //     main: '#5A287D', // Champion Purple
    //     light: '#8B3FB2', // Secondary Purple
    //     dark: '#3C1053', // Regal Purple
    //     contrastText: '#FFFFFF', // White
    // },
    // background: {
    //     // default: '#333333',
    //     default: '#F2F2FB', // Lilac
    //     paper: '#FFFFFF', // White
    // },
    // error: {
    //     contrastText: '#FFFFFF',
    //     dark: darken('#CF223F', 0.2),
    //     light: lighten('#CF223F', 0.8),
    //     main: '#CF223F',
    // },
    // warning: {
    //     contrastText: '#FFFFFF',
    //     dark: darken('#FCB900', 0.2),
    //     light: lighten('#FCB900', 0.8),
    //     main: '#FCB900',
    // },
    // success: {
    //     contrastText: '#FFFFFF',
    //     dark: darken('#429448', 0.2),
    //     light: lighten('#429448', 0.8),
    //     main: '#429448',
    // },
    mode: 'dark',
    common: {
        black: '#000',
        white: '#fff',
    },
    primary: {
        main: '#90caf9',
        light: '#e3f2fd',
        dark: '#42a5f5',
        contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
        main: '#ce93d8',
        light: '#f3e5f5',
        dark: '#ab47bc',
        contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    error: {
        main: '#f44336',
        light: '#e57373',
        dark: '#d32f2f',
        contrastText: '#fff',
    },
    warning: {
        main: '#ffa726',
        light: '#ffb74d',
        dark: '#f57c00',
        contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
        main: '#29b6f6',
        light: '#4fc3f7',
        dark: '#0288d1',
        contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    success: {
        main: '#66bb6a',
        light: '#81c784',
        dark: '#388e3c',
        contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    grey: {
        '50': '#fafafa',
        '100': '#f5f5f5',
        '200': '#eeeeee',
        '300': '#e0e0e0',
        '400': '#bdbdbd',
        '500': '#9e9e9e',
        '600': '#757575',
        '700': '#616161',
        '800': '#424242',
        '900': '#212121',
        A100: '#f5f5f5',
        A200: '#eeeeee',
        A400: '#bdbdbd',
        A700: '#616161',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    text: {
        primary: '#fff',
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(255, 255, 255, 0.5)',
        icon: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    background: {
        paper: '#121212',
        default: '#121212',
    },
    action: {
        active: '#fff',
        hover: 'rgba(255, 255, 255, 0.08)',
        hoverOpacity: 0.08,
        selected: 'rgba(255, 255, 255, 0.16)',
        selectedOpacity: 0.16,
        disabled: 'rgba(255, 255, 255, 0.3)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        disabledOpacity: 0.38,
        focus: 'rgba(255, 255, 255, 0.12)',
        focusOpacity: 0.12,
        activatedOpacity: 0.24,
    },
};

export default palette;
