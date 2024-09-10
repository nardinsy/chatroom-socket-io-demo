import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LogoutModal from "../Authentication/Logout/LogoutModal";
import AuthContext from "../contexts/auth-context";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { ReactNode, ReactPortal } from "react";
import { authProviderValueLoggedinProps } from "../testHelpers/test-helper";

const mockHistoryReplace = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    replace: mockHistoryReplace,
  }),
}));

const renderLogoutModal = () => {
  const authProviderValue = authProviderValueLoggedinProps;

  const { baseElement } = render(
    <BrowserRouter>
      <AuthContext.Provider value={authProviderValue}>
        <LogoutModal />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  return { baseElement, ...authProviderValue };
};

describe("Logout modal", () => {
  const oldCreatePortal = ReactDOM.createPortal;
  beforeAll(() => {
    ReactDOM.createPortal = (node: ReactNode): ReactPortal =>
      node as ReactPortal;
  });

  afterAll(() => {
    ReactDOM.createPortal = oldCreatePortal;
  });

  test("logs out correctly", async () => {
    const { logout, baseElement } = renderLogoutModal();

    const logoutButton = screen.getByRole("button", {
      name: /logout/i,
    });
    fireEvent.click(logoutButton);

    expect(baseElement).toMatchSnapshot();
    expect(logoutButton).toBeInTheDocument();

    // await expect(logout).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(logout).toHaveBeenCalledTimes(1));

    expect(mockHistoryReplace).toHaveBeenCalledTimes(1);
    expect(mockHistoryReplace).toHaveBeenCalledWith("/");
  });

  test("cancels correctly", () => {
    const { baseElement } = renderLogoutModal();

    const cancelButton = screen.getByRole("button", {
      name: /cancel/i,
    });
    fireEvent.click(cancelButton);

    expect(baseElement).toMatchSnapshot();
    expect(cancelButton).toBeInTheDocument();

    expect(mockHistoryReplace).toHaveBeenCalledTimes(1);
    expect(mockHistoryReplace).toHaveBeenCalledWith("/");
  });
});
