"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="bg-[#fef6f8] border-t border-[#39131f]/10 px-6 py-14">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-heading font-bold text-2xl text-[#39131f] mb-3">
           mari.
          </h3>
          <p className="text-sm text-[#8a6a5a] mb-4">
            Cosmetics made for you.
            Handcrafted, cruelty-free, and made to last.
          </p>
          <div className="flex gap-2">
            {["#a83232", "#c1440e", "#c9a876", "#6b1e3a", "#e4537d"].map(
              (c) => (
                <span
                  key={c}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: c }}
                />
              )
            )}
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wide text-[#8a6a5a] mb-3">
            Shop
          </h4>
          <ul className="space-y-2 text-sm text-[#39131f]">
            <li><Link href="/collections">Lipstick</Link></li>
            <li><Link href="/collections">Lip Tint</Link></li>
            <li><Link href="/collections">Lip Gloss</Link></li>
            <li><Link href="/collections">Lip Liner</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wide text-[#8a6a5a] mb-3">
            Experience
          </h4>
          <ul className="space-y-2 text-sm text-[#39131f]">
            <li><Link href="/tryon">Virtual Try-On</Link></li>
            <li><Link href="/account">Account</Link></li>
            <li><Link href="/cart">My Bag</Link></li>
          </ul>
        </div>

        {/* Subscribe section, replacing the old "Company" column */}
        <div>
          <h4 className="text-xs uppercase tracking-wide text-[#8a6a5a] mb-3">
            Stay in the loop
          </h4>
          <p className="text-sm text-[#8a6a5a] mb-3">
            New shades, restocks, and offers — straight to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-0 px-3 py-2 rounded-full border border-[#39131f]/20 text-sm bg-white"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-4 py-2 rounded-full bg-[#b3448d] hover:bg-[#7a1f53] text-white text-sm font-outfit whitespace-nowrap disabled:opacity-60"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
          {status === "done" && (
            <p className="text-xs text-green-700 mt-2">You're subscribed!</p>
          )}
          {status === "error" && (
            <p className="text-xs text-red-600 mt-2">
              Something went wrong. Try again.
            </p>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-[#39131f]/10 mt-10 pt-6 flex justify-between text-xs text-[#8a6a5a]">
        <span>© 2026 mari. . All rights reserved.</span>
        <span>Est. 2026 · Cruelty-Free · Vegan</span>
      </div>
    </footer>
  );
}