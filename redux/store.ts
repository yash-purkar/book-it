import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { bookingApi } from "./api/bookingApi";
import { roomApi } from "./api/roomApi";

// Creating a store.
export const store = configureStore({
  reducer: {
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      bookingApi.middleware,
      roomApi.middleware,
    ]),
});

// Types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
