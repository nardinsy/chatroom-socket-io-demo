import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MenuButtonIcon from "../Header/MenuButton/MenuButtonIcon";
import AuthContext from "../contexts/auth-context";
import {
  authProviderValueLoggedinProps,
  authProviderValueLoggedoutProps,
} from "../testHelpers/test-helper";

const renderMenuButtonIconWithUserLoggedin = (userpicture: any) => {
  const authProviderValue = authProviderValueLoggedinProps;
  authProviderValue.userPictureUrl = userpicture;
  render(
    <AuthContext.Provider value={authProviderValue}>
      <MenuButtonIcon />
    </AuthContext.Provider>
  );
};

const renderMenuButtonUserLoggedout = () => {
  const authProviderValue = authProviderValueLoggedoutProps;

  render(
    <AuthContext.Provider value={authProviderValue}>
      <MenuButtonIcon />
    </AuthContext.Provider>
  );
};

test("show user avatar when not loggedin", () => {
  renderMenuButtonUserLoggedout();
  expect(screen.getByTestId("icon")).toBeInTheDocument();
});

test("show user avatar when logged in with out profile picture", () => {
  renderMenuButtonIconWithUserLoggedin(undefined);
  expect(screen.getByTestId("no-image")).toBeInTheDocument();
});

test("show user picture when logged in with profile picture", () => {
  renderMenuButtonIconWithUserLoggedin("picture");
  expect(screen.getByAltText("nardin")).toBeInTheDocument();
});
