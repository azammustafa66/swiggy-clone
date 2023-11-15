import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import RestaurantCard, { isPromoted } from "../components/feed/RestaurantCard";
import { mockRestaurantData } from "../mockData/mockData";

describe("Checks if the restaurant cards renders correctly", () => {
  it("should render info correctly", () => {
    render(<RestaurantCard {...mockRestaurantData} />);

    const name = screen.getByText(mockRestaurantData.name);
    expect(name).toBeInTheDocument();

    const costForTwo = screen.getByText(mockRestaurantData.costForTwo);
    expect(costForTwo).toBeInTheDocument();

    const avgRating = screen.getByText(
      `Rating: ${mockRestaurantData.avgRating}`,
    );
    expect(avgRating).toBeInTheDocument();

    const cuisines = mockRestaurantData.cuisines.join(", ");
    if (cuisines.length <= 25) {
      expect(screen.getByText(cuisines)).toBeInTheDocument();
    }

    if (cuisines.length > 25) {
      const truncatedCuisines = cuisines.slice(0, 25) + "...";
      expect(screen.getByText(truncatedCuisines)).toBeInTheDocument();
    }
  });

  it("Checks if the HOC renders with promoted label", () => {
    const PromotedRestaurantCard = isPromoted(RestaurantCard);
    render(<PromotedRestaurantCard {...mockRestaurantData} />);

    const promotedLabel = screen.getByText("Promoted");
    expect(promotedLabel).toBeInTheDocument();
  });
});
