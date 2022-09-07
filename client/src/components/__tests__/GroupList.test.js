import { render } from "@testing-library/react";
import { GroupList } from "../GroupList";

test("matches snapshot", () => {
  const { baseElement } = render(<GroupList groups={[]} tickers={[]} />);
  expect(baseElement).toMatchSnapshot();
});
