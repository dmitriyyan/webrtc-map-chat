import { io, Socket } from "socket.io-client";
import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";

import type { AppDispatch, RootState } from "../store";
import type { UserData } from "../features/map/mapSlice";

import { login, setId } from "../features/user/userSlice";
import { setOnlineUsers } from "../features/map/mapSlice";
import {
  sendChatMessage,
  getChatMessage,
  addChatbox,
} from "../features/messenger/messengerSlice";
import {
  call,
  createVideoChat,
  joinVideoChat,
  leaveVideoChat,
  setInVideoChat,
  setVideoChats,
  videoChatDisconnect,
} from "../features/videoChat/videoChatSlice";
import type { Message } from "../features/messenger/messengerSlice";
import type { VideoChat } from "../features/videoChat/videoChatSlice";

const socketIOMiddleware: Middleware = (
  store: MiddlewareAPI<AppDispatch, RootState>,
) => {
  let socket: Socket | null;

  return (next) => (action) => {
    if (!socket) {
      socket = io(import.meta.env.VITE_REACT_APP_API_URL, {
        rejectUnauthorized: false,
      });

      socket.on("connect", () => {
        console.log("Connected to socket.io server");
      });

      socket.on("get-id", (data: string) => {
        store.dispatch(setId(data));
      });

      socket.on("online-users", (data: UserData[]) => {
        store.dispatch(setOnlineUsers(data));
      });

      socket.on("chat-message", (data: Omit<Message, "isMyMessage">) => {
        store.dispatch(getChatMessage(data));
        const username =
          store
            .getState()
            .map.onlineUsers.find((user) => user.id === data.senderId)
            ?.username ?? "";
        store.dispatch(
          addChatbox({
            id: data.senderId,
            username,
          }),
        );
      });

      socket.on("video-chats", (data: VideoChat[]) => {
        store.dispatch(setVideoChats(data));
      });

      socket.on("videochat-init", (data: { peerId: string }) => {
        store.dispatch(call(data));
      });

      socket.on("videochat-disconnect", () => {
        store.dispatch(videoChatDisconnect());
      });
    }

    if (login.match(action)) {
      const state = store.getState();

      socket.emit("user-login", {
        username: action.payload,
        coords: state.map.myLocation,
      });
    }

    if (sendChatMessage.match(action)) {
      socket.emit("chat-message", action.payload);
    }

    if (createVideoChat.match(action)) {
      store.dispatch(setInVideoChat(action.payload.id));
      socket.emit("create-videochat", action.payload);
    }

    if (joinVideoChat.match(action)) {
      store.dispatch(setInVideoChat(action.payload.id));
      socket.emit("join-videochat", action.payload);
    }

    if (leaveVideoChat.match(action)) {
      store.dispatch(setInVideoChat(null));
      socket.emit("leave-videochat", { id: action.payload });
      store.dispatch(videoChatDisconnect());
    }

    next(action);
  };
};

export default socketIOMiddleware;
