import Link from "next/link";
import { getSession } from "@/lib/session";
import SignOutButton from "./SignOutButton";
import CartLink from "./CartLink";

export default async function Navbar() {
  const session = await getSession();
  return (
    <header className="sticky top-0 z-20 border-b border-brand-100 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="text-xl font-bold text-brand-600">Shop<span className="text-orange-400">Sphere</span></Link>
        <div className="flex items-center gap-2 text-sm sm:gap-5">
          <Link href="/products" className="hover:text-brand-600">Products</Link>
          {session && <Link href="/account/orders" className="hover:text-brand-600">My orders</Link>}
          {session?.user.role === "ADMIN" && (
            <Link href="/admin" className="rounded-full bg-brand-100 px-3 py-1 text-brand-600">Admin</Link>
          )}
          <CartLink />
          {session ? (
            <SignOutButton />
          ) : (
            <Link href="/login" className="rounded-full bg-brand-600 px-4 py-1.5 text-white hover:bg-brand-500">Sign in</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
