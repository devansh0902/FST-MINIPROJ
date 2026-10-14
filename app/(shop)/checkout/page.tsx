"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { createOrder } from "@/app/actions";

export default function Checkout() {
  const { items, total, clear } = useCart();
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState("");

  const place = () =>
    start(async () => {
      try {
        // Exp 4: calling a Server Action directly - no fetch() boilerplate
        await createOrder(items.map((i) => ({ id: i.id, qty: i.qty })));
        clear();
        router.push("/account/orders");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      }
    });

  return (
    <div className="mx-auto max-w-lg space-y-4 rounded-3xl border border-brand-100 bg-white p-6">
      <h1 className="text-2xl font-bold">Checkout</h1>
      {items.map((i) => <div key={i.id} className="flex justify-between text-sm"><span>{i.title} × {i.qty}</span><span>₹{(i.price * i.qty).toLocaleString("en-IN")}</span></div>)}
      <hr />
      <p className="text-right text-xl font-bold">₹{total.toLocaleString("en-IN")}</p>
      {error && <p className="rounded-lg bg-red-50 p-2 text-sm text-red-600">{error}</p>}
      <button onClick={place} disabled={pending || !items.length} className="w-full rounded-full bg-brand-600 py-3 font-medium text-white hover:bg-brand-500 disabled:bg-gray-300">
        {pending ? "Placing order…" : "Place order (demo payment)"}
      </button>
    </div>
  );
}
