import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { getProducts } from "@/lib/products";
import { auth } from "@/lib/auth";

// GET /api/products?category=Home  -> public
export async function GET(req: Request) {
  const category = new URL(req.url).searchParams.get("category") ?? undefined;
  return NextResponse.json(await getProducts({ category }));
}

// POST /api/products -> admin only
export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await connectDB();
  const created = await Product.create(await req.json());
  return NextResponse.json(created, { status: 201 });
}
