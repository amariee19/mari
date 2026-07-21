export type Shade = { shadeName: string; colour: string };

export type Product = {
  slug: string;
  name: string;
  category: "Lipstick" | "Lip tint" | "Lip gloss" | "Lip liner";
  price: number;
  tagline: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  shades: Shade[];
};

export const products: Product[] = [
  {
    slug: "rouge-velvet",
    name: "Rouge Velvet",
    category: "Lipstick",
    price: 28,
    tagline: "Long-Lasting Satin Lipstick",
    description:
      "A rich, velvety satin finish that lasts all day without drying out your lips.",
    image: "/images/products/rouge-velvet.jpg",
    rating: 4.5,
    reviewCount: 62,
    shades: [
      { shadeName: "Classic Red", colour: "#a83232" },
      { shadeName: "Burgundy Noir", colour: "#6b1e2e" },
      { shadeName: "Coral Blaze", colour: "#d4614a" },
      { shadeName: "Berry Kiss", colour: "#7a2d5c" },
    ],
  },
  {
    slug: "golden-hour",
    name: "Golden Hour",
    category: "Lipstick",
    price: 32,
    tagline: "Earthy Satin Lipstick",
    description:
      "Warm earthy tones inspired by the last light of a summer evening.",
    image: "/images/products/golden-hour.jpg",
    rating: 4.7,
    reviewCount: 44,
    shades: [
      { shadeName: "Amber Glow", colour: "#b5651d" },
      { shadeName: "Terracotta", colour: "#c1440e" },
      { shadeName: "Honey Nude", colour: "#c98a4b" },
      { shadeName: "Copper Rose", colour: "#a9673a" },
    ],
  },
  {
    slug: "velvet-dahlia",
    name: "Velvet Dahlia",
    category: "Lipstick",
    price: 35,
    tagline: "Deep Matte Luxury Lipstick",
    description:
      "A deep, statement matte for anyone who wants their lips to lead the room.",
    image: "/images/products/velvet-dahlia.jpg",
    rating: 4.6,
    reviewCount: 51,
    shades: [
      { shadeName: "Deep Plum", colour: "#5c2d5e" },
      { shadeName: "Mulberry", colour: "#7a3266" },
      { shadeName: "Vintage Wine", colour: "#6b1e3a" },
      { shadeName: "Dark Orchid", colour: "#8b3172" },
    ],
  },
  {
    slug: "powder-pink",
    name: "Powder Pink",
    category: "Lipstick",
    price: 26,
    tagline: "Romantic Matte Lip Colour",
    description: "A soft romantic pink with a smooth matte finish.",
    image: "/images/products/powder-pink.jpg",
    rating: 4.4,
    reviewCount: 38,
    shades: [
      { shadeName: "Pinky Play", colour: "#f066aa" },
      { shadeName: "Pillow Talk", colour: "#de3163" },
      { shadeName: "Rose Nude", colour: "#e4537d" },
      { shadeName: "Daring Babe", colour: "#ea7596" },
    ],
  },
  {
    slug: "petal-blush",
    name: "Petal Blush",
    category: "Lip tint",
    price: 22,
    tagline: "Sheer Tinted Lip Balm",
    description: "A sheer wash of color with the comfort of a lip balm.",
    image: "/images/products/petal-blush.jpg",
    rating: 4.3,
    reviewCount: 29,
    shades: [
      { shadeName: "Petal", colour: "#e8a3b0" },
      { shadeName: "Blush Nude", colour: "#d98a8a" },
    ],
  },
  {
    slug: "rose-dew",
    name: "Rose Dew",
    category: "Lip tint",
    price: 20,
    tagline: "Hydrating Sheer Tint",
    description: "Hydrating sheer tint that leaves a dewy rose flush.",
    image: "/images/products/rose-dew.jpg",
    rating: 4.5,
    reviewCount: 33,
    shades: [
      { shadeName: "Dew Rose", colour: "#e18aa0" },
      { shadeName: "Soft Coral", colour: "#e39587" },
    ],
  },
  {
    slug: "coral-kiss",
    name: "Coral Kiss",
    category: "Lip gloss",
    price: 24,
    tagline: "High-Shine Lip Gloss",
    description:
      "Sun-kissed coral tones with a lacquered high-shine gloss. Channelling the bold spirit of a 1970s California summer.",
    image: "/images/products/coral-kiss.jpg",
    rating: 4.6,
    reviewCount: 48,
    shades: [
      { shadeName: "Coral Reef", colour: "#e0553e" },
      { shadeName: "Sunset Pink", colour: "#e78a72" },
      { shadeName: "Tangerine", colour: "#e8973c" },
      { shadeName: "Golden Nude", colour: "#e0a95f" },
    ],
  },
  {
    slug: "champagne-shine",
    name: "Champagne Shine",
    category: "Lip gloss",
    price: 26,
    tagline: "Crystal Plumping Gloss",
    description: "A crystal-clear plumping gloss with a champagne shimmer.",
    image: "/images/products/champagne-shine.jpg",
    rating: 4.4,
    reviewCount: 27,
    shades: [
      { shadeName: "Champagne", colour: "#e9d8b8" },
      { shadeName: "Rose Fizz", colour: "#e6b8bd" },
    ],
  },
  {
    slug: "the-classic-liner",
    name: "The Classic Liner",
    category: "Lip liner",
    price: 18,
    tagline: "Precision Long-Wear Lip Liner",
    description: "A precision tip for a long-wear, defined lip line.",
    image: "/images/products/classic-liner.jpg",
    rating: 4.5,
    reviewCount: 22,
    shades: [
      { shadeName: "Nude Whisperer", colour: "#a86b5c" },
      { shadeName: "Rose Beige", colour: "#3a1f1f" },
      { shadeName: "Deep Rose", colour: "#c1552f" },
      { shadeName: "True Red", colour: "#6b1e3a" },
    ],
  },
  {
    slug: "bloom-definer",
    name: "Bloom Definer",
    category: "Lip liner",
    price: 20,
    tagline: "Retractable Waterproof Liner",
    description: "A retractable, waterproof liner that holds its shape all day.",
    image: "/images/products/bloom-definer.jpg",
    rating: 4.6,
    reviewCount: 19,
    shades: [
      { shadeName: "Bloom Nude", colour: "#a86b5c" },
      { shadeName: "Berry Bloom", colour: "#6b2d4a" },
      { shadeName: "Deep Bloom", colour: "#4a1f2e" },
      { shadeName: "Wine Bloom", colour: "#5c1a2e" },
    ],
  },
];