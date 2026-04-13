import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { Box, CssBaseline } from '@mui/material';

import router from '../../constants/routerConstants';
import AuthBoundary from '../../hocs/AuthBoundary';
import { useAppDispatch } from '../../hooks/ReduxHookWrappers';
import useAuthToken from '../../hooks/useAuthToken';
import { initialAppLoad } from '../../redux/thunks/genericThunks';

// import './App.css';

/**
 * Core component of the application to be rendered inside relevant contexts and other boilerplate.
 * @category Components
 * @subcategory App
 * @component
 */
const App = () => {
    const dispatch = useAppDispatch();

    // const { t } = useTranslation();

    const { conditionallyRefreshAuth } = useAuthToken();

    useEffect(() => {
        conditionallyRefreshAuth(initialAppLoad(dispatch));
        return () => {
            dispatch({ type: 'socket/disconnect' });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthBoundary>
            <Box className='App'>
                <CssBaseline enableColorScheme />
                <RouterProvider router={router} />
            </Box>
        </AuthBoundary>
    );
};

export default App;
