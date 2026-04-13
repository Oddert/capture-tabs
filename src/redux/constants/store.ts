import { configureStore } from '@reduxjs/toolkit';

import { Socket } from '../../utils/socketManager';
import { socketMiddleware } from '../middleware/socketMiddleware';
import authReducer from '../slices/authSlice';
import errorReducer from '../slices/errorSlice';
import instanceReducer from '../slices/instanceSlice';
import watchlistReducer from '../slices/watchlistSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        error: errorReducer,
        instance: instanceReducer,
        watchlist: watchlistReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware(new Socket())),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
