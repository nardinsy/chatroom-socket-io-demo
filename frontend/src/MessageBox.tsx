import { useEffect, useState } from "react";
import { MySocket } from "./App";

const MessageBox = ({
  socket,
  username,
}: {
  socket: MySocket;
  username: string;
}) => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [messagesFromServer, setMessagesFromServer] = useState<string[]>([]);

  useEffect(() => {
    socket.on("new-message", (message: string, username: string) => {
      const newMessage = `${username}: ${message}`;
      setMessagesFromServer((pre) => [newMessage, ...pre]);
    });

    return () => {
      socket.close();
    };
  }, [socket]);

  const sendMessageHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputMessage === "") return;

    socket.emit("send-message", inputMessage, username);
    setInputMessage("");
  };

  return (
    <>
      <div className="w-full h-4/5 p-4 overflow-scroll">
        <div className="text-gray-dark font-bold py-4">Chat room</div>
        {messagesFromServer.map((message, index) => (
          <div
            key={index}
            className="bg-gray-dark text-white w-fit px-4 py-1 rounded-2xl my-2"
          >
            {message}
          </div>
        ))}
      </div>

      <div className="fixed bottom-1 left-0 w-full flex flex-row justify-between px-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          className="w-full border-[0.1rem] rounded-3xl outline-none p-4 border-gray-dark"
        />
        <button
          onClick={sendMessageHandler}
          className="w-16 p-2 rounded-3xl  bg-gray-dark text-white hover:text-orange"
        >
          Send
        </button>
      </div>
    </>
  );
};

export default MessageBox;
