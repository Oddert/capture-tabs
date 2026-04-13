import {
    PCF_DASHBOARD_ACCESS_TOKEN_LS_KEY,
    PCF_DASHBOARD_REFRESH_TOKEN_LS_KEY,
} from '../constants/appConstants';

/**
 * Provides an abstracted interface for the AUth localstorage.
 */
export const AuthLSService = Object.freeze({
    /**
     * Clears the access token key for a logout.
     */
    deleteAccessToken: () => {
        try {
            localStorage.removeItem(PCF_DASHBOARD_ACCESS_TOKEN_LS_KEY);
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    /**
     * Clears the refresh token key for a logout.
     */
    deleteRefreshToken: () => {
        try {
            localStorage.removeItem(PCF_DASHBOARD_REFRESH_TOKEN_LS_KEY);
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    /**
     * Retrieves the users stored access token if available from a previous session.
     * @returns The stored access token or null.
     */
    getAccessToken: () => {
        try {
            const token = localStorage.getItem(
                PCF_DASHBOARD_ACCESS_TOKEN_LS_KEY,
            );
            return token;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    /**
     * Retrieves the users stored refresh token if available from a previous session.
     * @returns The stored access token or null.
     */
    getRefreshToken: () => {
        try {
            const token = localStorage.getItem(
                PCF_DASHBOARD_REFRESH_TOKEN_LS_KEY,
            );
            return token;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    /**
     * Updates the user's access token in localstorage.
     * @param accessToken The new access token.
     */
    writeAccessToken: (accessToken: string) => {
        localStorage.setItem(PCF_DASHBOARD_ACCESS_TOKEN_LS_KEY, accessToken);
    },

    /**
     * Updates the user's refresh token in localstorage.
     * @param accessToken The new access token.
     */
    writeRefreshToken: (accessToken: string) => {
        localStorage.setItem(PCF_DASHBOARD_REFRESH_TOKEN_LS_KEY, accessToken);
    },
});
