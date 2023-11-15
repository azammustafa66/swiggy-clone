import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "../components/layout/Header";
import cartReducer, { addItem } from "../utils/cartSlice";
import { mockItemData } from "../mockData/mockData";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const renderHeaderWithStore = () => {
  return render(
    <Provider store={store}>
      <Router>
        <Header />
      </Router>
    </Provider>,
  );
};

describe("Header", () => {
  it("should load the login button", () => {
    renderHeaderWithStore();

    const loginBtn = screen.getByRole("button", { name: "Login" });
    expect(loginBtn).toBeInTheDocument();

    fireEvent.click(loginBtn);
    expect(loginBtn).toHaveTextContent("Logout");
  });

  it("Should render with cart items", () => {
    renderHeaderWithStore();

    // Initially the cart is empty
    expect(screen.queryByText("0")).toBeInTheDocument();

    // Add an item to the cart
    store.dispatch(addItem(mockItemData));

    // Render the header again
    renderHeaderWithStore();

    // Check if the cart has the item
    const cartItemsCounts = screen.getAllByTestId("cart-items-count");
    expect(cartItemsCounts.length).toBe(2);
    cartItemsCounts.forEach((count) => {
      expect(count).toHaveTextContent("1");
    });
  });
});
