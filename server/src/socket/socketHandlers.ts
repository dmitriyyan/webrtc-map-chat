import type { Socket, Server } from "socket.io";

import {
  CHAT_MESSAGE,
  ONLINE_USERS,
  VIDEOCHATS,
  VIDEOCHAT_DISCONNECT,
  VIDEOCHAT_INIT,
} from "./events.ts";

export function socketLoginEventHandler(
  io: Server,
  socket: Socket,
  users: UserData[],
  chats: VideoChat[],
) {
  socket.join(ONLINE_USERS);
  io.to(ONLINE_USERS).emit(ONLINE_USERS, users);
  io.to(ONLINE_USERS).emit(VIDEOCHATS, chats);
}

export function socketChatMessageHandler(io: Server, data: Message) {
  io.to(data.receiverId).emit(CHAT_MESSAGE, data);
}

export function socketCreateVideoChatHandler(io: Server, chats: VideoChat[]) {
  io.to(ONLINE_USERS).emit(VIDEOCHATS, chats);
}

export function socketJoinVideoChatHandler(
  io: Server,
  socket: Socket,
  data: { peerId: string },
  participants: Participant[],
  chats: VideoChat[],
) {
  participants.forEach((p) => {
    socket.to(p.id).emit(VIDEOCHAT_INIT, data);
  });

  io.to(ONLINE_USERS).emit(VIDEOCHATS, chats);
}

export function socketLeaveVideoChatHandler(
  io: Server,
  socket: Socket,
  participants: Participant[],
  chats: VideoChat[],
) {
  if (participants.length > 0) {
    participants.forEach((p) => {
      socket.to(p.id).emit(VIDEOCHAT_DISCONNECT);
    });
  }

  io.to(ONLINE_USERS).emit(VIDEOCHATS, chats);
}

export function socketDisconnecEventHandler(
  io: Server,
  socket: Socket,
  chatsWithDisconnectedUser: VideoChat[],
  allChats: VideoChat[],
  users: UserData[],
) {
  chatsWithDisconnectedUser.forEach((chat) => {
    chat.participants.forEach((p) => {
      socket.to(p.id).emit(VIDEOCHAT_DISCONNECT);
    });

    io.to(ONLINE_USERS).emit(VIDEOCHATS, allChats);
  });

  io.to(ONLINE_USERS).emit(ONLINE_USERS, users);
}
