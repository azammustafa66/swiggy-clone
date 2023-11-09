import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import About from "../components/Routes/About";

describe("About Us", () => {
  it("renders the about us page with a navigation bar, content, and footer", () => {
    render(<About />);

    expect(screen.getByRole("navigation")).toHaveTextContent(
      "Our Food Delivery App"
    );

    expect(
      screen.getByRole("heading", { name: /about us/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /our mission is to bring your favorite meals to your doorstep/i
      )
    ).toBeInTheDocument();

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
