import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { NewCardBtn } from ".";

describe("NewCardBtn component", () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  const handleAddCard = jest.fn();
  const props = { handleAddCard };

  beforeEach(() => {
    wrapper = shallow(<NewCardBtn {...props} />);
  });

  afterEach(() => {
    handleAddCard.mockClear();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call handleAddCard function when button is clicked", () => {
    wrapper.simulate("click");
    expect(handleAddCard).toHaveBeenCalled();
  });
});
