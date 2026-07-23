"use client";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { removeItem, updateQuantity, clearCart } from "@/lib/redux/features/cart/cartSlice";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";

export default function CartPage() {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#fff3e7] flex flex-col items-center justify-center px-6">
        <div className="p-4 border rounded-full border-[#7a1f53]">
          <ShoppingBag className="text-[#600047] text-xl" />
        </div>
        <h1 className="text-2xl font-outfit text-[#39131f] mb-4">Your bag is empty</h1>
        <Link
          href="/collections"
          className="px-6 py-3 rounded-full bg-[#b3448d] hover:bg-[#7a1f53] text-white font-outfit"
        >
          Browse the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff3e7]">
      <div className="px-6 py-10 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-16 bg-[#600047]" />
          <span className="w-2 h-2 rotate-45 bg-[#600047]" />
          <span className="h-px w-16 bg-[#600047]" />
        </div>
        <h1 className="text-3xl text-center font-outfit text-[#600047] mb-8">
          Your Bag
        </h1>

        <div className="flex flex-col gap-4 mb-8">
          {items.map((item) => (
            <div
              key={`${item.slug}-${item.shadeName}`}
              className="flex items-center gap-4 bg-white/50 rounded-xl p-4"
            >
              <div className="w-20 h-20 bg-[#fff3e7] rounded-lg overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1">
                <p className="font-outfit text-[#39131f]">{item.name}</p>
                <div className="flex items-center gap-2 text-sm text-pink-800">
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ backgroundColor: item.shadeColour }}
                  />
                  {item.shadeName}
                </div>
                <p className="text-[#800f2f] font-semibold mt-1">${item.price}</p>
              </div>

              <div className="flex items-center gap-2 bg-[#f7dae7] border border-[#b3448d] rounded-full px-3 py-1">
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        slug: item.slug,
                        shadeName: item.shadeName,
                        quantity: item.quantity - 1,
                      })
                    )
                  }
                >
                  <Minus size={14} />
                </button>
                <span className="w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        slug: item.slug,
                        shadeName: item.shadeName,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={() =>
                  dispatch(removeItem({ slug: item.slug, shadeName: item.shadeName }))
                }
                className="text-pink-800 hover:text-[#800f2f]"
                aria-label="Remove item"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center border-t border-[#39131f]/10 pt-6 mb-6">
          <span className="text-lg font-outfit text-[#39131f]">Total</span>
          <span className="text-2xl font-semibold text-[#800f2f]">${total.toFixed(2)}</span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => dispatch(clearCart())}
            className="px-6 py-3 rounded-full border border-[#39131f]/20 text-[#39131f] font-outfit"
          >
            Clear Bag
          </button>
          <button className="flex-1 py-3 rounded-full bg-[#b3448d] hover:bg-[#7a1f53] text-white font-outfit">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}