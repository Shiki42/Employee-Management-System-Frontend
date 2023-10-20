/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */


import { Middleware } from "@reduxjs/toolkit";
import { AnyAction, Dispatch } from "redux";
import { configureStore, MiddlewareAPI } from "@reduxjs/toolkit";
import userReducer from './userSlice'

const loggerMiddleware: Middleware = (api: MiddlewareAPI<Dispatch<AnyAction>, any>) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    console.log('Dispatching action:', action.type);
    console.log('Action payload:', action.payload);
    return next(action);
};

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware as Middleware),
    devTools: true,
});

export default store;