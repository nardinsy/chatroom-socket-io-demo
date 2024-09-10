import { useRef, MouseEvent, useState, ChangeEvent } from "react";
import Button from "../../shared-UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import classes from "./SignupForm.module.css";
import { UserSignupInformation } from "../../../../backend/src/shared/dtos";
import useRequiredAuthContext from "../../hooks/use-required-authContext";

interface SignFormInputValidation {
  email: boolean;
  username: boolean;
  password: boolean;
}

const SignupForm = () => {
  const authContext = useRequiredAuthContext();

  if (authContext.isLoggedin) throw new Error("User is logged in already.");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [formInputsIsvalid, setFormInputsIsvalid] =
    useState<SignFormInputValidation>({
      email: true,
      username: true,
      password: true,
    });

  const inputValidation = (
    email: string,
    username: string,
    password: string
  ) => {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const isValidUsername = /.*/;
    const isValidPassword = /.*/;
    if (
      email &&
      password &&
      username &&
      email.match(isValidEmail) &&
      username.match(isValidUsername) &&
      password.match(isValidPassword)
    ) {
      return true;
    }

    const nextState = {
      email: formInputsIsvalid.email,
      username: formInputsIsvalid.username,
      password: formInputsIsvalid.password,
    };

    if (!email || !email.match(isValidEmail)) {
      nextState.email = false;
    }

    if (!username || !username.match(isValidUsername)) {
      nextState.username = false;
    }

    if (!password || !password.match(isValidPassword)) {
      nextState.password = false;
    }

    setFormInputsIsvalid(nextState);

    return false;
  };

  const submitHandler = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const userInfo: UserSignupInformation = {
      username,
      email,
      password,
    };

    if (!inputValidation(email, username, password)) return;
    await authContext.signup(userInfo);
  };

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!formInputsIsvalid.email) {
      formInputsIsvalid.email = event.target.value ? true : false;
    }
    setEmail(event.target.value);
  };

  const usernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!formInputsIsvalid.username) {
      formInputsIsvalid.username = event.target.value ? true : false;
    }
    setUsername(event.target.value);
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
      {/* <form onSubmit={submitHandler}> */}

      <div className={classes.control}>
        <label htmlFor="email">E-Mail</label>
        <input
          className={formInputsIsvalid.email ? `` : `${classes.invalid}`}
          id="email"
          type="email"
          value={email}
          onChange={emailChangeHandler}
          autoFocus
        />
      </div>

      <div className={classes.control}>
        <label htmlFor="username">Username</label>
        <input
          className={formInputsIsvalid.username ? `` : `${classes.invalid}`}
          id="username"
          type="text"
          value={username}
          onChange={usernameChangeHandler}
        />
      </div>

      <div className={classes.control}>
        <label htmlFor="password">Password</label>
        <input
          className={formInputsIsvalid.password ? `` : `${classes.invalid}`}
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={passwordChangeHandler}
        />
        <FontAwesomeIcon
          icon={faEye}
          data-testid="icon"
          className={classes["eye-icon"]}
          onClick={(e) => setShowPassword((prev) => !prev)}
        />
      </div>

      <div className={classes.actions}>
        <Button onClick={submitHandler} action={"submit"} type="submit">
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
