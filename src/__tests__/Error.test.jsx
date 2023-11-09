import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useRouteError } from "react-router-dom";

import Error from "../components/Routes/Error";

vi.mock("react-router-dom", () => ({
  useRouteError: vi.fn(),
}));

describe("Error component", () => {
  it("displays the error information", () => {
    useRouteError.mockReturnValue({
      status: "404",
      statusText: "Not Found",
    });

    render(<Error />);

    expect(screen.getByText("Oops")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("404 : Not Found")).toBeInTheDocument();
  });
});
