import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileEditForm from "../Profile/components/ProfileEditForm";
import { ProfileSettingsPageT } from "../Profile/pages/ProfileSettingsPage";
import AuthContext from "../contexts/auth-context";
import { authProviderValueLoggedinProps } from "../testHelpers/test-helper";

const renderProfileEditForm = () => {
  const value: ProfileSettingsPageT = {
    changeProfilePicture: jest.fn((userNewImage: File | undefined) =>
      Promise.resolve()
    ),
    changePassword: jest.fn((newPassword: string) => Promise.resolve()),
    changeUsername: jest.fn((newUsername: string) => Promise.resolve()),
  };

  render(
    <AuthContext.Provider value={authProviderValueLoggedinProps}>
      <ProfileEditForm {...value} />
    </AuthContext.Provider>
  );
  return value;
};

test("profile edit form, submit button is disable when there are no change", () => {
  renderProfileEditForm();

  const submitButton = screen.getByText("Update Info");
  expect(submitButton).toBeDisabled();
  //   expect(screen.getByText("Update Info")).toBeInTheDocument();
});

jest.mock("../Profile/components/EditUserInfoForm", () => {
  return {
    __esModule: true,
    // the "default export"
    default: ({
      changeUsername,
    }: {
      changeUsername: (username: string) => void;
    }) => (
      <input
        data-testid="username-input"
        type="text"
        value={"username"}
        onChange={(e) => changeUsername(e.target.value)}
      />
    ),
  };
});

test("profile edit form, submit button is active when username has changed", () => {
  renderProfileEditForm();

  const usernameInput = screen.getByTestId("username-input");
  fireEvent.change(usernameInput, { target: { value: "newUsername" } });

  const submitButton = screen.getByText("Update Info");
  expect(submitButton).not.toBeDisabled();
});

jest.mock("../Profile/components/ProfileEditFormUserPicture.tsx", () => {
  return {
    __esModule: true,
    // the "default export"
    default: ({
      userPictureUrl,
      username,
      token,
      onChangeImage,
      changeProfilePicture,
    }: {
      userPictureUrl: string | undefined;
      username: string;
      token: string;
      onChangeImage: (fileFormatFile: File) => void;
      changeProfilePicture: (userNewImage: File | undefined) => Promise<void>;
    }) => (
      <input
        data-testid="profile-picture"
        type="text"
        value={"image"}
        onChange={(e) => onChangeImage(new File([""], "filename.txt"))}
      />
    ),
  };
});

test("profile edit form, submit button is active when profile picture has changed", () => {
  renderProfileEditForm();

  const profilePicture = screen.getByTestId("profile-picture");
  fireEvent.change(profilePicture, { target: { value: "new picture" } });

  const submitButton = screen.getByText("Update Info");
  expect(submitButton).not.toBeDisabled();
});
