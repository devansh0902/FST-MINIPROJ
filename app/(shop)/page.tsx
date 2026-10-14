import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

const categories = ["Home", "Fashion", "Gadgets", "Stationery"];

export default async function Home() {
  const featured = (await getProducts({ featured: true })).slice(0, 8);
  return (
    <div className="space-y-12">
      <section className="grid items-center gap-6 rounded-3xl bg-gradient-to-br from-brand-100 via-peach to-mint p-8 sm:p-14 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">Bright things for <span className="text-brand-600">everyday</span> life.</h1>
          <p className="text-gray-600">Hand-picked home, fashion, gadgets and stationery, delivered with a smile.</p>
          <Link href="/products" className="inline-block rounded-full bg-brand-600 px-6 py-3 font-medium text-white hover:bg-brand-500">Shop now</Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((c) => (
            <Link key={c} href={`/products?category=${c}`} className="rounded-2xl bg-white/80 p-5 text-center font-medium shadow-sm hover:bg-white">{c}</Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Featured picks</h2>
        {featured.length ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{featured.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        ) : (
          <p className="text-gray-500">No products yet. Run <code>npm run seed</code>.</p>
        )}
      </section>
    </div>
  );
}
