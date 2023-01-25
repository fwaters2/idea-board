import React from "react";
import { App } from "./App";
import { fireEvent, render, screen } from "@testing-library/react";

test("renders without crashing", () => {
  render(<App />);
});

test("if there are no ideas, renders empty placeholder", () => {
  const { getByText } = render(<App />);
  expect(getByText("Start by adding a card")).toBeInTheDocument();
});

test("if card creation works", () => {
  render(<App />);
  const createButton = screen.getAllByRole("button", {
    name: "+",
  })[0];
  fireEvent.click(createButton);
  expect(screen.getAllByRole("listitem").length).toEqual(1);
});

test("if there are ideas in local storage, renders ideas", () => {
  const ideas = [
    {
      id: "1",
      title: "Test title",
      description: "Test description",
      created: new Date(),
    },
  ];
  localStorage.setItem("ideas", JSON.stringify(ideas));
  render(<App />);
  const descriptionInput = screen.getByLabelText("Title");
  expect(descriptionInput).toHaveValue("Test title");
});

test("if card deletion works", () => {
  const ideas = [
    {
      id: "1",
      title: "Test title",
      description: "Test description",
      created: new Date(),
    },
  ];
  localStorage.setItem("ideas", JSON.stringify(ideas));
  render(<App />);
  const deleteButton = screen.getByRole("button", {
    name: "X",
  });
  fireEvent.click(deleteButton);
  expect(screen.getByText("Start by adding a card")).toBeInTheDocument();
});
