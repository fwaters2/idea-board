import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { SortBy, SortDirection } from "../../types";
import { NewCardBtn } from "../NewCardBtn";
import { Controls } from ".";

jest.mock("../NewCardBtn", () => ({
  NewCardBtn: () => <div>NewCardBtn</div>,
}));

describe("Controls component", () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  const handleAddCard = jest.fn();
  const onClickSort = jest.fn();
  const props = {
    handleAddCard,
    onClickSort,
    sortDirection: SortDirection.ASC,
    sortKey: SortBy.CREATED,
  };

  beforeEach(() => {
    wrapper = shallow(<Controls {...props} />);
  });

  afterEach(() => {
    handleAddCard.mockClear();
    onClickSort.mockClear();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render NewCardBtn component", () => {
    expect(wrapper.find(NewCardBtn).exists()).toBe(true);
  });

  it("should call onClickSort function with SortBy.CREATED when Created button is clicked", () => {
    wrapper.find(".control_btn").first().simulate("click");
    expect(onClickSort).toHaveBeenCalledWith(SortBy.CREATED);
  });

  it("should call onClickSort function with SortBy.TITLE when Title button is clicked", () => {
    wrapper.find(".control_btn").at(1).simulate("click");
    expect(onClickSort).toHaveBeenCalledWith(SortBy.TITLE);
  });
});
