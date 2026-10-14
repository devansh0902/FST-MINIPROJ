import mongoose from "mongoose";

// Exp 6 + 14: cache the connection so serverless functions reuse it
const g = globalThis as unknown as {
  _mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};
const cache = (g._mongoose ??= { conn: null, promise: null });

export async function connectDB(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes("cluster.mongodb.net") || uri.includes("your-mongodb-uri")) {
    return null;
  }
  if (cache.conn) return cache.conn;
  try {
    cache.promise ??= mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    cache.conn = await cache.promise;
    return cache.conn;
  } catch (err) {
    console.warn("MongoDB unavailable, falling back to demo catalog:", (err as Error).message);
    cache.conn = null;
    cache.promise = null;
    return null;
  }
}
