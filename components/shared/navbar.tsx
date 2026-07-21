"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";

const navLinks = [
  { href: "/collections", label: "Shop" },
  { href: "/tryon", label: "Try It On" },
  { href: "/cart", label: "Account" },
];

// const itemCount = useAppSelector((state) =>
//   state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
// );

export default function Navbar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  const handleMouseEnter = (index: number) => {
    const link = linkRefs.current[index];
    const container = containerRef.current;
    if (!link || !container) return;

    const linkRect = link.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    setBubbleStyle({
      left: linkRect.left - containerRect.left,
      width: linkRect.width,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setBubbleStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  const itemCount = useAppSelector((state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-transparent backdrop-blur-md border-b border-pink-200/50 shadow-sm">
      <Link href="/" className="font-heading text-2xl font-bold text-pink-700">
        mari.
      </Link>

      <div
        ref={containerRef}
        className="relative flex items-center gap-6"
        onMouseLeave={handleMouseLeave}
      >
        {/* sliding bubble */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-10 rounded-full bg-pink-200/60 transition-all duration-300 ease-out pointer-events-none"
          style={{
            left: `${bubbleStyle.left}px`,
            width: `${bubbleStyle.width}px`,
            opacity: bubbleStyle.opacity,
          }}
        />

        {navLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            ref={(el) => { linkRefs.current[index] = el; }}
            onMouseEnter={() => handleMouseEnter(index)}
            className="relative z-10 px-3 py-1 text-[#a55166] hover:text-pink-900 transition-colors font-outfit text-xl"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-row items-center gap-3">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shades..."
            className="px-1 py-1.5 border-b border-pink-300 bg-transparent text-sm placeholder:text-[#a55166] focus:outline-none focus:border-pink-900 transition-colors"
          />
          <Button type="submit" variant="outline" className="rounded-2xl bg-white/40 backdrop-blur-sm">
            <Search className="size-4" />
          </Button>
        </form>
        <Link href="/cart" className="relative border rounded-2xl bg-white/40 backdrop-blur-sm">
  <ShoppingBag className="size-4"  />
  {itemCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-[#800f2f] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
      {itemCount}
    </span>
  )}
</Link>
        {/* <Button variant="outline" className="rounded-2xl bg-white/40 backdrop-blur-sm">
          <ShoppingBag className="size-4" />
        </Button> */}
      </div>
    </nav>
  );
}