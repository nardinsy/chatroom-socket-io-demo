import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserItem from "../user/components/UserItem";
import { UserDto } from "../helpers/dtos";
import { BrowserRouter, Router } from "react-router-dom";

const user = new UserDto("user", "user", undefined, 1);

const renderUserItem = () => {
  render(
    <BrowserRouter>
      <UserItem userDto={user} key={user.userId} />
    </BrowserRouter>
  );
};

test("user item shows user card", () => {
  renderUserItem();
  expect(screen.getByTestId(user.userId)).toBeInTheDocument();
});
