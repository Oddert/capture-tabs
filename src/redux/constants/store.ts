import { configureStore } from '@reduxjs/toolkit';

import { Socket } from '../../utils/socketManager';
import { socketMiddleware } from '../middleware/socketMiddleware';
import authReducer from '../slices/authSlice';
import errorReducer from '../slices/errorSlice';
import uplaodReducer from '../slices/uploadSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        error: errorReducer,
        upload: uplaodReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware(new Socket())),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
