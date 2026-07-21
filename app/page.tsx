"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const features = [
  {
    title: "Try It On",
    description: "See any shade on your face in real time, before you buy.",
  },
  {
    title: "Every Shade",
    description: 'A full spectrum, not just a few "inclusive" add-ons.',
  },
  {
    title: "Skin-First Formulas",
    description:
      "Made with ingredients that respect your skin, not just your look.",
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Path draws in as you scroll past the hero
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div>
      <div ref={heroRef} className="relative w-full h-screen">
        {/* Vine overlay */}
        <svg
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 20 20 
               C 200 40, 100 150, 40 250 
               S 60 450, 30 600 
               S 120 850, 60 980
               M 980 20
               C 800 60, 900 200, 940 320
               S 880 550, 950 700
               S 860 900, 940 980"
            fill="none"
            stroke="#ba5a87"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>

        <div className="flex flex-row h-full relative">
          <div className="w-full max-w-full h-screen mx-auto px-2 bg-[#f7dae7] text-[#ba5a87] relative">
            <div className="px-[20%] flex flex-col gap-5 absolute top-[30%]">
              <h1 className="font-outfit text-7xl text-[#4a2e27]">Your skin matters...</h1>
              <p className="font-garamond text-pink-800 text-2xl">
                mari. is built on a simple idea: your skin deserves products
                made for it, not adjusted to fit it
              </p>
            </div>
          </div>
          <img src="/hero.jpg" alt="" className="object-cover h-full" />
        </div>
        {/* Feature boxes */}
<section className="absolute bottom-6 left-0 right-0 px-[10%]">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-x-20">
    {features.map((f) => (
      <div
        key={f.title}
        className="group p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-[#ba5a87] hover:bg-white/20 hover:shadow-lg hover:shadow-[#f7dae7]/50 transition-all duration-300"
      >
        <h3 className="font-garamond text-2xl text-[#ba5a87] mb-3">
          {f.title}
        </h3>
        <p className="text-[#8a4067] leading-relaxed">{f.description}</p>
      </div>
    ))}
  </div>
</section>
      </div>
    </div>
  );
}