import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Avatar from "../shared-UI/Avatar";

const renderAvatar = (pictureUrl: string | undefined) => {
  const value = {
    cssClassName: "",
    pictureUrl,
    alt: "",
    width: "20px",
  };

  render(
    <Avatar pictureUrl={value.pictureUrl} width={value.width} alt={undefined} />
  );
};

test("avatar shows default image when url is undefined", () => {
  renderAvatar(undefined);

  expect(screen.getByTestId("no-image")).toBeInTheDocument();
});

test("avatar shows picturewhen url is valid", () => {
  renderAvatar("65f7034cec6d2699d66e5bbd");

  expect(screen.getByTestId("image")).toBeInTheDocument();
});
