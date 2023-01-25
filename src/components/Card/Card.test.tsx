import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Card } from ".";

const props = {
  idea: {
    id: "1",
    title: "Test title",
    description: "Test description",
    created: new Date(),
  },
  handleDeleteCard: jest.fn(),
  handleUpdateCard: jest.fn(),
};

jest.mock("dayjs", () => () => ({
  format: () => "2020-01-01",
  fromNow: () => "1 day ago",
  extend: () => {},
}));

describe("Card component", () => {
  test("renders input fields and shows correct values", () => {
    render(<Card {...props} />);
    const titleInput: HTMLInputElement = screen.getByLabelText("Title");
    expect(titleInput).toHaveValue("Test title");
    expect(screen.getByLabelText("Description")).toHaveValue(
      "Test description"
    );
  });

  test("updates title on input change", async () => {
    render(<Card {...props} />);
    const user = userEvent.setup();
    const titleInput: HTMLInputElement = screen.getByLabelText("Title");
    await user.type(titleInput, "2");
    expect(screen.getByLabelText("Title")).toHaveValue("Test title2");
    fireEvent.blur(titleInput);
  });

  test("updates description on input change", async () => {
    render(<Card {...props} />);
    const user = userEvent.setup();
    const descriptionInput = screen.getByLabelText("Description");
    await user.type(descriptionInput, "2");
    expect(descriptionInput).toHaveValue("Test description2");
  });

  test("calls handleDeleteCard when delete button is clicked", () => {
    render(<Card {...props} />);
    const deleteButton = screen.getByRole("button", {
      name: "X",
    });
    fireEvent.click(deleteButton);
    expect(props.handleDeleteCard).toHaveBeenCalled();
  });
});
