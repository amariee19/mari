import { EB_Garamond, Outfit } from "next/font/google";

export const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // pick the weights you'll actually use
  variable: "--font-outfit",
});