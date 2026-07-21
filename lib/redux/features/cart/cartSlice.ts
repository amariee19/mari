import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  shadeName: string;
  shadeColour: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const incoming = action.payload;
      // Same product + same shade already in the bag → bump quantity
      // instead of creating a duplicate row.
      const existing = state.items.find(
        (item) =>
          item.slug === incoming.slug && item.shadeName === incoming.shadeName
      );
      if (existing) {
        existing.quantity += incoming.quantity;
      } else {
        state.items.push(incoming);
      }
    },
    removeItem: (
      state,
      action: PayloadAction<{ slug: string; shadeName: string }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.slug === action.payload.slug &&
            item.shadeName === action.payload.shadeName
          )
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ slug: string; shadeName: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (i) =>
          i.slug === action.payload.slug &&
          i.shadeName === action.payload.shadeName
      );
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    // Only used once, on app load, to restore from localStorage
    hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, hydrateCart } =
  cartSlice.actions;
export default cartSlice.reducer;