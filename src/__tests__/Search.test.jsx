import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";

import Body from "../components/layout/Body";
import mockData from "../mockData/mockFetch.json";

globalThis.fetch = vitest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  })
);

describe("Tests if the search works correctly",  () => {
  it("Checks if the Body renders correctly", async () => {
    await act(async () =>
      render(
        <Router>
          <Body />
        </Router>
      )
    );

    const searchBox = screen.getByPlaceholderText("Search...");
    expect(searchBox).toBeInTheDocument();
    fireEvent.change(searchBox, { target: { value: "Burger" } });
    screen.getAllByTestId("resCard").forEach((card) => {
      expect(card).toBeInTheDocument();
    });

    const topRatedBtn = screen.getByRole("button", { name: "Top rated" });
    expect(topRatedBtn).toBeInTheDocument();
    
    const sortLowToHighBtn = screen.getByRole("button", {
      name: "Sort Low to High",
    });
    expect(sortLowToHighBtn).toBeInTheDocument();

    const sortHighToLowBtn = screen.getByRole("button", {
      name: "Sort High to Low",
    });
    expect(sortHighToLowBtn).toBeInTheDocument();
  });

  /*  it('Should have search input', async () => {

  }); */
});
