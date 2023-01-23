import React from "react";
import { SortKey, SortDirection } from "../../types";
import { Controls } from ".";
import { render } from "@testing-library/react";

jest.mock("../NewCardBtn", () => ({
  NewCardBtn: () => <div>NewCardBtn</div>,
}));

describe("Controls component", () => {
  const handleAddCard = jest.fn();
  const onClickSort = jest.fn();
  const props = {
    handleAddCard,
    onClickSort,
    sortDirection: "asc" as SortDirection,
    sortKey: "created" as SortKey,
  };

  afterEach(() => {
    handleAddCard.mockClear();
    onClickSort.mockClear();
  });

  test("should render correctly", () => {
    const { container } = render(<Controls {...props} />);
    expect(container).toMatchSnapshot();
  });
});
