import { type FC, type FormEvent, Fragment, useState } from 'react';

import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from '@mui/material';

import type { IProps } from './Signup.types';
import type { LoginFormContent } from '../../AuthBoundary.types';

import { roles } from '../../../../constants/appConstants';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../hooks/ReduxHookWrappers';
import { getAccessTokenPending } from '../../../../redux/selectors/authSelectors';
import { registerUser } from '../../../../redux/thunks/authThunks';

/**
 * Displays a form to create a new account.
 * @category Higher Order Components
 * @subcategory Auth Boundary
 * @component
 * @param props.setIsSignup Callback function to allow the mode to be changed from 'signup' to 'login'.
 */
const Signup: FC<IProps> = ({ setIsSignup }) => {
    const [chosenRoles, setChosenRoles] = useState<
        { id: string; readableName: string }[]
    >([]);

    const dispatch = useAppDispatch();

    const loading = useAppSelector(getAccessTokenPending);

    const handleSubmit = (event: FormEvent<LoginFormContent>) => {
        event.preventDefault();
        dispatch(
            registerUser(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                event.currentTarget.username.value as string,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                event.currentTarget.password.value as string,
                chosenRoles.map((role) => role.id),
            ),
        );
    };

    return (
        <Fragment>
            <DialogTitle textAlign='center'>Register an account</DialogTitle>
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
                        <Autocomplete
                            getOptionLabel={(opt) => opt.readableName}
                            getOptionKey={(opt) => opt.id}
                            multiple
                            onChange={(_e, value) => {
                                setChosenRoles(value);
                            }}
                            options={roles}
                            renderInput={(props) => <TextField {...props} />}
                            value={chosenRoles}
                        />
                        <Button
                            disabled={loading}
                            name='roles'
                            type='submit'
                            variant='contained'
                        >
                            {loading ? (
                                <CircularProgress title='signup request pending' />
                            ) : (
                                'Signup'
                            )}
                        </Button>
                    </Box>
                </form>
                <Typography textAlign='center' sx={{ mt: 3 }}>
                    Already a user?{' '}
                    <Button
                        disabled={loading}
                        onClick={() => {
                            setIsSignup(false);
                        }}
                    >
                        Log in
                    </Button>
                </Typography>
            </DialogContent>
        </Fragment>
    );
};

export default Signup;
