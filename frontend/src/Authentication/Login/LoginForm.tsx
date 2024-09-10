import { ChangeEvent, MouseEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Button from "../../shared-UI/Button";
import classes from "./LoginForm.module.css";
import { UserLoginInformation } from "../../../../backend/src/shared/dtos";
import useRequiredAuthContext from "../../hooks/use-required-authContext";

interface LoginFormInputValidation {
  email: boolean;
  password: boolean;
}

const LoginForm: React.FC = () => {
  const authContext = useRequiredAuthContext();

  if (authContext.isLoggedin) throw new Error("User is loggedin already.");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [formInputsIsvalid, setFormInputsIsvalid] =
    useState<LoginFormInputValidation>({
      email: true,
      password: true,
    });

  const inputValidation = (email: string, password: string) => {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    // const isValidPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    const isValidPassword = /.*/;
    if (
      email &&
      password &&
      email.match(isValidEmail) &&
      password.match(isValidPassword)
    ) {
      return true;
    }

    const nextState = {
      email: formInputsIsvalid.email,
      password: formInputsIsvalid.password,
    };

    if (!email || !email.match(isValidEmail)) {
      nextState.email = false;
    }

    if (!password || !password.match(isValidPassword)) {
      nextState.password = false;
    }

    setFormInputsIsvalid(nextState);

    return false;
  };

  const submitHandler = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!inputValidation(email, password)) return;

    const userInfo: UserLoginInformation = {
      email,
      password,
    };

    authContext.login(userInfo);
  };

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!formInputsIsvalid.email) {
      formInputsIsvalid.email = event.target.value ? true : false;
    }
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!formInputsIsvalid.password) {
      formInputsIsvalid.password = event.target.value ? true : false;
    }
    setPassword(event.target.value);
  };

  return (
    <form>
      <div className={classes.control}>
        <label htmlFor="email">E-Mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={emailChangeHandler}
          className={formInputsIsvalid.email ? `` : `${classes.invalid}`}
          autoFocus
        />
      </div>

      <div className={classes.control}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={passwordChangeHandler}
          className={formInputsIsvalid.password ? `` : `${classes.invalid}`}
        />
        <FontAwesomeIcon
          icon={faEye}
          data-testid="icon"
          className={classes["eye-icon"]}
          onClick={() => setShowPassword((prev) => !prev)}
        />
      </div>

      <div className={classes.actions}>
        <Button
          type="submit"
          onClick={submitHandler}
          // onKeyPress={submitByEnterHandler}
          action={"submit"}
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
