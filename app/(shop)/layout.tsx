import Navbar from "@/components/Navbar";
import { CartProvider } from "@/components/CartProvider";

// Exp 1 + 3: route group "(shop)" gives the storefront its OWN layout
// (navbar + footer + cart state) without changing the URL.
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="mt-12 border-t border-brand-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ShopSphere · Built with Next.js 16
      </footer>
    </CartProvider>
  );
}
