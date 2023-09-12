import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./features/map/mapSlice";
import userReducer from "./features/user/userSlice";
import messengerReducer from "./features/messenger/messengerSlice";
import videoChatReducer from "./features/videoChat/videoChatSlice";

import socketIOMiddleware from "./middleware/socketIOMiddleware";
import peerjsMiddleware from "./middleware/peerjsMiddleware";

export const store = configureStore({
  reducer: {
    map: mapReducer,
    user: userReducer,
    messenger: messengerReducer,
    videoChat: videoChatReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      socketIOMiddleware,
      peerjsMiddleware,
    ]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
