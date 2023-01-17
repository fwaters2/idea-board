import React from "react";
import { shallow } from "enzyme";
import { Card } from ".";

jest.mock("dayjs", () => () => ({
  format: () => "2020-01-01",
  fromNow: () => "1 day ago",
  extend: () => {},
}));

it("renders without crashing", () => {
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
  shallow(<Card {...props} />);
});
