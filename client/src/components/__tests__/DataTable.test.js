import { render } from "@testing-library/react";
import { DataTable } from "../DataTable";

test("matches snapshot", () => {
  const { baseElement } = render(<DataTable data={[]} selectedGroup="" />);
  expect(baseElement).toMatchSnapshot();
});
