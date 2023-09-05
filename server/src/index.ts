import Fastify from 'fastify';
import fastifyIO from "fastify-socket.io";
import cors from '@fastify/cors';

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
  console.log(`User disconnected of the id ${socketId}`);
}

fastify.ready().then(() => {
  // we need to wait for the server to be ready, else `server.io` is undefined
  fastify.io.on("connection", (socket) => {
    console.log(`User connected of the id: ${socket.id}`);

    socket.on('disconnect', (reason) => {
      disconnecEventHandler(socket.id);
    });
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