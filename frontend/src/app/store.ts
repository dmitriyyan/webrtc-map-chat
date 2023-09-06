import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./features/map/mapSlice";

export const store = configureStore({
  reducer: {
    map: mapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
