"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, setQty, total } = useCart();
  if (!items.length)
    return <div className="py-20 text-center"><p className="mb-4 text-gray-500">Your cart is empty.</p><Link href="/products" className="text-brand-600 underline">Start shopping</Link></div>;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your cart</h1>
      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.id} className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-3">
            <Image src={i.image} alt={i.title} width={72} height={72} className="rounded-xl object-cover" />
            <div className="flex-1"><p className="font-medium">{i.title}</p><p className="text-sm text-gray-500">₹{i.price.toLocaleString("en-IN")}</p></div>
            <div className="flex items-center gap-2">
              <button onClick={() => setQty(i.id, i.qty - 1)} className="h-8 w-8 rounded-full bg-brand-50">−</button>
              <span className="w-6 text-center">{i.qty}</span>
              <button onClick={() => setQty(i.id, i.qty + 1)} className="h-8 w-8 rounded-full bg-brand-50">+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-2xl bg-brand-50 p-5">
        <span className="text-xl font-bold">Total: ₹{total.toLocaleString("en-IN")}</span>
        <Link href="/checkout" className="rounded-full bg-brand-600 px-6 py-3 font-medium text-white hover:bg-brand-500">Checkout</Link>
      </div>
    </div>
  );
}
