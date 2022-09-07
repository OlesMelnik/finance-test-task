import { render, screen } from "@testing-library/react";
import { GroupBadge } from "../GroupBadge";

test("ckeck if group badge contain text", () => {
  const tickers = [];
  render(
    <GroupBadge
      group={{ name: "group1", tickers: tickers }}
      onSelect={() => {}}
      selectedGroup={"group1"}
    />
  );

  expect(screen.getByTestId("group1")).toHaveTextContent("group1");
  expect(screen.getByTestId("group1")).toHaveTextContent(tickers.length);
});
