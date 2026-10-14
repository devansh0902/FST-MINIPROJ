import mongoose from "mongoose";
import { Product } from "../models/Product";

const img = (s: string) => `/products/${s}.jpg`;
const data = [
  { title: "Pastel Ceramic Mug Set", category: "Home", price: 799, stock: 25, image: img("mug"), featured: true, description: "Set of 4 hand-glazed pastel mugs, dishwasher safe." },
  { title: "Linen Throw Pillow", category: "Home", price: 549, stock: 40, image: img("pillow"), featured: true, description: "Soft breathable linen cover with a plush insert." },
  { title: "Scented Soy Candle", category: "Home", price: 399, stock: 60, image: img("candle"), featured: false, description: "Lavender and vanilla, 40-hour burn time." },
  { title: "Oversized Cotton Tee", category: "Fashion", price: 699, stock: 50, image: img("tee"), featured: true, description: "Relaxed fit 100% cotton tee in soft sky blue." },
  { title: "Canvas Tote Bag", category: "Fashion", price: 449, stock: 70, image: img("tote"), featured: true, description: "Sturdy everyday tote with an inner zip pocket." },
  { title: "Sunny Day Cap", category: "Fashion", price: 349, stock: 35, image: img("cap"), featured: false, description: "Adjustable cap with breathable cotton twill." },
  { title: "Wireless Earbuds", category: "Gadgets", price: 1999, stock: 30, image: img("buds"), featured: true, description: "Bluetooth 5.3, 24-hour battery with charging case." },
  { title: "Mini Desk Fan", category: "Gadgets", price: 899, stock: 45, image: img("fan"), featured: false, description: "USB rechargeable, whisper-quiet, 3 speeds." },
  { title: "Portable Power Bank 10000mAh", category: "Gadgets", price: 1299, stock: 55, image: img("power"), featured: true, description: "Slim fast-charging power bank with dual ports." },
  { title: "Dotted Notebook Duo", category: "Stationery", price: 299, stock: 80, image: img("notebook"), featured: true, description: "Two A5 dotted notebooks with thick 120gsm paper." },
  { title: "Pastel Gel Pen Pack", category: "Stationery", price: 249, stock: 90, image: img("pens"), featured: false, description: "Pack of 12 smooth gel pens in soft pastel inks." },
  { title: "Sticky Note Bundle", category: "Stationery", price: 199, stock: 100, image: img("sticky"), featured: false, description: "Six colourful sticky note pads for planners and desks." },
];

async function main() {
  await mongoose.connect(process.env.MONGODB_URI!);
  await Product.deleteMany({});
  await Product.insertMany(data);
  console.log(`Seeded ${data.length} products`);
  await mongoose.disconnect();
}
main();
