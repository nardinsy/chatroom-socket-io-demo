import { MouseEvent, FC, useState } from "react";
import Modal from "../../shared-UI/Modal";
import Button from "../../shared-UI/Button";
import {
  PasswordValidationResult,
  getValidationMessage,
  validateNewPassword,
} from "../../helpers/inputsValidation";

interface PasswordChangeModalT {
  closeChangePasswordModal: () => void;
  onPasswordChange: (newPassword: string) => void;
}

const PasswordChangeModal: FC<PasswordChangeModalT> = ({
  closeChangePasswordModal,
  onPasswordChange,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [invalidPassword, setInvalidPassword] = useState({
    password: false,
    confirmPassword: false,
    message: "",
  });

  const submitChangePassword = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { result, invalidInput } = validateNewPassword(
      password,
      confirmPassword
    );

    if (result !== PasswordValidationResult.valid) {
      handleInvalidPassword(result, invalidInput!);
      return;
    }

    await onPasswordChange(password);
    closeChangePasswordModal();
  };

  const handleInvalidPassword = (
    result: PasswordValidationResult,
    invalidInput: "password" | "confirm" | "both"
  ) => {
    const message = getValidationMessage(result);

    setInvalidPassword({
      password: invalidInput === "both" || invalidInput === "password",
      confirmPassword: invalidInput === "both" || invalidInput === "confirm",
      message,
    });
  };

  return (
    <Modal onBackdropClick={closeChangePasswordModal}>
      <div className="flex flex-col p-4 w-full mb-4">
        <div className="flex flex-row items-center p-3">
          <label
            htmlFor="password"
            className="w-28 text-black-light font-bold pt-1 pr-2"
          >
            Password
          </label>
          <input
            className={`w-full text-base border rounded-4xl pl-2 py-2 outline-none border-gray focus:outline-none focus:border-primary ${
              invalidPassword.password ? `border-red-heart` : ""
            }`}
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </div>

        <div className="flex flex-row items-center p-3">
          <label
            htmlFor="confirm"
            className="w-28 text-black-light font-bold pt-1 "
          >
            Confirm Password
          </label>
          <input
            className={`w-full text-base border rounded-4xl pl-2 py-2 outline-none border-gray focus:outline-none focus:border-primary ${
              invalidPassword.password ? `border-red-heart` : ""
            }`}
            id="confirm"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div
          data-testid="error-message"
          className="text-center items-center text-red-heart"
        >
          {invalidPassword.message ? <span>⚠️ </span> : ""}
          {invalidPassword.message}
        </div>

        <div className="py-4 font-bold text-black-light">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((pre) => !pre)}
          />
          <span> </span>Show password
        </div>
      </div>

      <div className="flex justify-around">
        <Button
          type="submit"
          onClick={submitChangePassword}
          action={"submit"}
          className="w-32"
        >
          Chnage
        </Button>
      </div>
    </Modal>
  );
};

export default PasswordChangeModal;
