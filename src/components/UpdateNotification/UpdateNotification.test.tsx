import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { UpdateNotification } from ".";
import { Status } from "../../types";

describe("UpdateNotification component", () => {
  const status: Status = "success";
  const props = { status };

  test("renders without crashing", () => {
    render(<UpdateNotification {...props} />);
  });
});
