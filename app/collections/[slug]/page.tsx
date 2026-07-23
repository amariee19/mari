import { notFound } from "next/navigation";
import { products } from "@/lib/collectionsProducts";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ shade?: string }>;
}) {
  const { slug } = await params;
  const { shade } = await searchParams;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <ProductDetailClient product={product} related={related} initialShade={shade} />
  );
}