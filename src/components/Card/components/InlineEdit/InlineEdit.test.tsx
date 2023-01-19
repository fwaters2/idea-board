import React from "react";
import { shallow } from "enzyme";
import { InlineEdit } from ".";

describe("InlineEdit", () => {
  let wrapper: any;
  let mockSetValue = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<InlineEdit value="test" setValue={mockSetValue} />);
  });

  it("renders an input element", () => {
    expect(wrapper.find("input").length).toBe(1);
  });

  it("updates the value when the input is changed", () => {
    wrapper
      .find("input")
      .simulate("change", { target: { value: "changed value" } });
    expect(wrapper.find("input").prop("value")).toBe("changed value");
  });

  it("calls setValue when the input is blurred and the value has changed", () => {
    wrapper
      .find("input")
      .simulate("blur", { target: { value: "changed value" } });
    expect(mockSetValue).toHaveBeenCalledWith("changed value");
  });
});
