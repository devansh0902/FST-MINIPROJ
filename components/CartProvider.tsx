"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = { id: string; title: string; price: number; image: string; qty: number };
type Ctx = {
  items: CartItem[];
  add: (i: Omit<CartItem, "qty">) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};
const CartCtx = createContext<Ctx | null>(null);

// Exp 3: this provider lives in the (shop) layout, so the cart survives client-side navigation
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem("cart") ?? "[]")); } catch {}
  }, []);
  useEffect(() => { localStorage.setItem("cart", JSON.stringify(items)); }, [items]);

  const add: Ctx["add"] = (i) =>
    setItems((cur) =>
      cur.some((c) => c.id === i.id) ? cur.map((c) => (c.id === i.id ? { ...c, qty: c.qty + 1 } : c)) : [...cur, { ...i, qty: 1 }]
    );
  const setQty = (id: string, qty: number) =>
    setItems((cur) => (qty <= 0 ? cur.filter((c) => c.id !== id) : cur.map((c) => (c.id === id ? { ...c, qty } : c))));

  const value: Ctx = {
    items, add, setQty, clear: () => setItems([]),
    count: items.reduce((s, i) => s + i.qty, 0),
    total: items.reduce((s, i) => s + i.qty * i.price, 0),
  };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart must be inside CartProvider");
  return c;
};
