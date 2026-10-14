import { prisma } from "@/lib/prisma";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  let productCount = 12;
  let orderCount = 0;
  let userCount = 0;
  let revenue = { _sum: { total: 0 as number | null } };

  try {
    const conn = await connectDB();
    if (conn) {
      productCount = await Product.countDocuments();
      [orderCount, userCount, revenue] = await Promise.all([
        prisma.order.count(),
        prisma.user.count(),
        prisma.order.aggregate({ _sum: { total: true } }),
      ]);
    }
  } catch {
    // Keep fallback values
  }
  const stats = [
    ["Revenue", `₹${(revenue._sum.total ?? 0).toLocaleString("en-IN")}`, "bg-mint"],
    ["Orders", orderCount, "bg-peach"],
    ["Products", productCount, "bg-brand-100"],
    ["Users", userCount, "bg-sky-50"],
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(([label, value, bg]) => (
          <div key={String(label)} className={`rounded-2xl p-5 ${bg}`}><p className="text-sm text-gray-600">{label}</p><p className="text-2xl font-bold">{value}</p></div>
        ))}
      </div>
    </div>
  );
}
