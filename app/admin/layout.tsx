import Link from "next/link";

// Exp 3: a completely different sub-layout (sidebar) for the dashboard
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const links = [["/admin", "Overview"], ["/admin/products", "Products"], ["/admin/orders", "Orders"], ["/", "← Back to shop"]];
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="border-b border-brand-100 bg-white p-4 md:w-56 md:border-r md:border-b-0">
        <p className="mb-4 text-lg font-bold text-brand-600">Admin panel</p>
        <nav className="flex gap-2 md:flex-col">
          {links.map(([href, label]) => <Link key={href} href={href} className="rounded-lg px-3 py-2 text-sm hover:bg-brand-50">{label}</Link>)}
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
