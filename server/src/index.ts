import type { Socket } from "socket.io";

import { fastify } from "./config/index.ts";
import { CONNECTION } from "./socket/events.ts";
import socketHandler from "./socket/index.ts";

fastify.ready().then(() => {
  fastify.io.on(CONNECTION, (socket: Socket) =>
    socketHandler(fastify.io, socket),
  );
});

const start = async () => {
  try {
    const address = await fastify.listen({
      port: Number(process.env.PORT) || 3000,
      host: process.env.HOST || "localhost",
    });
    console.log(`Server is running on ${address}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
