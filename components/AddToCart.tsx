"use client";
import { useState } from "react";
import { useCart } from "./CartProvider";
import type { ProductDTO } from "@/lib/products";

export default function AddToCart({ product, full = false }: { product: ProductDTO; full?: boolean }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  return (
    <button
      disabled={product.stock <= 0}
      onClick={() => { add({ id: product.id, title: product.title, price: product.price, image: product.image }); setDone(true); setTimeout(() => setDone(false), 1200); }}
      className={`rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-500 disabled:bg-gray-300 ${full ? "w-full py-3" : ""}`}
    >
      {product.stock <= 0 ? "Sold out" : done ? "Added ✓" : "Add to cart"}
    </button>
  );
}
