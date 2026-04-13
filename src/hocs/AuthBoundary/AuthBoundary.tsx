import { type FC, useState } from 'react';

import { Dialog } from '@mui/material';

import type { IProps } from './AuthBoundary.types';

import { useAppSelector } from '../../hooks/ReduxHookWrappers';
import { getIsAuthenticated } from '../../redux/selectors/authSelectors';

import Login from './components/Login';
import Signup from './components/Signup';

const AuthBoundary: FC<IProps> = ({ children }) => {
    const [isSignup, setIsSignup] = useState(false);

    const userAuthenticated = useAppSelector(getIsAuthenticated);

    if (userAuthenticated) {
        return children;
    }
    return (
        <Dialog fullWidth maxWidth='sm' open={true}>
            {isSignup ? (
                <Signup setIsSignup={setIsSignup} />
            ) : (
                <Login setIsSignup={setIsSignup} />
            )}
        </Dialog>
    );
};

export default AuthBoundary;
