import { useState } from "react";

const Login = ({ onLogin }: { onLogin: (usernameInput: string) => void }) => {
  const [inputValue, setInputValue] = useState("");

  const submitHandler = () => {
    if (inputValue === "") return;
    onLogin(inputValue);
  };

  return (
    <>
      <label className="p-4">PLease enter your username to login:</label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border-[0.1rem] border-gray-dark p-4"
      />
      <button
        onClick={submitHandler}
        className="bg-gray-dark text-white py-2 px-4 m-4 hover:text-orange"
      >
        Login
      </button>
    </>
  );
};

export default Login;
