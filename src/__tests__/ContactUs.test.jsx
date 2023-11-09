import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import ContactUs from "../components/Routes/ContactUs";

describe("ContactUs", () => {
  it("should render the ContactUs component", () => {
    render(<ContactUs />);

    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("Allows users to fill out the form and submit", () => {
    render(<ContactUs />);

    const nameInput = screen.getByPlaceholderText("Name");
    const messageInput = screen.getByPlaceholderText("Message");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(messageInput, {
      target: { value: "A very good review everything works good!!" },
    });
    fireEvent.click(submitButton);
  });
});
