import { createSlice } from "@reduxjs/toolkit";

const saveCartToLocalStorage = (cartData) => {
  localStorage.setItem("cart", JSON.stringify(cartData));
};

const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: storedCart,
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.card.info.id === newItem.card.info.id
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        newItem.quantity = 1;
        state.items.push(newItem);
      }

      saveCartToLocalStorage(state.items);
    },
    removeItem: (state, action) => {
      const itemIdToRemove = action.payload;
      const updatedItems = state.items.filter(
        (item) => item.card.info.id !== itemIdToRemove
      );
      state.items = updatedItems;
      saveCartToLocalStorage(updatedItems); // Save the updated items array to localStorage
    },
    increaseQuantity: (state, action) => {
      const itemIdToIncrease = action.payload;
      const itemToIncrease = state.items.find(
        (item) => item.card.info.id === itemIdToIncrease
      );

      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const itemIdToDecrease = action.payload;
      const itemToDecrease = state.items.find(
        (item) => item.card.info.id === itemIdToDecrease
      );

      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;
      } else {
        const updatedItems = state.items.filter(
          (item) => item.card.info.id !== itemIdToDecrease
        );
        state.items = updatedItems;
      }

      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
