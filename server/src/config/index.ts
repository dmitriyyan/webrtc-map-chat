import Fastify from "fastify";
import fastifyIO from "fastify-socket.io";
const { default: socketioServer } = fastifyIO;
import { PeerServer } from "peer";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: ".env.local", override: true });

PeerServer({
  host: process.env.HOST || "localhost",
  port: Number(process.env.SIGNAL_PORT) || 9000,
  path: process.env.SIGNAL_PATH || "/peer",
  ssl: {
    key: fs
      .readFileSync(path.join(__dirname, "..", "keys", "key.pem"))
      .toString(),
    cert: fs
      .readFileSync(path.join(__dirname, "..", "keys", "cert.pem"))
      .toString(),
  },
  corsOptions: {
    origin: "*",
  },
});

export const fastify = Fastify({
  logger: true,
  https: {
    key: fs.readFileSync(path.join(__dirname, "..", "keys", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "..", "keys", "cert.pem")),
  },
});

await fastify.register(cors, {
  origin: "*",
});
await fastify.register(socketioServer, {
  cors: {
    origin: "*",
  },
});
