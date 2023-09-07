import Fastify from 'fastify';
import fastifyIO from "fastify-socket.io";
import cors from '@fastify/cors';

import type { Socket } from 'socket.io';

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

const onlineUsers: Users = {};

const { default: socketioServer } = fastifyIO;

const fastify = Fastify({
  logger: true
});

await fastify.register(socketioServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

await fastify.register(cors);

fastify.get('/', async (request, reply) => {
  fastify.io.emit("hello");``
});


function disconnecEventHandler(socketId: string) {
  delete onlineUsers[socketId];

  fastify.io.to('online-users').emit('online-users', convertOnlineUsersToArray());
}

function convertOnlineUsersToArray() {
  return Object.values(onlineUsers);
}

function loginEventHandler(socket: Socket, data: UserData) {
  socket.join('online-users');

  onlineUsers[socket.id] = { ...data, id: socket.id };

  fastify.io.to('online-users').emit('online-users', convertOnlineUsersToArray());
}

fastify.ready().then(() => {
  // we need to wait for the server to be ready, else `server.io` is undefined
  fastify.io.on("connection", (socket) => {
    console.log(`User connected of the id: ${socket.id}`);

    socket.on('user-login', (data: UserData) => {
      loginEventHandler(socket, data);
    })

    socket.on('disconnect', () => {
      disconnecEventHandler(socket.id);
    });

    socket.emit('get-id', socket.id);
  });
});

const start = async () => {
  try {
    const address = await fastify.listen({ port: 3000 });
    console.log(`Server is running on ${address}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();