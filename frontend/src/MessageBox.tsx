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
  }, []);

  const sendMessageHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputMessage === "") return;

    socket.emit("send-message", inputMessage, username);
    setInputMessage("");
  };
  return (
    <>
      <label className="p-4">Write your message</label>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => {
          setInputMessage(e.target.value);
        }}
        className="border-[0.1rem] border-gray-dark p-4"
      />
      <button
        onClick={sendMessageHandler}
        className="bg-gray-dark text-white py-2 px-4 m-4 hover:text-orange"
      >
        Send message
      </button>

      <div className="text-gray-dark font-bold py-4">Chat room</div>
      {messagesFromServer.map((message, index) => (
        <div
          key={index}
          className="bg-gray-dark text-white px-4 py-1 rounded-2xl my-2"
        >
          {message}
        </div>
      ))}
    </>
  );
};

export default MessageBox;
