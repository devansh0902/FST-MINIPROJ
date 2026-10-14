import { isValidObjectId } from "mongoose";
import { connectDB } from "./mongodb";
import { Product } from "@/models/Product";

export type ProductDTO = {
  id: string; title: string; description: string; price: number;
  category: string; image: string; stock: number; rating: number; featured: boolean;
};

const img = (s: string) => `/products/${s}.jpg`;

export const DEMO_PRODUCTS: ProductDTO[] = [
  { id: "demo-1", title: "Pastel Ceramic Mug Set", category: "Home", price: 799, stock: 25, image: img("mug"), featured: true, rating: 4.8, description: "Set of 4 hand-glazed pastel mugs, dishwasher safe." },
  { id: "demo-2", title: "Linen Throw Pillow", category: "Home", price: 549, stock: 40, image: img("pillow"), featured: true, rating: 4.6, description: "Soft breathable linen cover with a plush insert." },
  { id: "demo-3", title: "Scented Soy Candle", category: "Home", price: 399, stock: 60, image: img("candle"), featured: false, rating: 4.5, description: "Lavender and vanilla, 40-hour burn time." },
  { id: "demo-4", title: "Oversized Cotton Tee", category: "Fashion", price: 699, stock: 50, image: img("tee"), featured: true, rating: 4.7, description: "Relaxed fit 100% cotton tee in soft sky blue." },
  { id: "demo-5", title: "Canvas Tote Bag", category: "Fashion", price: 449, stock: 70, image: img("tote"), featured: true, rating: 4.9, description: "Sturdy everyday tote with an inner zip pocket." },
  { id: "demo-6", title: "Sunny Day Cap", category: "Fashion", price: 349, stock: 35, image: img("cap"), featured: false, rating: 4.3, description: "Adjustable cap with breathable cotton twill." },
  { id: "demo-7", title: "Wireless Earbuds", category: "Gadgets", price: 1999, stock: 30, image: img("buds"), featured: true, rating: 4.8, description: "Bluetooth 5.3, 24-hour battery with charging case." },
  { id: "demo-8", title: "Mini Desk Fan", category: "Gadgets", price: 899, stock: 45, image: img("fan"), featured: false, rating: 4.4, description: "USB rechargeable, whisper-quiet, 3 speeds." },
  { id: "demo-9", title: "Portable Power Bank 10000mAh", category: "Gadgets", price: 1299, stock: 55, image: img("power"), featured: true, rating: 4.7, description: "Slim fast-charging power bank with dual ports." },
  { id: "demo-10", title: "Dotted Notebook Duo", category: "Stationery", price: 299, stock: 80, image: img("notebook"), featured: true, rating: 4.9, description: "Two A5 dotted notebooks with thick 120gsm paper." },
  { id: "demo-11", title: "Pastel Gel Pen Pack", category: "Stationery", price: 249, stock: 90, image: img("pens"), featured: false, rating: 4.6, description: "Pack of 12 smooth gel pens in soft pastel inks." },
  { id: "demo-12", title: "Sticky Note Bundle", category: "Stationery", price: 199, stock: 100, image: img("sticky"), featured: false, rating: 4.5, description: "Six colourful sticky note pads for planners and desks." },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toDTO = (p: any): ProductDTO => ({
  id: String(p._id), title: p.title, description: p.description, price: p.price,
  category: p.category, image: p.image, stock: p.stock, rating: p.rating ?? 4.5, featured: Boolean(p.featured),
});

export async function getProducts(opts: { category?: string; featured?: boolean } = {}) {
  try {
    const conn = await connectDB();
    if (conn) {
      const filter: Record<string, unknown> = {};
      if (opts.category) filter.category = opts.category;
      if (opts.featured) filter.featured = true;
      const docs = await Product.find(filter).sort({ createdAt: -1 }).lean();
      if (docs && docs.length > 0) {
        return docs.map(toDTO);
      }
    }
  } catch (err) {
    console.warn("Falling back to demo catalog:", (err as Error).message);
  }

  // Fallback demo catalog
  let list = DEMO_PRODUCTS;
  if (opts.category) {
    list = list.filter((p) => p.category.toLowerCase() === opts.category!.toLowerCase());
  }
  if (opts.featured) {
    list = list.filter((p) => p.featured);
  }
  return list;
}

export async function getProduct(id: string) {
  const demoMatch = DEMO_PRODUCTS.find((p) => p.id === id);
  if (demoMatch) return demoMatch;

  try {
    if (!isValidObjectId(id)) return null;
    const conn = await connectDB();
    if (!conn) return null;
    const doc = await Product.findById(id).lean();
    return doc ? toDTO(doc) : null;
  } catch {
    return null;
  }
}
