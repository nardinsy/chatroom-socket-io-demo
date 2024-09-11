import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

interface ServerToClientEvents {
  "new-message": (message: string, username: string) => void;
}

interface ClientToServerEvents {
  "hello-server": (usernameInput: string) => void;
  "send-message": (message: string, username: string) => void;
}

type WSServer = Server<ClientToServerEvents, ServerToClientEvents>;

type WSSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

const app = express();

const server = createServer(app);
const ws: WSServer = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
  },
});

ws.on("connection", (socket: WSSocket) => {
  console.log("Connection established");

  socket.on("hello-server", (username: string) => {
    console.log(`${username} say hello`);
  });

  socket.on("send-message", (message: string, username: string) => {
    console.log(message);
    ws.emit("new-message", message, username);
  });
});

server.listen(5000);
console.log("Listening on port 5000");
