import { FC, useState } from "react";
import classes from "./passwordInput.module.css";

type PasswordInputT = {
  label: string;
  id: string;
  showPassword: boolean;
  autoFocus?: boolean;
  invalid?: boolean;
};
const PasswordInput: FC<PasswordInputT> = ({
  label,
  id,
  showPassword,
  autoFocus = false,
  invalid = false,
}) => {
  const [password, setPassword] = useState("");

  return (
    <div className={classes.control}>
      <label htmlFor="password">{label}</label>
      <input
        className={invalid ? `${classes.invalid}` : ``}
        id={id}
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default PasswordInput;
