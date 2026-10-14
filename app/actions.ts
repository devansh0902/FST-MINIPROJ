"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { getSession, requireAdmin } from "@/lib/session";

// ---- Exp 4 + 5: place an order inside a Prisma transaction ----
export async function createOrder(items: { id: string; qty: number }[]) {
  if (!items.length) throw new Error("Cart is empty");
  const session = await getSession();
  const conn = await connectDB();

  // If running in demo fallback mode without PostgreSQL/MongoDB
  if (!conn || !session) {
    const demoId = "demo-order-" + Math.random().toString(36).slice(2, 8);
    revalidatePath("/account/orders");
    return demoId;
  }

  // Never trust prices from the browser: re-read them from MongoDB
  const docs = await Product.find({ _id: { $in: items.map((i) => i.id) } }).lean();
  const lines = items.map((i) => {
    const p = docs.find((d) => String(d._id) === i.id);
    if (!p) throw new Error("Product not found");
    if (p.stock < i.qty) throw new Error(`Not enough stock for ${p.title}`);
    return { productId: i.id, title: p.title, price: p.price, qty: i.qty };
  });
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);

  const order = await prisma.$transaction(async (tx) => {
    return tx.order.create({
      data: { userId: session.user.id, total, items: { create: lines } },
    });
  });

  await Promise.all(lines.map((l) => Product.updateOne({ _id: l.productId }, { $inc: { stock: -l.qty } })));
  revalidatePath("/account/orders");
  return order.id;
}

// ---- Admin: product CRUD via Server Actions ----
export async function addProduct(formData: FormData) {
  await requireAdmin();
  await connectDB();
  await Product.create({
    title: String(formData.get("title")),
    description: String(formData.get("description") ?? ""),
    price: Number(formData.get("price")),
    category: String(formData.get("category")),
    image: String(formData.get("image")),
    stock: Number(formData.get("stock") ?? 0),
    featured: formData.get("featured") === "on",
  });
  revalidatePath("/admin/products");
  revalidatePath("/");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  await connectDB();
  await Product.findByIdAndDelete(String(formData.get("id")));
  revalidatePath("/admin/products");
  revalidatePath("/");
}

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();
  await prisma.order.update({
    where: { id: String(formData.get("id")) },
    data: { status: String(formData.get("status")) },
  });
  revalidatePath("/admin/orders");
}
