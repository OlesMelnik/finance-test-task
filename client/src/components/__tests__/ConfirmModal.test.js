import { render } from "@testing-library/react";
import { ConfirmModal } from "../ConfirmModal";

test("matches snapshot", () => {
  const { baseElement } = render(
    <ConfirmModal message="confirm" open={true} />
  );
  expect(baseElement).toMatchSnapshot();
});
