import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditPasswordButton from "../Profile/components/EditPasswordButton";

jest.mock("../Profile/components/PasswordChangeModal.tsx", () => {
  return {
    __esModule: true,
    default: ({
      closeChangePasswordModal,
      onPasswordChange,
    }: {
      closeChangePasswordModal: () => void;
      onPasswordChange: (newPassword: string) => void;
    }) => <div data-testid="password-change-modal">Password Change Modal</div>,
  };
});

test("click on change password button, shows change password modal", () => {
  render(<EditPasswordButton changePassword={jest.fn()} />);

  const changePasswordButton = screen.getByText("Change Password");
  fireEvent.click(changePasswordButton);

  expect(screen.getByTestId("password-change-modal")).toBeInTheDocument();
});
