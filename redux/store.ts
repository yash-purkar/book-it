import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { bookingApi } from "./api/bookingApi";

// Creating a store.
export const store = configureStore({
  reducer: {
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      bookingApi.middleware,
    ]),
});

// Types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
