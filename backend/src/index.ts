import express from "express";
import { json } from "body-parser";
import { configureCORS } from "./cors";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();
app.use(configureCORS);

app.use(json());

const server = createServer(app);
const ws = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
  },
});

ws.on("connection", (socket) => {
  console.log("Connection established");

  socket.on("Hello-Server", (username: string) => {
    console.log(`${username} say hello`);
  });

  socket.on("send-message", (message: string, username: string) => {
    ws.emit("new-message", message, username);
  });
});

server.listen(5000);
console.log("Listening on port 5000");
