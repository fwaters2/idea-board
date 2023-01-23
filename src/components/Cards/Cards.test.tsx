import React from "react";
import { Cards } from ".";
import { render } from "@testing-library/react";

describe("Cards component", () => {
  const props = {
    children: [<div key={1}>1</div>, <div key={2}>2</div>],
    handleDeleteCard: () => {},
    handleUpdateCard: () => {},
  };
  test("should render correctly", () => {
    const { container } = render(<Cards {...props} />);
    expect(container).toMatchSnapshot();
  });
});
