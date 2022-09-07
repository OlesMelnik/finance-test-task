import { render, screen } from "@testing-library/react";
import { TickerItem } from "../TickerItem";

test("badge contain text", () => {
  render(<TickerItem selected={false} prefix="MSF" prefix_color="green" />);
  expect(screen.getByTestId("MSF")).toHaveTextContent("MSF");
});
