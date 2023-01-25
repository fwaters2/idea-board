import React from "react";
import { NewCardBtn } from ".";
import { render } from "@testing-library/react";

describe("NewCardBtn component", () => {
  const props = {
    handleAddCard: jest.fn(),
  };

  test("should call handleAddCard function when button is clicked", () => {
    const { getByRole } = render(<NewCardBtn {...props} />);
    getByRole("button").click();
    expect(props.handleAddCard).toHaveBeenCalled();
  });
});
