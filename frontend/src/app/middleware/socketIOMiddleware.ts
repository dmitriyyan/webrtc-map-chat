import { io, Socket } from "socket.io-client";
import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";

import type { AppDispatch, RootState } from "../store";
import { login } from "../features/user/userSlice";
import { setOnlineUsers } from "../features/map/mapSlice";

const socketIOMiddleware: Middleware = (
  store: MiddlewareAPI<AppDispatch, RootState>,
) => {
  let socket: Socket;
  return (next) => (action) => {
    if (!socket) {
      socket = io(import.meta.env.VITE_REACT_APP_API_URL);
    }

    socket.on("connect", () => {
      console.log("Connected to socket.io server");
    });

    socket.on("online-users", (data) => {
      store.dispatch(setOnlineUsers(data));
    });

    if (login.match(action)) {
      const state = store.getState();

      socket.emit("user-login", {
        username: action.payload,
        coords: state.map.myLocation,
      });
    }

    next(action);
  };
};

export default socketIOMiddleware;
