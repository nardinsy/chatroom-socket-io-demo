import { useState, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import Modal from "../shared-UI/Modal";
import LoginForm from "./Login/LoginForm";
import SignupForm from "./Signup/SignupForm";
import classes from "./AuthForms.module.css";

type Title = "Login" | "Signup";
const AuthForms = ({ title }: { title: Title }) => {
  const history = useHistory();

  const [authFormsTitle, setAuthFormsTitle] = useState(title);

  const switchAuthState = (event: MouseEvent<HTMLDivElement>) => {
    const input = event.target as HTMLDivElement;
    const formTitle = input.innerText as Title;
    setAuthFormsTitle(formTitle);
  };

  const authenticationModalCloseHandler = (event: MouseEvent) => {
    event.stopPropagation();
    history.replace("/");
  };

  const loginClassName =
    authFormsTitle === "Login"
      ? `${classes.option} ${classes.active}`
      : `${classes.option}`;

  const signupClassName =
    authFormsTitle === "Signup"
      ? `${classes.option} ${classes.active}`
      : `${classes.option}`;

  return (
    <Modal onBackdropClick={authenticationModalCloseHandler}>
      <header className={classes["forms-modal-header"]}>
        <div className={loginClassName} onClick={switchAuthState}>
          Login
        </div>
        <div className={signupClassName} onClick={switchAuthState}>
          Signup
        </div>
      </header>

      {authFormsTitle === "Login" ? <LoginForm /> : <SignupForm />}
    </Modal>
  );
};

export default AuthForms;
