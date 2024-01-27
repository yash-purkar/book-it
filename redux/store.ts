import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices";

// Creating a store.
export const store = configureStore({
  reducer: {
    auth: userReducer,
  },
});

// Types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
