import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "../Authentication/Login/LoginForm";
import AuthContext from "../contexts/auth-context";
import { authProviderValueLoggedoutProps } from "../testHelpers/test-helper";

const renderLoginForm = () => {
  const authProviderValue = authProviderValueLoggedoutProps;
  render(
    <AuthContext.Provider value={authProviderValue}>
      <LoginForm />
    </AuthContext.Provider>
  );

  return authProviderValue;
};

describe("login form", () => {
  it("accessible when user is logged out", () => {
    renderLoginForm();
    const loginBtn = screen.getByText("Login");
    expect(loginBtn).toBeInTheDocument();
  });

  it("password hide/show button works", () => {
    renderLoginForm();

    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    passwordInput.value = "1234567";

    const eyeIcon = screen.getByTestId("icon");
    // Act
    fireEvent.click(eyeIcon);
    // Assert
    expect(passwordInput).toHaveAttribute("type", "text");
  });

  describe("with invalid inputs", () => {
    test("change inputs style to red", () => {
      const { login } = renderLoginForm();

      const emailInput = screen.getByLabelText("E-Mail") as HTMLInputElement;
      const passwordInput = screen.getByLabelText(
        "Password"
      ) as HTMLInputElement;

      fireEvent.change(emailInput, { target: { value: "" } });
      fireEvent.change(passwordInput, {
        target: { value: "" },
      });

      const submitButton = screen.getByRole("button", {
        name: /login/i,
      });

      fireEvent.click(submitButton);

      expect(emailInput).toHaveClass("invalid");
      expect(passwordInput).toHaveClass("invalid");
    });

    test("do not login", () => {
      // Arrange
      const { login } = renderLoginForm();

      const emailInput = screen.getByLabelText("E-Mail") as HTMLInputElement;
      const passwordInput = screen.getByLabelText(
        "Password"
      ) as HTMLInputElement;

      fireEvent.change(emailInput, { target: { value: "" } });
      fireEvent.change(passwordInput, {
        target: { value: "" },
      });

      const submitButton = screen.getByRole("button");
      // Act
      fireEvent.click(submitButton);
      // Assert
      expect(login).not.toHaveBeenCalled();
    });
  });

  describe("with valid inputs", () => {
    test("calls login on submit", () => {
      const { login } = renderLoginForm();

      // Arrange
      const emailInput = screen.getByLabelText("E-Mail") as HTMLInputElement;
      const passwordInput = screen.getByLabelText(
        "Password"
      ) as HTMLInputElement;
      // emailInput.value = "nardin@gmail.com";
      // passwordInput.value = "1234567";
      fireEvent.change(emailInput, { target: { value: "nardin@gmail.com" } });
      fireEvent.change(passwordInput, {
        target: { value: "1234567" },
      });

      const submitButton = screen.getByRole("button");
      // Act
      fireEvent.click(submitButton);
      // Assert
      expect(login).toHaveBeenCalledTimes(1);
      expect(login).toHaveBeenCalledWith({
        email: "nardin@gmail.com",
        password: "1234567",
      });
    });
  });
});
