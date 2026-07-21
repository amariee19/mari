import { notFound } from "next/navigation";
import { products } from "@/lib/collectionsProducts";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return <ProductDetailClient product={product} related={related} />;
}