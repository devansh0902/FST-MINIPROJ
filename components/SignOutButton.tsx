"use client";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => { await authClient.signOut(); router.push("/"); router.refresh(); }}
      className="rounded-full border border-brand-100 px-4 py-1.5 hover:bg-brand-50"
    >
      Sign out
    </button>
  );
}
