import * as jwt from 'jwt-decode';

import type { IUser } from '../../types/Auth.types';
import type { IStandardResponse } from '../../types/Request.types';
import type { AppDispatch, RootState } from '../constants/store';

import APIService from '../../services/api.service';
import { AuthLSService } from '../../services/authLs.service';
import { getRefreshTokenPending } from '../selectors/authSelectors';
import {
    authenticateUser,
    clearAuthentication,
    logoutAuth,
    refreshTokenRequestFinished,
    refreshTokenRequestPending,
    setIncorrectDetails,
    writeUserDetails,
} from '../slices/authSlice';

import { intakeError } from './errorThunks';
import { initialAppLoad } from './genericThunks';

/**
 * Lower-order thunk to handle the result of a successful login.
 * @category Redux
 * @subcategory Thunks
 * @param response The API response.
 */
export const handleAuthResponse = (
    response: IStandardResponse & {
        accessToken: string;
        refreshToken: string;
        user: IUser;
    },
    callback?: () => void,
) => {
    return async (dispatch: AppDispatch) => {
        try {
            if (!response.accessToken) {
                throw new Error(
                    'No valid token received when trying to login.',
                );
            }

            const accessDecoded = jwt.jwtDecode(response.accessToken);
            const refreshDecoded = jwt.jwtDecode(response.refreshToken);

            AuthLSService.writeAccessToken(response.accessToken);
            AuthLSService.writeRefreshToken(response.refreshToken);
            dispatch(
                authenticateUser({
                    accessToken: response.accessToken,
                    accessTokenExpires: accessDecoded.exp ?? 0,
                    refreshToken: response.refreshToken,
                    refreshTokenExpires: refreshDecoded.exp ?? 0,
                }),
            );

            dispatch(
                writeUserDetails({
                    user: response.user,
                }),
            );

            if (callback) {
                callback();
            }
        } catch (error: unknown) {
            // @ts-expect-error unknown error
            if (error?.status === 404) {
                dispatch(setIncorrectDetails());
            } else {
                dispatch(intakeError(error));
            }
        }
    };
};
/**
 * Attempts to log in the user and fetch the user's details.
 * @category Redux
 * @subcategory Thunks
 * @param username The user-entered username.
 * @param password The user-entered password.
 */
export const loginUser =
    (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            const response = await APIService.loginUser(username, password);

            if (response.status === 404) {
                dispatch(setIncorrectDetails());
            } else {
                dispatch(
                    handleAuthResponse(response, initialAppLoad(dispatch)),
                );
            }
        } catch (error: unknown) {
            // @ts-expect-error unknown error
            if (error?.status === 404) {
                dispatch(setIncorrectDetails());
            } else {
                dispatch(intakeError(error));
            }
        }
    };

/**
 * Attempts to register a new user account.
 * @category Redux
 * @subcategory Thunks
 * @param username The user-entered username.
 * @param password The user-entered password.
 */
export const registerUser =
    (username: string, password: string, roles: string[]) =>
    async (dispatch: AppDispatch) => {
        try {
            const response = await APIService.registerUser(
                username,
                password,
                roles,
            );

            if (response.status === 404) {
                dispatch(setIncorrectDetails());
            } else {
                dispatch(
                    handleAuthResponse(response, initialAppLoad(dispatch)),
                );
            }
        } catch (error: unknown) {
            // @ts-expect-error unknown error
            if (error?.status === 404) {
                dispatch(setIncorrectDetails());
            } else {
                dispatch(intakeError(error));
            }
        }
    };

/**
 * Logs out a user, clears their stored details, and redirects them to the login page.
 * @category Redux
 * @subcategory Thunks
 */
export const userUnauthenticated = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(clearAuthentication());
    } catch (error) {
        dispatch(intakeError(error));
    }
};

/**
 * Attempts to refresh the user's authentication using the stored refresh token.
 * @category Redux
 * @subcategory Thunks
 */
export const refreshAuthentication = (callback?: () => void) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const refreshRequestPending = getRefreshTokenPending(getState());
            // console.log({ refreshRequestPending });

            if (refreshRequestPending) {
                // console.log('refresh request already pending');
                return;
            }

            // console.log('...set token to pending');
            dispatch(refreshTokenRequestPending());
            const refreshToken = AuthLSService.getRefreshToken();
            // console.log({ refreshToken });

            if (!refreshToken) {
                // console.log('user cannot be re-authenticated :(');
                dispatch(userUnauthenticated());
                return;
            }

            const response = await APIService.refreshToken(refreshToken);

            if (response.status === 401 || response.status === 403) {
                dispatch(userUnauthenticated());
                // router.navigate(
                //     ROUTES_FACTORY.LOGIN(
                //         `${window.location.pathname}${window.location.search}`,
                //     ),
                // );
            } else {
                dispatch(handleAuthResponse(response, callback));
            }
        } catch (error: unknown) {
            // @ts-expect-error unknown error
            if (error?.status === 401 || error?.status === 403) {
                dispatch(userUnauthenticated());
                // @ts-expect-error unknown error
            } else if (error?.status === 404) {
                dispatch(setIncorrectDetails());
            } else {
                dispatch(intakeError(error));
            }
            dispatch(refreshTokenRequestFinished());
        }
    };
};

/**
 * Checks the current time against the user's auth token expiry and conditionally refreshes the auth.
 *
 * Intended to be dispatched frequently as a way of verifying the user's auth before a potential action which will result in a logout.
 *
 * By default it will attempt to refresh if the token if the current token is less than 1 minute from expiry. This can be overridden by the `margin` argument.
 * @category Redux
 * @subcategory Thunks
 * @param margin Minimum time in milliseconds to the token's expiry. (default 120_000ms)
 */
export const checkAuth =
    (margin?: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const state = getState();
            if (
                state.auth.accessTokenExpires <=
                new Date().getTime() - (margin ?? 120_000)
            ) {
                dispatch(refreshAuthentication());
            }
        } catch (error: unknown) {
            // @ts-expect-error unknown error
            if (error?.status === 401 || error?.status === 403) {
                dispatch(userUnauthenticated());
                // @ts-expect-error unknown error
            } else if (error?.status === 404) {
                dispatch(setIncorrectDetails());
            } else {
                dispatch(intakeError(error));
            }
        }
    };

/**
 * Logs the user out and clears user details.
 * @category Redux
 * @subcategory Thunks
 */
export const userLogout = () => async (dispatch: AppDispatch) => {
    try {
        AuthLSService.deleteAccessToken();
        AuthLSService.deleteRefreshToken();
        dispatch(logoutAuth());
    } catch (error: unknown) {
        dispatch(intakeError(error));
    }
};
