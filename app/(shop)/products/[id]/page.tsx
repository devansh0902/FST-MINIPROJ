import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct } from "@/lib/products";
import AddToCart from "@/components/AddToCart";

type Props = { params: Promise<{ id: string }> };

// Exp 9: dynamic SEO metadata generated from the database
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProduct((await params).id);
  if (!p) return { title: "Product not found" };
  return {
    title: p.title,
    description: p.description.slice(0, 150),
    openGraph: { title: p.title, description: p.description.slice(0, 150), images: [p.image] },
  };
}

export default async function ProductPage({ params }: Props) {
  const p = await getProduct((await params).id);
  if (!p) notFound();
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-brand-50">
        <Image src={p.image} alt={p.title} fill priority sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
      </div>
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-wide text-orange-400">{p.category}</p>
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <p className="text-yellow-500">★ {p.rating.toFixed(1)}</p>
        <p className="text-gray-600">{p.description}</p>
        <p className="text-3xl font-extrabold">₹{p.price.toLocaleString("en-IN")}</p>
        <p className={`text-sm ${p.stock > 0 ? "text-emerald-600" : "text-red-500"}`}>{p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}</p>
        <AddToCart product={p} full />
      </div>
    </div>
  );
}
