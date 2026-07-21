"use client";

import Link from "next/link";
import { useState } from "react";
import { Product } from "@/lib/collectionsProducts";
import { Minus, Plus, Star, ArrowLeft } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addItem } from "@/lib/redux/features/cart/cartSlice";

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [selectedShade, setSelectedShade] = useState(product.shades[0]);
  const [quantity, setQuantity] = useState(1);

 function handleAddToBag() {
  dispatch(
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      shadeName: selectedShade.shadeName,
      shadeColour: selectedShade.colour,
      quantity,
    })
  );
}

  const dispatch = useAppDispatch();

  return (
    <div className="bg-[#fff3e7] min-h-screen px-6 py-10 max-w-6xl mx-auto">
      <Link
        href="/collections"
        className="flex items-center gap-2 text-[#800f2f] font-outfit mb-8"
      >
        <ArrowLeft size={16} />
        Back to Collection
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="relative bg-[#e8ddd0] rounded-xl overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 right-4 bg-white/90 text-[#39131f] text-xs px-3 py-1 rounded-full font-outfit">
            {product.category}
          </span>
        </div>

        <div>
          <p className="font-bold font-heading  uppercase tracking-wide text-[#8a6a5ada] mb-2">
            mari.
          </p>
          <h1 className="text-4xl font-outfit text-[#39131f] mb-2">
            {product.name}
          </h1>
          <p className="text-[#8a6a5a] mb-4">{product.tagline}</p>

          <div className="flex items-center gap-2 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.round(product.rating) ? "#c9a876" : "none"}
                stroke="#c9a876"
              />
            ))}
            <span className="text-sm text-[#8a6a5a]">
              {product.reviewCount} reviews
            </span>
          </div>

          <p className="text-3xl text-[#800f2f] font-semibold mb-4">
            ${product.price}
          </p>

          <p className="text-[#39131f]/80 font-openSans mb-6">
            {product.description}
          </p>

          <div className="mb-6">
            <p className="text-sm text-[#8a6a5a] mb-2">
              Shade —{" "}
              <span className="text-[#39131f]">{selectedShade.shadeName}</span>
            </p>
            <div className="flex gap-3">
              {product.shades.map((shade) => (
                <button
                  key={shade.shadeName}
                  onClick={() => setSelectedShade(shade)}
                  className={`w-9 h-9 rounded-full border-2 transition-all ${
                    selectedShade.shadeName === shade.shadeName
                      ? "border-[#800f2f] scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: shade.colour }}
                  aria-label={shade.shadeName}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-3 bg-[#f7dae7] rounded-full px-4 py-2">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                <Minus size={16} />
              </button>
              <span className="w-4 text-center">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={handleAddToBag}
              className="flex-1 bg-[#b3448d] hover:bg-[#7a1f53] text-white font-outfit py-3 rounded-full transition-colors"
            >
              Add to Bag
            </button>
          </div>

          <Link
            href={`/tryon?product=${product.slug}&shade=${encodeURIComponent(selectedShade.shadeName)}`}
            className="block text-center border border-[#c9a876] text-[#8a6a5a] font-outfit py-3 rounded-full hover:bg-[#c9a876]/10 transition-colors"
          >
            ✦ Try It On Virtually
          </Link>
        </div>
      </div>

      {/* Related products */}
      <div className="mt-20">
        <h2 className="text-2xl font-outfit text-[#39131f] mb-6">
          You may also love
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {related.map((p) => (
            <Link key={p.slug} href={`/collections/${p.slug}`}>
              <div className="bg-[#e8ddd0] aspect-square rounded-lg overflow-hidden mb-3">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-outfit text-[#39131f]">{p.name}</p>
              <p className="text-sm text-[#800f2f]">${p.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
