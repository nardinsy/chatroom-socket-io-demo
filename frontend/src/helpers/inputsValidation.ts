const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const isValidUsername = /^[a-zA-Z0-9]+$/;
const isValidPassword = /.*/;
// const isValidPassword =
// /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

export enum PasswordValidationResult {
  valid,
  notEqual,
  emptyPassword,
  emptyConfirmPassword,
  invalidPassword,
  unknown,
}

export const validateNewPassword = (
  password: string,
  confirmPassword: string
): {
  result: PasswordValidationResult;
  invalidInput?: "password" | "confirm" | "both";
} => {
  if (isValidPassword.test(password) && password === confirmPassword) {
    return { result: PasswordValidationResult.valid };
  }

  if (password === "") {
    return {
      result: PasswordValidationResult.emptyPassword,
      invalidInput: "password",
    };
  }

  if (confirmPassword === "") {
    return {
      result: PasswordValidationResult.emptyConfirmPassword,
      invalidInput: "confirm",
    };
  }

  if (password !== confirmPassword) {
    return {
      result: PasswordValidationResult.notEqual,
      invalidInput: "both",
    };
  }

  if (!isValidPassword.test(password) && password === confirmPassword) {
    return {
      result: PasswordValidationResult.invalidPassword,
      invalidInput: "both",
    };
  }

  return { result: PasswordValidationResult.unknown };
};

export const getValidationMessage = (
  result: PasswordValidationResult
): string => {
  switch (result) {
    case PasswordValidationResult.valid:
      return "Valid password";
    case PasswordValidationResult.notEqual:
      return "Those passwords didn’t match. Try again.";
    case PasswordValidationResult.emptyPassword:
      return "Enter a password";
    case PasswordValidationResult.emptyConfirmPassword:
      return "Confirm your password";
    case PasswordValidationResult.invalidPassword:
      return "Please choose a stronger password. Try a mix of letters, numbers, and symbols.";
    case PasswordValidationResult.unknown:
      return "Invalid";
  }
};

export const validateNewUsername = (newUsername: string, username: string) => {
  if (newUsername === username || username === "") {
    return false;
  }

  if (isValidUsername.test(newUsername)) {
    return true;
  }

  return false;
};
