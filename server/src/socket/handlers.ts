import type { Socket, Server } from "socket.io";

import { onlineUsers } from "../db/onlineUsers.ts";
import { videoChats } from "../db/videoChats.ts";
import {
  socketChatMessageHandler,
  socketCreateVideoChatHandler,
  socketDisconnecEventHandler,
  socketJoinVideoChatHandler,
  socketLeaveVideoChatHandler,
  socketLoginEventHandler,
} from "./socketHandlers.ts";

export function loginEventHandler(io: Server, socket: Socket, data: UserData) {
  onlineUsers.addUser({ ...data, id: socket.id });

  socketLoginEventHandler(
    io,
    socket,
    onlineUsers.toArray(),
    videoChats.toArray(),
  );
}

export function chatMessageHandler(io: Server, data: Message) {
  if (onlineUsers.isUserOnline(data.receiverId)) {
    socketChatMessageHandler(io, data);
  }
}

export function createVideoChatHandler(
  io: Server,
  socket: Socket,
  data: { peerId: string; id: string },
) {
  videoChats.addChat({
    chatId: data.id,
    userId: socket.id,
    peerId: data.peerId,
    username: onlineUsers.getUsernameById(socket.id),
  });

  socketCreateVideoChatHandler(io, videoChats.toArray());
}

export function joinVideoChatHandler(
  io: Server,
  socket: Socket,
  data: { peerId: string; id: string },
) {
  const videoChat = videoChats.getChat(data.id);
  if (videoChat) {
    videoChat.participants.push({
      id: socket.id,
      username: onlineUsers.getUsernameById(socket.id),
      peerId: data.peerId,
    });

    socketJoinVideoChatHandler(
      io,
      socket,
      { peerId: data.peerId },
      videoChat.participants,
      videoChats.toArray(),
    );
  }
}

export function leaveVideoChatHandler(
  io: Server,
  socket: Socket,
  data: { id: string },
) {
  const videoChat = videoChats.getChat(data.id);

  if (videoChat) {
    videoChat.participants = videoChat.participants.filter(
      (participant) => participant.id !== socket.id,
    );

    if (videoChat.participants.length < 1) {
      videoChats.deleteChat(data.id);
    }

    socketLeaveVideoChatHandler(
      io,
      socket,
      videoChat.participants,
      videoChats.toArray(),
    );
  }
}

export function disconnecEventHandler(io: Server, socket: Socket) {
  const chats = videoChats
    .toArray()
    .filter((chat) => chat.participants.some((p) => p.id === socket.id));

  chats.forEach((chat) => {
    chat.participants = chat.participants.filter((p) => p.id !== socket.id);

    if (chat.participants.length < 1) {
      videoChats.deleteChat(chat.id);
    }
  });

  onlineUsers.deleteUser(socket.id);

  socketDisconnecEventHandler(
    io,
    socket,
    chats,
    videoChats.toArray(),
    onlineUsers.toArray(),
  );
}
