import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { beforeAll, describe, expect, it, vitest } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import RestaurantMenu from "../components/menu/RestaurantMenu";
import Header from "../components/layout/Header";
import Cart from "../components/cart/Cart";
import store from "../utils/store";
import mockData from "../mockData/mockMenu.json";

globalThis.fetch = vitest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  })
);

const renderMenu = () =>
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
          <RestaurantMenu />
          <Cart />
        </Router>
      </Provider>
    );
  });

describe("Check if the menu renders correctly", () => {
  beforeAll(renderMenu);

  it("Should render the menu", () => {
    const header = screen.getByText("Biryani (18)");
    expect(header).toBeInTheDocument();
    fireEvent.click(header);

    const items = screen.getAllByTestId("item");
    expect(items.length).toBe(18);
  });

   it("Click the add to cart button and update numbers of items in cart icon", async () => {
    await waitFor(() => {
      const addTooCartBtn = screen.getAllByTestId("addBtn");
      console.log(addTooCartBtn);
      expect(addTooCartBtn.length).toBe(18);
      fireEvent.click(addTooCartBtn[0]);
    });
  }); 

  it("Should update cart items count to 2", () => {
    const addTooCartBtn = screen.getAllByRole("button", {
      name: "Add to Cart",
    });
    console.log(addTooCartBtn);
    fireEvent.click(addTooCartBtn[1]);

    const cartItemsLength = screen.getByTestId("cart-items-count");
    expect(cartItemsLength).toHaveValue(2);
  });
 

  it("Checks the cart if it has two items", () => {
    const cartItems = screen.getAllByTestId("cart-item");
    console.log(cartItems);
    expect(cartItems.length).toBe(0);
  }); 
  
});
