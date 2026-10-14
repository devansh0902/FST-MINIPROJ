import Image from "next/image";
import Link from "next/link";
import type { ProductDTO } from "@/lib/products";
import AddToCart from "./AddToCart";

export default function ProductCard({ p }: { p: ProductDTO }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link href={`/products/${p.id}`} className="relative block aspect-square overflow-hidden bg-brand-50">
        {/* Exp 9: next/image with responsive sizes (auto WebP/AVIF, lazy loading) */}
        <Image src={p.image} alt={p.title} fill sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw" className="object-cover transition group-hover:scale-105" />
      </Link>
      <div className="space-y-1 p-4">
        <p className="text-xs uppercase tracking-wide text-orange-400">{p.category}</p>
        <Link href={`/products/${p.id}`} className="block font-semibold hover:text-brand-600">{p.title}</Link>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold">₹{p.price.toLocaleString("en-IN")}</span>
          <AddToCart product={p} />
        </div>
      </div>
    </div>
  );
}
