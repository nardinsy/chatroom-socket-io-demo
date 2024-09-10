import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileEditFormUserPicture, {
  ProfileEditFormUserPictureT,
} from "../Profile/components/ProfileEditFormUserPicture";

jest.mock("../shared/PictureModal.tsx", () => {
  return {
    __esModule: true,
    default: ({
      pictureUrl,
      showChevrons,
      ellipsisDropdownItems,
      xMarkHandler,
      children,
    }: {
      pictureUrl: string | undefined;
      showChevrons: any;
      ellipsisDropdownItems: any;
      xMarkHandler: any;
      children?: any;
    }) => <div data-testid="picture-modal">Picture modal</div>,
  };
});

const renderProfileEditFormUserPicture = () => {
  const value: ProfileEditFormUserPictureT = {
    userPictureUrl: undefined,
    username: "nardin",
    token: "1234",
    onChangeImage: jest.fn(),
    changeProfilePicture: jest.fn(),
  };

  render(
    <ProfileEditFormUserPicture
      userPictureUrl={value.userPictureUrl}
      username={value.username}
      token={value.token}
      onChangeImage={value.onChangeImage}
      changeProfilePicture={value.changeProfilePicture}
    />
  );

  return value;
};

test("click on profile picture in edit form, shows picture modal", () => {
  renderProfileEditFormUserPicture();

  const ppContainer = screen.getByTestId("picture-container");
  fireEvent.click(ppContainer);

  expect(screen.getByTestId("picture-modal")).toBeInTheDocument();
});
