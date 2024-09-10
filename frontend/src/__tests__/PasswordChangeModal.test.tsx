import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PasswordChangeModal from "../Profile/components/PasswordChangeModal";
import ReactDOM from "react-dom";
import { ReactNode, ReactPortal } from "react";

const validationResult = {
  result: false,
  invalidInput: "both",
};

jest.mock("../helpers/inputsValidation.ts", () => ({
  validateNewPassword: () => validationResult,
  PasswordValidationResult: { valid: true },
  getValidationMessage: () => "error",
}));

const renderComponent = () => {
  const props = {
    closeChangePasswordModal: jest.fn(),
    onPasswordChange: jest.fn((userInfo) => Promise.resolve()),
  };

  render(
    <PasswordChangeModal
      closeChangePasswordModal={props.closeChangePasswordModal}
      onPasswordChange={props.onPasswordChange}
    />
  );

  return props;
};

const submitPassword = (password: string, validPass: boolean) => {
  const { onPasswordChange, closeChangePasswordModal } = renderComponent();

  const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
  fireEvent.change(passwordInput, { target: { value: password } });

  const passwordConfirmInput = screen.getByLabelText(
    "Confirm Password"
  ) as HTMLInputElement;
  fireEvent.change(passwordConfirmInput, { target: { value: password } });

  validationResult.result = validPass;
  const submitButton = screen.getByRole("button", {
    name: /Chnage/i,
  });
  fireEvent.click(submitButton);
  return { onPasswordChange, closeChangePasswordModal };
};

describe("changs password", () => {
  const oldCreatePortal = ReactDOM.createPortal;
  beforeAll(() => {
    ReactDOM.createPortal = (node: ReactNode): ReactPortal =>
      node as ReactPortal;
  });

  afterAll(() => {
    ReactDOM.createPortal = oldCreatePortal;
  });

  test("submited with valid password", async () => {
    const password = "1234567";
    const { onPasswordChange, closeChangePasswordModal } = submitPassword(
      password,
      true
    );

    await waitFor(() => expect(onPasswordChange).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(onPasswordChange).toHaveBeenCalledWith(password)
    );
    expect(closeChangePasswordModal).toHaveBeenCalledTimes(1);
  });

  test("show error message with invalid password", () => {
    const password = "";
    const { onPasswordChange, closeChangePasswordModal } = submitPassword(
      password,
      false
    );

    expect(onPasswordChange).not.toHaveBeenCalled();
    expect(closeChangePasswordModal).not.toHaveBeenCalled();

    const errorMessage = screen.getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });
});
