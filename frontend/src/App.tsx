import { useState } from "react";
import { io, Socket } from "socket.io-client";
import Login from "./Login";
import MessageBox from "./MessageBox";

const WS_URL = "http://localhost:5000";

interface ServerToClientEvents {
  "new-message": (message: string, username: string) => void;
}

interface ClientToServerEvents {
  "Hello-Server": (usernameInput: string) => void;
  "send-message": (message: string, username: string) => void;
}

export type MySocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const App = () => {
  const [username, setUsername] = useState<string>("");
  const [socket, setSocket] = useState<MySocket>();

  const loginHandler = (usernameInput: string) => {
    setUsername(usernameInput);
    const socket: MySocket = io(WS_URL);
    setSocket(socket);

    socket.emit(`Hello-Server`, usernameInput);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center overflow-scroll">
      <div className="p-2 bg-orange text-white m-2 rounded-2xl">
        {username === "" ? "Ofline" : username}
      </div>
      {username === "" ? (
        <Login onLogin={loginHandler} />
      ) : (
        <MessageBox socket={socket!} username={username} />
      )}
    </div>
  );
};

export default App;
