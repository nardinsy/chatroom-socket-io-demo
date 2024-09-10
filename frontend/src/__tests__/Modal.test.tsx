import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReactDOM from "react-dom";
import { ReactNode, ReactPortal } from "react";
import Modal from "../shared-UI/Modal";

const oldCreatePortal = ReactDOM.createPortal;
beforeAll(() => {
  ReactDOM.createPortal = (node: ReactNode): ReactPortal => node as ReactPortal;
});

afterAll(() => {
  ReactDOM.createPortal = oldCreatePortal;
});

test("modal shows the children and a close button", () => {
  const value = {
    onBackdropClick: jest.fn(),
  };

  render(
    <div>
      <Modal onBackdropClick={value.onBackdropClick}>
        <div>test</div>
      </Modal>
    </div>
  );

  expect(screen.getByText("test")).toBeTruthy();

  fireEvent.click(screen.getByTestId("backdrop"));

  expect(value.onBackdropClick).toHaveBeenCalledTimes(1);
});
