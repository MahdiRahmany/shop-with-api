import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addItemCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }
    },

    removeItemCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    incrementItemQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementItemQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const {
  addItemCart,
  removeItemCart,
  incrementItemQuantity,
  decrementItemQuantity,
} = cartSlice.actions;

export const selectIsInCart = (state, id) =>
  state.cart.items.some((item) => item.id === id);

export const selectTotalItems = (state) =>
  state.cart.items.reduce((sum, item) => sum + (item.quantity || 1), 0);

export const selectTotalPrice = (state) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

export default cartSlice.reducer;
