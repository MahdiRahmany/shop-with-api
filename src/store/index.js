import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart-slice.js";
import productReducer from "./slices/product-slice.js";
import productsReducer from "./slices/products-slice.js";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    products: productsReducer,
  },
});

export default store;
