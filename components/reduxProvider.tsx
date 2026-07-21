"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/redux/store";
import { hydrateCart } from "@/lib/redux/features/cart/cartSlice";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  // Load saved cart from localStorage on first mount, then keep it in
  // sync on every change. Wrapped in useEffect since localStorage only
  // exists in the browser, not during server rendering.
  useEffect(() => {
    const saved = localStorage.getItem("bloomrouge-cart");
    if (saved) {
      try {
        storeRef.current!.dispatch(hydrateCart(JSON.parse(saved)));
      } catch {
        // ignore malformed/corrupted saved data
      }
    }

    const unsubscribe = storeRef.current!.subscribe(() => {
      const state = storeRef.current!.getState();
      localStorage.setItem("bloomrouge-cart", JSON.stringify(state.cart.items));
    });

    return unsubscribe;
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}