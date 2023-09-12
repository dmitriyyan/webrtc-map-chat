import type { Server, Socket } from "socket.io";

import {
  CHAT_MESSAGE,
  CREATE_VIDEOCHAT,
  DISCONNECT,
  GET_ID,
  JOIN_VIDEOCHAT,
  LEAVE_VIDEOCHAT,
  USER_LOGIN,
} from "./events.ts";
import {
  chatMessageHandler,
  createVideoChatHandler,
  disconnecEventHandler,
  joinVideoChatHandler,
  leaveVideoChatHandler,
  loginEventHandler,
} from "./handlers.ts";

export default function socketHandler(io: Server, socket: Socket) {
  console.log(`User connected: ${socket.id}`);

  socket.on(USER_LOGIN, (data: UserData) => {
    loginEventHandler(io, socket, data);
  });

  socket.on(CHAT_MESSAGE, (data: Message) => chatMessageHandler(io, data));

  socket.on(CREATE_VIDEOCHAT, (data: { peerId: string; id: string }) =>
    createVideoChatHandler(io, socket, data),
  );

  socket.on(JOIN_VIDEOCHAT, (data: { peerId: string; id: string }) =>
    joinVideoChatHandler(io, socket, data),
  );

  socket.on(LEAVE_VIDEOCHAT, (data: { id: string }) =>
    leaveVideoChatHandler(io, socket, data),
  );

  socket.on(DISCONNECT, () => {
    disconnecEventHandler(io, socket);
  });

  socket.emit(GET_ID, socket.id);
}
