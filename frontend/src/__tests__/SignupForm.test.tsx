import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignupForm from "../Authentication/Signup/SignupForm";
import AuthContext from "../contexts/auth-context";
import { authProviderValueLoggedoutProps } from "../testHelpers/test-helper";

const renderSignupForm = () => {
  const authProviderValue = authProviderValueLoggedoutProps;

  render(
    <AuthContext.Provider value={authProviderValue}>
      <SignupForm />
    </AuthContext.Provider>
  );
  return authProviderValue;
};

describe("Signup form", () => {
  test("accessible when user is logged out", () => {
    renderSignupForm();
    const signupBtn = screen.getByText("Sign up");
    expect(signupBtn).toBeInTheDocument();
  });

  test("password hide/show button works", () => {
    renderSignupForm();

    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    passwordInput.value = "1234567";

    const eyeIcon = screen.getByTestId("icon");

    fireEvent.click(eyeIcon);
    expect(passwordInput).toHaveAttribute("type", "text");
  });
});

describe("with invalid inputs", () => {
  test("changes inputs style to red", () => {
    renderSignupForm();

    const emailInput = screen.getByLabelText("E-Mail") as HTMLInputElement;
    const usernameInput = screen.getByLabelText("Username") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(usernameInput, { target: { value: "" } });
    fireEvent.change(passwordInput, {
      target: { value: "" },
    });

    const submitButton = screen.getByRole("button", {
      name: /sign up/i,
    });

    fireEvent.click(submitButton);

    expect(emailInput).toHaveClass("invalid");
    expect(usernameInput).toHaveClass("invalid");
    expect(passwordInput).toHaveClass("invalid");
  });

  test("does not login", () => {
    const { signup } = renderSignupForm();

    const emailInput = screen.getByLabelText("E-Mail") as HTMLInputElement;
    const usernameInput = screen.getByLabelText("Username") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(usernameInput, { target: { value: "" } });
    fireEvent.change(passwordInput, {
      target: { value: "" },
    });

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    expect(signup).not.toHaveBeenCalled();
  });
});

describe("with valid inputs", () => {
  test("calls signup on submit", async () => {
    const { signup } = renderSignupForm();

    const emailInput = screen.getByLabelText("E-Mail") as HTMLInputElement;
    const usernameInput = screen.getByLabelText("Username") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "nardin@gmail.com" } });
    fireEvent.change(usernameInput, { target: { value: "nardin" } });
    fireEvent.change(passwordInput, {
      target: { value: "1234567" },
    });

    const submitButton = screen.getByRole("button", {
      name: /sign up/i,
    });

    fireEvent.click(submitButton);
    // expect(signup).toHaveBeenCalledTimes(1);

    await waitFor(() => expect(signup).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(signup).toHaveBeenCalledWith({
        username: "nardin",
        email: "nardin@gmail.com",
        password: "1234567",
      })
    );
  });
});
