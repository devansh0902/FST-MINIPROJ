import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

import Link from "next/link";

export const metadata: Metadata = { title: "My orders" };

export default async function MyOrders() {
  const session = await getSession();
  if (!session) {
    return (
      <div className="mx-auto max-w-md space-y-4 rounded-3xl border border-brand-100 bg-white p-8 text-center">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-sm text-gray-500">Please sign in to view your orders history.</p>
        <Link href="/login" className="inline-block rounded-full bg-brand-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-500">
          Sign In
        </Link>
      </div>
    );
  }

  let orders: any[] = [];
  try {
    orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    orders = [];
  }
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">My orders</h1>
      {!orders.length && <p className="text-gray-500">No orders yet.</p>}
      {orders.map((o) => (
        <div key={o.id} className="rounded-2xl border border-brand-100 bg-white p-5">
          <div className="flex justify-between text-sm"><span className="font-mono text-gray-400">#{o.id.slice(-8)}</span>
            <span className="rounded-full bg-mint px-3 py-0.5 text-emerald-700">{o.status}</span></div>
          <ul className="my-3 text-sm">{o.items.map((i) => <li key={i.id}>{i.title} × {i.qty}</li>)}</ul>
          <p className="text-right font-bold">₹{o.total.toLocaleString("en-IN")}</p>
        </div>
      ))}
    </div>
  );
}
