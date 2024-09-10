import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import UsersList from "../user/components/UsersList";
import { UserDto } from "../helpers/dtos";
import { BrowserRouter, Router } from "react-router-dom";

const users = [new UserDto("user1", "user1", undefined, 1)];

const renderUserList = (users: UserDto[], loading: boolean) => {
  render(
    <BrowserRouter>
      <UsersList users={users} loading={loading} />
    </BrowserRouter>
  );
};

describe("user list", () => {
  test("shows spinner when loading", () => {
    renderUserList([], true);
    expect(screen.getByTestId("users-spinner")).toBeInTheDocument();
  });

  test("shows text message when no user found", () => {
    renderUserList([], false);
    expect(screen.getByText(/No user found./)).toBeInTheDocument();
  });

  test("shows users item when loaded users list", () => {
    renderUserList(users, false);
    expect(screen.getByTestId("users-list")).toBeInTheDocument();
  });
});
