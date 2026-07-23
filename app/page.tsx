"use client";

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

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div>
      <div
        ref={heroRef}
        className="relative w-full min-h-screen flex flex-col overflow-hidden"
      >
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

        {/* Text + image row */}
        <div className="relative flex-1 min-h-[560px] sm:min-h-[640px] md:min-h-0 md:grid md:grid-cols-2">
          {/* Image layer — fills the whole hero on mobile, becomes the right column on md+ */}
          <div className="absolute inset-0 md:relative md:inset-auto md:order-2 w-full h-full overflow-hidden">
            <img
              src="/hero.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text layer — overlays the image on mobile, becomes the left column on md+ */}
          <div
            className="
              relative z-10 md:z-auto md:order-1
              flex items-end md:items-center
              min-h-[560px] sm:min-h-[640px] md:min-h-0
              py-10 sm:py-12 md:py-16
              text-white md:text-[#ba5a87]
              bg-gradient-to-t from-black/70 via-black/30 to-transparent
              md:bg-none md:bg-[#f7dae7]
            "
          >
            <div className="px-6 sm:px-10 lg:px-[10%] flex flex-col gap-3 sm:gap-5 max-w-full">
              <h1 className="font-outfit text-2xl xs:text-3xl sm:text-5xl lg:text-7xl text-white md:text-[#4a2e27] leading-tight break-words drop-shadow-md md:drop-shadow-none">
                Your skin matters...
              </h1>
              <p className="font-garamond text-white/90 md:text-pink-800 text-sm sm:text-xl lg:text-2xl drop-shadow-sm md:drop-shadow-none">
                mari. is built on a simple idea: your skin deserves products
                made for it, not adjusted to fit it
              </p>
            </div>
          </div>
        </div>

        {/* Feature boxes — liquid glass, pink tint */}
        <section className="relative z-30 px-6 sm:px-10 lg:px-[10%] py-8 sm:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="
                  relative overflow-hidden rounded-3xl p-5 sm:p-6
                  bg-gradient-to-br from-pink-200/40 via-pink-100/20 to-white/10
                  backdrop-blur-xl backdrop-saturate-150
                  border border-white/40
                  shadow-[0_8px_32px_rgba(186,90,135,0.15)]
                  before:content-[''] before:absolute before:inset-0
                  before:bg-gradient-to-b before:from-white/30 before:to-transparent
                  before:pointer-events-none
                  hover:border-[#ba5a87]/60 hover:shadow-[0_8px_40px_rgba(186,90,135,0.3)]
                  hover:bg-gradient-to-br hover:from-pink-200/50 hover:via-pink-100/30 hover:to-white/20
                  transition-all duration-300
                "
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-white/60" />
                <h3 className="relative font-garamond text-lg sm:text-xl lg:text-2xl text-[#8a2f52] mb-2 sm:mb-3">
                  {f.title}
                </h3>
                <p className="relative text-[#7a3a56] text-sm sm:text-base leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}