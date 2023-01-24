import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Card } from "./Card";
import { Status } from "../../types";

const props = {
  id: "1",
  status: "idle" as Status,
  title: "Test title",
  description: "Test description",
  charactersRemaining: 100,
  created: new Date(),
  handleDeleteCard: jest.fn(),
  onTitleChange: jest.fn(),
  onDescriptionChange: jest.fn(),
  onTitleBlur: jest.fn(),
  onDescriptionBlur: jest.fn(),
  onKeyDown: jest.fn(),
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

  test("updates title on input change and blur", async () => {
    render(<Card {...props} />);
    const user = userEvent.setup();
    expect(props.status).toBe("idle");
    const titleInput: HTMLInputElement = screen.getByLabelText("Title");
    await user.type(titleInput, "2");
    // expect(screen.getByLabelText("Title")).toHaveValue("Test title2");
    fireEvent.blur(titleInput);
    expect(props.onTitleBlur).toHaveBeenCalled();
    // expect(props.status).toBe("loading");
  });

  test("updates description on input change and blur", async () => {
    render(<Card {...props} />);
    const user = userEvent.setup();
    expect(props.status).toBe("idle");
    const descriptionInput = screen.getByLabelText("Description");
    await user.type(descriptionInput, "2");
    // expect(descriptionInput).toHaveValue("Test description2");
    fireEvent.blur(descriptionInput);
    expect(props.onDescriptionBlur).toHaveBeenCalled();
    // expect(props.status).toBe("loading");
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
