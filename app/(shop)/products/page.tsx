import Link from "next/link";
import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = { title: "All products", description: "Browse the full ShopSphere catalog." };
export const dynamic = "force-dynamic";

const categories = ["Home", "Fashion", "Gadgets", "Stationery"];

export default async function Products({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const products = await getProducts({ category });
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{category ?? "All products"}</h1>
      <div className="flex flex-wrap gap-2">
        {[undefined, ...categories].map((c) => (
          <Link key={c ?? "all"} href={c ? `/products?category=${c}` : "/products"}
            className={`rounded-full px-4 py-1.5 text-sm ${category === c ? "bg-brand-600 text-white" : "bg-white border border-brand-100 hover:bg-brand-50"}`}>
            {c ?? "All"}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{products.map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </div>
  );
}
