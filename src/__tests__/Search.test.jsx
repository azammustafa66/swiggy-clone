import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vitest } from "vitest";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";

import Body from "../components/layout/Body";
import mockData from "../mockData/mockRestaurantList.json";

globalThis.fetch = vitest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  }),
);

const renderComponent = async () =>
  await act(() =>
    render(
      <Router>
        <Body />
      </Router>,
    ),
  );

describe("Test the functionality of main page / Body Component", () => {
  beforeEach(renderComponent);

  it("Checks if the Body renders correctly", () => {
    const cards = screen.getAllByTestId("resCard");
    expect(cards.length).toBe(20);
  });

  it("Should filter restaurants according to the input in the search", () => {
    const searchBox = screen.getByTestId("searchBox");
    expect(searchBox).toBeInTheDocument();
    fireEvent.change(searchBox, { target: { value: "Burger" } });

    const updatedSearchBox = screen.getByDisplayValue("Burger");
    expect(updatedSearchBox).toBeInTheDocument();
    waitFor(() => expect(screen.getAllByTestId("resCard")).toHaveLength(3));
  });

  it("Should sort restaurants according to the ratings", () => {
    const topRatedBtn = screen.getByRole("button", { name: "Top rated" });
    expect(topRatedBtn).toBeInTheDocument();
    fireEvent.click(topRatedBtn);

    const sortedCards = screen.getAllByTestId("resCard");
    waitFor(() => {
      let prevRating = 5;
      sortedCards.forEach((card) => {
        let currRating = parseFloat(
          card.querySelector("[data-testid=rating]").innerHTML,
        );
        expect(currRating).toBeLessThanOrEqual(prevRating);
        prevRating = currRating;
      });
    });
  });

  it("Should sort the restaurants from low to high", () => {
    const sortLowToHighBtn = screen.getByRole("button", {
      name: "Sort Low to High",
    });
    expect(sortLowToHighBtn).toBeInTheDocument();
    fireEvent.click(sortLowToHighBtn);

    const sortedCardsLowToHigh = screen.getAllByTestId("resCard");
    waitFor(() => {
      let prevCost = 0;
      sortedCardsLowToHigh.forEach((card) => {
        let currCost = parseInt(
          card
            .querySelector("Card.Text:nth-child(4)")
            .innerHTML.match(/\d+/)[0],
        );
        expect(currCost).toBeGreaterThanOrEqual(prevCost);
        prevCost = currCost;
      });
    });
  });

  it("Should sort the restaurants from high to low", () => {
    const sortHighToLowBtn = screen.getByRole("button", {
      name: "Sort High to Low",
    });
    expect(sortHighToLowBtn).toBeInTheDocument();
    fireEvent.click(sortHighToLowBtn);

    const sortedCardsHighToLow = screen.getAllByTestId("resCard");
    waitFor(() => {
      let prevCost = Infinity;
      sortedCardsHighToLow.forEach((card) => {
        let currCost = parseInt(
          card
            .querySelector("Card.Text:nth-child(4)")
            .innerHTML.match(/\d+/)[0],
        );
        expect(currCost).toBeLessThanOrEqual(prevCost);
        prevCost = currCost;
      });
    });
  });
});
