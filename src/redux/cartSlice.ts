import { Product } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartProduct {
  product: Product;
  quantity: number;
}

export interface cartState {
  cart: CartProduct[];
}

const initialState: cartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const itemInCart = state.cart.find(
        (item) => item.product.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ product: action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cart.find(
        (item) => item.product.id === action.payload
      );
      if (item) {
        item.quantity++;
      } else {
        console.error("Invalid product id for action: incrementQuantity");
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cart.find(
        (item) => item.product.id === action.payload
      );
      if (item && item.quantity === 1) {
        const removeItem = state.cart.filter(
          (item) => item.product.id !== action.payload
        );
        state.cart = removeItem;
      } else if (item) {
        item.quantity--;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const removeItem = state.cart.filter(
        (item) => item.product.id !== action.payload
      );
      state.cart = removeItem;
    },
  },
});
export const cartReducer = cartSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  cartSlice.actions;
