import mongoose, { Schema, type Model } from "mongoose";

// Exp 6: Mongoose schema for the e-commerce catalog
export interface IProduct {
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
  featured: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, index: true },
    image: { type: String, required: true },
    stock: { type: Number, default: 0, min: 0 },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> =
  (mongoose.models.Product as Model<IProduct>) ||
  mongoose.model<IProduct>("Product", ProductSchema);
