import type { IUser } from '../types/Auth.types';
import type { IStandardResponse } from '../types/Request.types';

import request from '../common/request';

/**
 * Primary interface for interacting with the API.
 *
 * Contains a list of functions for calling endpoints.
 * @category Services
 * @subcategory API Service
 */
const APIService = Object.freeze({
    // Auth
    /**
     * Attempts to login the user.
     * @param username The entered username.
     * @param password The entered password.
     * @returns The access and refresh tokens or a failed login attempt.
     */
    loginUser: async (username: string, password: string) => {
        const response: IStandardResponse & {
            accessToken: string;
            refreshToken: string;
            user: IUser;
        } = await request.post('/auth/login', { username, password });
        return response;
    },
    /**
     * Gets the full user details for a logged in user.
     * @returns The user details.
     * @param refreshToken The user's last refresh token.
     * @returns The access and refresh tokens or a failed login attempt.
     */
    refreshToken: async (refreshToken: string) => {
        const response: IStandardResponse & {
            accessToken: string;
            refreshToken: string;
            user: IUser;
        } = await request.post('/auth/token-refresh', { refreshToken });
        return response;
    },
    /**
     * Attempts to register a new user account.
     * @param username The entered username.
     * @param password The entered password.
     * @param areas List of roles to assign to the user.
     * @returns The access and refresh tokens or a failed register attempt.
     */
    registerUser: async (
        username: string,
        password: string,
        areas: string[],
    ) => {
        const response: IStandardResponse & {
            accessToken: string;
            refreshToken: string;
            user: IUser;
        } = await request.post('/auth/signup', {
            username,
            password,
            areas,
        });
        return response;
    },
    /**
     * Gets the full user details for a logged in user.
     * @returns The user details.
     */
    userDetails: async () => {
        const response: IStandardResponse & { user: IUser } =
            await request.get('/auth/user');
        return response;
    },
});

export default APIService;
