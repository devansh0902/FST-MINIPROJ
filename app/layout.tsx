import type { Metadata } from "next";
import "./globals.css";

// Exp 3: ROOT layout - wraps every page in the app
// Exp 9: default SEO metadata, overridden per page
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: { default: "ShopSphere - Bright things for everyday life", template: "%s | ShopSphere" },
  description: "ShopSphere is a light, modern marketplace built with Next.js 16.",
  openGraph: { title: "ShopSphere", description: "Bright things for everyday life", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
