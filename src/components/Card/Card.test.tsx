import { render } from "@testing-library/react";
import React from "react";
import { Card } from ".";

jest.mock("dayjs", () => () => ({
  format: () => "2020-01-01",
  fromNow: () => "1 day ago",
  extend: () => {},
}));

test("renders without crashing", () => {
  const props = {
    idea: {
      id: "1",
      title: "Test Idea",
      description: "Test Description",
      created: new Date(),
      updated: new Date(),
    },
    handleDeleteCard: () => {},
    handleUpdateCard: () => {},
  };
  render(<Card {...props} />);
});
