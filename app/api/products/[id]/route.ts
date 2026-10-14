import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { getProduct } from "@/lib/products";
import { auth } from "@/lib/auth";

type Ctx = { params: Promise<{ id: string }> };

async function isAdmin(req: Request) {
  const s = await auth.api.getSession({ headers: req.headers });
  return s?.user.role === "ADMIN";
}

export async function GET(_req: Request, { params }: Ctx) {
  const product = await getProduct((await params).id);
  return product ? NextResponse.json(product) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req: Request, { params }: Ctx) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await connectDB();
  const updated = await Product.findByIdAndUpdate((await params).id, await req.json(), { new: true });
  return updated ? NextResponse.json(updated) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(req: Request, { params }: Ctx) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await connectDB();
  await Product.findByIdAndDelete((await params).id);
  return NextResponse.json({ ok: true });
}
