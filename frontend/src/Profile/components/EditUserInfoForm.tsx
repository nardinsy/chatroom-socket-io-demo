import { FC, ChangeEvent, useState } from "react";

interface EditUserInfoFormT {
  username: string;
  changeUsername: (username: string) => void;
}
const EditUserInfoForm: FC<EditUserInfoFormT> = ({
  username,
  changeUsername,
}) => {
  const [usernameInput, setUsernameInput] = useState(username);

  const changeUsernameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(event.target.value);
    changeUsername(event.target.value);
  };

  return (
    <>
      <div className="flex flex-row items-center p-3">
        <label className="text-black-light font-bold pt-1 pr-2">
          Username:
        </label>
        <input
          type="text"
          value={usernameInput}
          onChange={changeUsernameHandler}
          className="relative w-full text-base border rounded-4xl pl-1 py-2 outline-none border-gray focus:outline-none focus:border-primary"
        />
      </div>

      {/* <div className={classes.control}>
        <label>Email</label>
        <input type="email" ref={emailRef} />
        </div> */}
    </>
  );
};

export default EditUserInfoForm;
