import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GroupDialogs } from "../GroupDialogs";

afterEach(cleanup);

test("the save button should be disabled", () => {
  render(<GroupDialogs showFirstDialog={true} closeFirstDialog={() => {}} />);
  expect(screen.getByTestId("save-btn1")).toBeDisabled();
});

test("the button should be enabled after user added text", () => {
  render(<GroupDialogs showFirstDialog={true} closeFirstDialog={() => {}} />);
  const saveBtn = screen.getByTestId("save-btn1");
  const textField = screen.getByRole("textbox", {
    name: /назва списку/i,
  });
  userEvent.type(textField, "new group");
  expect(saveBtn).toBeEnabled();
});
