import Image from "next/image";
import { getProducts } from "@/lib/products";
import { addProduct, deleteProduct } from "@/app/actions";

export const dynamic = "force-dynamic";
const input = "w-full rounded-lg border border-brand-100 bg-white px-3 py-2 text-sm";

export default async function AdminProducts() {
  const products = await getProducts();
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Products</h1>
      {/* Exp 4: form posts straight to a Server Action */}
      <form action={addProduct} className="grid gap-3 rounded-2xl border border-brand-100 bg-white p-5 sm:grid-cols-2">
        <input name="title" placeholder="Title" required className={input} />
        <select name="category" className={input}><option>Home</option><option>Fashion</option><option>Gadgets</option><option>Stationery</option></select>
        <input name="price" type="number" min="0" placeholder="Price (₹)" required className={input} />
        <input name="stock" type="number" min="0" placeholder="Stock" required className={input} />
        <input name="image" placeholder="Image URL (https://picsum.photos/seed/xyz/600/600)" required className={`${input} sm:col-span-2`} />
        <textarea name="description" placeholder="Description" className={`${input} sm:col-span-2`} />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="featured" /> Featured</label>
        <button className="rounded-full bg-brand-600 py-2 text-white hover:bg-brand-500">Add product</button>
      </form>

      <div className="space-y-2">
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-3 rounded-xl border border-brand-100 bg-white p-3">
            <Image src={p.image} alt={p.title} width={48} height={48} className="rounded-lg object-cover" />
            <div className="flex-1 text-sm"><p className="font-medium">{p.title}</p><p className="text-gray-500">{p.category} · stock {p.stock}</p></div>
            <span className="font-semibold">₹{p.price}</span>
            <form action={deleteProduct}><input type="hidden" name="id" value={p.id} /><button className="text-sm text-red-500 hover:underline">Delete</button></form>
          </div>
        ))}
      </div>
    </div>
  );
}
