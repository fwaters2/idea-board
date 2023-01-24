import React from "react";
import { SortKey, SortDirection } from "../../types";
import { Controls } from ".";
import { render } from "@testing-library/react";

describe("Controls component", () => {
  const handleAddCard = jest.fn();
  const onClickSort = jest.fn();
  const props = {
    handleAddCard,
    onClickSort,
    sortDirection: "asc" as SortDirection,
    sortKey: "created" as SortKey,
  };

  test("should render without crashing", () => {
    render(<Controls {...props} />);
  });
});
