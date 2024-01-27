import { configureStore } from "@reduxjs/toolkit";

// Creating a store.
export const store = configureStore({
  reducer: {},
});

// Types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
