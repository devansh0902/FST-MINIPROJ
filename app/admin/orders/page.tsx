import { prisma } from "@/lib/prisma";
import { updateOrderStatus } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function AdminOrders() {
  let orders: any[] = [];
  try {
    orders = await prisma.order.findMany({ include: { user: true, items: true }, orderBy: { createdAt: "desc" } });
  } catch {
    orders = [];
  }
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Orders</h1>
      {orders.map((o) => (
        <form key={o.id} action={updateOrderStatus} className="flex flex-wrap items-center gap-3 rounded-xl border border-brand-100 bg-white p-4 text-sm">
          <input type="hidden" name="id" value={o.id} />
          <span className="font-mono text-gray-400">#{o.id.slice(-8)}</span>
          <span className="flex-1">{o.user.name} · {o.items.length} item(s)</span>
          <span className="font-semibold">₹{o.total.toLocaleString("en-IN")}</span>
          <select name="status" defaultValue={o.status} className="rounded-lg border border-brand-100 px-2 py-1">
            <option>PLACED</option><option>SHIPPED</option><option>DELIVERED</option>
          </select>
          <button className="rounded-full bg-brand-600 px-3 py-1 text-white">Save</button>
        </form>
      ))}
    </div>
  );
}
