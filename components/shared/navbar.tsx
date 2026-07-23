"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";

const navLinks = [
  { href: "/collections", label: "Shop" },
  { href: "/tryon", label: "Try It On" },
  { href: "/cart", label: "Account" },
];

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/collections?search=${encodeURIComponent(query)}`);
    setMenuOpen(false);
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

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-white/70 backdrop-blur-md border-b border-pink-200/50 shadow-sm">
      <Link href="/" className="font-heading text-xl sm:text-2xl font-bold text-pink-700">
        mari.
      </Link>

      {/* Desktop nav links — hidden below md */}
      <div
        ref={containerRef}
        className="relative hidden md:flex items-center gap-6"
        onMouseLeave={handleMouseLeave}
      >
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

      {/* Right side: search + cart (desktop), hamburger (mobile) */}
      <div className="flex items-center gap-2 sm:gap-3">
        <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shades..."
            className="px-1 py-1.5 border-b border-pink-300 bg-transparent text-sm placeholder:text-[#a55166] focus:outline-none focus:border-pink-900 transition-colors w-32 lg:w-auto"
          />
          <Button type="submit" variant="outline" className="rounded-2xl bg-white/40 backdrop-blur-sm">
            <Search className="size-4" />
          </Button>
        </form>

        <Link href="/cart" className="relative border rounded-2xl bg-white/40 backdrop-blur-sm p-2">
          <ShoppingBag className="size-4" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#800f2f] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>

        {/* Hamburger — only shown below md */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden p-2 rounded-2xl bg-white/40 backdrop-blur-sm text-[#a55166]"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {/* Overlay backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Slide-in side menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[80%] bg-[#fff3e7] z-50 shadow-xl transform transition-transform duration-300 ease-out md:hidden flex flex-col ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-pink-200/50">
          <span className="font-heading text-xl font-bold text-pink-700">mari.</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-full hover:bg-pink-100 text-[#a55166]"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex items-center gap-2 px-5 py-4 border-b border-pink-200/50">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shades..."
            className="flex-1 px-2 py-2 border border-pink-300 rounded-lg bg-white/50 text-sm placeholder:text-[#a55166] focus:outline-none focus:border-pink-900"
          />
          <Button type="submit" variant="outline" className="rounded-xl bg-white/40">
            <Search className="size-4" />
          </Button>
        </form>

        <div className="flex flex-col px-5 py-4 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-[#a55166] hover:text-pink-900 font-outfit text-lg border-b border-pink-100 last:border-none"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}