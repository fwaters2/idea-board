import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { AnimatePresence } from "framer-motion";
import { Cards } from ".";

describe("Cards component", () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  const children = [
    <li key={1}>Item 1</li>,
    <li key={2}>Item 2</li>,
    <li key={3}>Item 3</li>,
  ];
  const props = { children };

  beforeEach(() => {
    wrapper = shallow(<Cards {...props} />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a ul element with class 'cards'", () => {
    expect(wrapper.find("ul.cards").exists()).toBe(true);
  });

  it("should render AnimatePresence component", () => {
    expect(wrapper.find(AnimatePresence).exists()).toBe(true);
  });
});
