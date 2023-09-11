import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./features/map/mapSlice";
import userReducer from "./features/user/userSlice";
import messengerReducer from "./features/messenger/messengerSlice";

import socketIOMiddleware from "./middleware/socketIOMiddleware";

export const store = configureStore({
  reducer: {
    map: mapReducer,
    user: userReducer,
    messenger: messengerReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([socketIOMiddleware]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
