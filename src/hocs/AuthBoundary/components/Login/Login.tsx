import { type FC, type FormEvent, Fragment } from 'react';

import {
    Box,
    Button,
    CircularProgress,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from '@mui/material';

import type { IProps } from './Login.types';
import type { LoginFormContent } from '../../AuthBoundary.types';

import {
    useAppDispatch,
    useAppSelector,
} from '../../../../hooks/ReduxHookWrappers';
import { getAccessTokenPending } from '../../../../redux/selectors/authSelectors';
import { loginUser } from '../../../../redux/thunks/authThunks';

/**
 * Displays a form to login.
 * @category Higher Order Components
 * @subcategory Auth Boundary
 * @component
 * @param props.setIsSignup Callback function to allow the mode to be changed from 'signup' to 'login'.
 */
const Login: FC<IProps> = ({ setIsSignup }) => {
    const dispatch = useAppDispatch();

    const loading = useAppSelector(getAccessTokenPending);

    const handleSubmit = (event: FormEvent<LoginFormContent>) => {
        event.preventDefault();
        dispatch(
            loginUser(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                event.currentTarget.username.value as string,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                event.currentTarget.password.value as string,
            ),
        );
    };

    return (
        <Fragment>
            <DialogTitle textAlign='center'>Please login</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gridGap: '16px',
                            mt: 2,
                        }}
                    >
                        <TextField fullWidth label='RACF ID' name='username' />
                        <TextField
                            fullWidth
                            label='Password'
                            name='password'
                            type='password'
                        />
                        <Button
                            disabled={loading}
                            type='submit'
                            variant='contained'
                        >
                            {loading ? (
                                <CircularProgress title='login request pending' />
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </Box>
                </form>
                <Typography textAlign='center' sx={{ mt: 3 }}>
                    Need an account?{' '}
                    <Button
                        disabled={loading}
                        onClick={() => {
                            setIsSignup(true);
                        }}
                    >
                        Sign up
                    </Button>
                </Typography>
            </DialogContent>
        </Fragment>
    );
};

export default Login;
