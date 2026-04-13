import { StrictMode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { createRoot } from 'react-dom/client';

import App from './components/App/App.tsx';
import FallbackError from './components/FallbackError/FallbackError.tsx';
import ErrorBoundary from './hocs/ErrorBoundary/ErrorBoundary.tsx';
import ErrorMessage from './hocs/ErrorMessage/ErrorMessage.tsx';
import store from './redux/constants/store.ts';
import theme from './theme/index.ts';

import './common/i18n.ts';

// import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ReduxProvider store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                    <ErrorBoundary fallback={<FallbackError />}>
                        <ErrorMessage>
                            <App />
                        </ErrorMessage>
                    </ErrorBoundary>
                </ThemeProvider>
            </LocalizationProvider>
        </ReduxProvider>
    </StrictMode>,
);
