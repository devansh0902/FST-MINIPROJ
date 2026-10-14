"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartLink() {
  const { count } = useCart();
  return (
    <Link href="/cart" className="relative hover:text-brand-600">
      Cart
      {count > 0 && (
        <span className="ml-1 rounded-full bg-orange-400 px-2 py-0.5 text-xs font-semibold text-white">{count}</span>
      )}
    </Link>
  );
}
