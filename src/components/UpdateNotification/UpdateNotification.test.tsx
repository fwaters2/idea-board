import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { UpdateNotification } from ".";
import { Status } from "../../types";

describe("UpdateNotification component", () => {
  let wrapper: ShallowWrapper<
    React.ReactNode,
    Readonly<{}>,
    React.Component<{}, {}, React.ReactNode>
  >;
  const status: Status = "success";
  const props = { status };

  beforeEach(() => {
    wrapper = shallow(<UpdateNotification {...props} />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the GreenCircleWithCheckSvg component if status is SUCCESS", () => {
    expect(wrapper.find("GreenCircleWithCheckSvg").exists()).toBe(true);
  });

  it("should render the Loader component if status is not SUCCESS", () => {
    wrapper.setProps({ status: "loading" });
    expect(wrapper.find("Loader").exists()).toBe(true);
  });
});
