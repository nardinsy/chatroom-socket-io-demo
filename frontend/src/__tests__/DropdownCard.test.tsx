import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dropdown from "../shared/DropdownCard";

const items = [
  {
    title: "Sign up",
    handler: jest.fn(),
  },
  {
    title: "Login",
    handler: jest.fn(),
  },
];

test("dropdown should show list of items", () => {
  render(<Dropdown items={items} />);

  items.forEach((item) => {
    const row = screen.getByText(item.title);
    expect(row).toBeInTheDocument();
  });
});
