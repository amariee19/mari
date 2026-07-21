"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useState } from "react";
import { products, Product } from "@/lib/collectionsProducts";
import { useSearchParams } from "next/navigation";

const CATEGORIES: Product["category"][] = [
  "Lipstick",
  "Lip tint",
  "Lip gloss",
  "Lip liner",
];

function CollectionsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as Product["category"] | null;
  const [activeCategory, setActiveCategory] = useState<Product["category"] | "All">(
    categoryParam ?? "All"
  );

  const grouped = products.reduce<Record<string, Product[]>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

  const visibleProducts =
    activeCategory === "All" ? products : grouped[activeCategory] ?? [];

  return (
    <div className="bg-[#f7dae7] min-h-screen">
      {/* Hero */}
      <section className="text-center pt-20 pb-12 px-6">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-16 bg-[#600047]" />
          <span className="w-2 h-2 rotate-45 bg-[#600047]" />
          <span className="h-px w-16 bg-[#600047]" />
        </div>
        <h1 className="text-5xl md:text-6xl font-outfit text-[#600047] mb-4">
          The Collection
        </h1>
        <p className="text-[#600047] font-openSans">
          Handcrafted lip colours for every mood, every moment, every you.
        </p>
      </section>

      {/* Filter pills */}
      <div className="flex flex-wrap justify-center gap-3 px-6 mb-12">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-5 py-2 rounded-full text-sm font-outfit border transition-all ${
            activeCategory === "All"
              ? "bg-[#800f2f] text-white border-[#800f2f]"
              : "bg-transparent text-[#39131f] border-[#39131f]/30 hover:border-[#800f2f]"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-outfit uppercase tracking-wide border transition-all ${
              activeCategory === cat
                ? "bg-[#800f2f] text-white border-[#800f2f]"
                : "bg-transparent text-[#39131f] border-[#39131f]/30 hover:border-[#800f2f]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 pb-24 max-w-7xl mx-auto">
        {visibleProducts.map((product) => (
          <Link
            key={product.slug}
            href={`/collections/${product.slug}`}
            className="group"
          >
            <div className="bg-[#ffd9da] aspect-square rounded-lg overflow-hidden mb-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-xs uppercase tracking-wide text-[#8a6a5a] mb-1">
              {product.category}
            </p>
            <h3 className="font-outfit text-[#39131f] text-lg mb-1">
              {product.name}
            </h3>
            <p className="text-sm text-[#8a6a5a] mb-2">{product.tagline}</p>
            <div className="flex items-center justify-between">
              <span className="text-[#800f2f] font-semibold">
                ${product.price}
              </span>
              <div className="flex gap-1">
                {product.shades.slice(0, 4).map((shade, i) => (
                  <span
                    key={i}
                    className="w-3 h-3 rounded-full border border-black/10"
                    style={{ backgroundColor: shade.colour }}
                  />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Collections() {
  return (
    <Suspense fallback={<div className="bg-[#f7dae7] min-h-screen" />}>
      <CollectionsContent />
    </Suspense>
  );
}