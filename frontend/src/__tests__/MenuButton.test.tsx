import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MenuButton from "../Header/MenuButton/MenuButton";
import AuthContext from "../contexts/auth-context";
import {
  authProviderValueLoggedinProps,
  authProviderValueLoggedoutProps,
} from "../testHelpers/test-helper";

const renderMenuButtonUserLoggedout = () => {
  const authProviderValue = authProviderValueLoggedoutProps;

  render(
    <AuthContext.Provider value={authProviderValue}>
      <MenuButton />
    </AuthContext.Provider>
  );
};

const renderMenuButtonWithUserLoggedin = () => {
  const authProviderValue = authProviderValueLoggedinProps;

  const { baseElement } = render(
    <AuthContext.Provider value={authProviderValue}>
      <MenuButton />
    </AuthContext.Provider>
  );

  return { baseElement };
};

describe("menu button when logged in", () => {
  test("on click show ProfileMenuDropdown", () => {
    renderMenuButtonWithUserLoggedin();
    const menuBtn = screen.getByTestId("menu-button");
    fireEvent.click(menuBtn);

    expect(screen.getByText("Profile Settings")).toBeInTheDocument();
  });

  test("close ProfileMenuDropdown", () => {
    renderMenuButtonWithUserLoggedin();
    const menuBtn = screen.getByTestId("menu-button");
    fireEvent.click(menuBtn);
    fireEvent.click(menuBtn);

    expect(screen.queryByText("Profile Settings")).not.toBeInTheDocument();
  });
});

test("close dropdown when click outside", () => {
  renderMenuButtonUserLoggedout();

  const menuBtn = screen.getByTestId("menu-button");
  fireEvent.click(menuBtn);

  const outside = screen.getByRole("list");
  fireEvent.click(outside);

  expect(screen.queryByTestId("drop")).not.toBeInTheDocument();
});

describe("menu button when logged out", () => {
  test("on click show AuthDropdown", () => {
    renderMenuButtonUserLoggedout();
    const menuBtn = screen.getByTestId("menu-button");
    fireEvent.click(menuBtn);

    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  test("close ProfileMenuDropdown", () => {
    renderMenuButtonWithUserLoggedin();
    const menuBtn = screen.getByTestId("menu-button");
    fireEvent.click(menuBtn);
    fireEvent.click(menuBtn);

    expect(screen.queryByText("Sign up")).not.toBeInTheDocument();
  });
});
