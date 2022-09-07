import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";

test("badge contain text", () => {
  render(<Badge prefix="MSF" prefix_color="green" />);
  expect(screen.getByTestId("MSF")).toHaveTextContent("MSF");
});
