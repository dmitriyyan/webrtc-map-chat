import Fastify from 'fastify';
import fastifyIO from "fastify-socket.io";
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import type { Socket } from 'socket.io';

dotenv.config({ path: '.env.local', override: true });

type Coords = {
  longitude: number;
  latitude: number;
}

type UserData = {
  id: string;
  username: string;
  coords: Coords;
}

type Users = {
  [socketId: string]: UserData;
}

type Message = {
  id: string;
  receiverId: string;
  content: string;
}

type Participant = {
  id: string;
  username: string;
  peerId: string;
}

type VideoChat = {
  id: string;
  participants: Participant[]
}

type VideoChats = {
  [id: string]: VideoChat;
}

const onlineUsers: Users = {};
const videoChats: VideoChats = {}

const { default: socketioServer } = fastifyIO;

const fastify = Fastify({
  logger: true,
    https: {
      key: fs.readFileSync(path.join(__dirname, '..', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, '..', 'cert.pem'))
    }
});

await fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});
await fastify.register(socketioServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

fastify.get('/', async (request, reply) => {
  fastify.io.emit("hello");``
});


function disconnecEventHandler(socketId: string) {
  delete onlineUsers[socketId];

  fastify.io.to('online-users').emit('online-users', convertToArray(onlineUsers));
}


function convertToArray(obj: object) {
  return Object.values(obj);
}

function loginEventHandler(socket: Socket, data: UserData) {
  socket.join('online-users');

  onlineUsers[socket.id] = { ...data, id: socket.id };

  fastify.io.to('online-users').emit('online-users', convertToArray(onlineUsers));
}

function chatMessageHandler(data: Message) {
  if (onlineUsers[data.receiverId]) {
    fastify.io.to(data.receiverId).emit('chat-message', data);
  }
}

function createVideoChatHandler(socket: Socket, data: {peerId: string, id: string}) {
  videoChats[data.id] = {
    id: data.id,
    participants: [
      { id: socket.id, peerId: data.peerId, username: onlineUsers[socket.id].username }
    ]
  }

  fastify.io.emit('video-chats', convertToArray(videoChats));
}

fastify.ready().then(() => {
  fastify.io.on("connection", (socket) => {
    console.log(`User connected of the id: ${socket.id}`);

    socket.on('user-login', (data: UserData) => {
      loginEventHandler(socket, data);
    })

    socket.on('chat-message', chatMessageHandler);
    socket.on("create-videochat", (data: {peerId: string, id: string}) => createVideoChatHandler(socket, data));

    socket.on('disconnect', () => {
      disconnecEventHandler(socket.id);
    });

    socket.emit('get-id', socket.id);
  });
});

const start = async () => {
  try {
    const address = await fastify.listen({ port: Number(process.env.PORT) || 3000, host: process.env.HOST || 'localhost' });
    console.log(`Server is running on ${address}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();