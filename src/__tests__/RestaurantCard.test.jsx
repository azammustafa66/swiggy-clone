import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import RestaurantCard from "../components/feed/RestaurantCard";
import { mockRestaurantData } from "../mockData/mockData";

describe("Checks if the restaurant cards renders correctly", () => {
  it("should render info correctly", () => {
    render(<RestaurantCard {...mockRestaurantData} />);

    const name = screen.getByText(mockRestaurantData.name);
    expect(name).toBeInTheDocument();

    const cuisines = screen.getByText(mockRestaurantData.cuisines.join(", "));
    expect(cuisines).toBeInTheDocument();

    const avgRating = screen.getByText(mockRestaurantData.avgRating);
    expect(avgRating).toBeInTheDocument();
  });
});
