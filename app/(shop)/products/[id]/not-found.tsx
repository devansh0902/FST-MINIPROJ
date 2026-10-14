import Link from "next/link";
export default function NotFound() {
  return <div className="py-20 text-center"><h1 className="text-2xl font-bold">Product not found</h1><Link href="/products" className="text-brand-600 underline">Back to products</Link></div>;
}
