"use client";
import { authClient } from "@/lib/auth-client";

export default function Login() {
  const go = (provider: "google" | "github") =>
    authClient.signIn.social({ provider, callbackURL: "/" });
  return (
    <div className="mx-auto max-w-sm space-y-4 rounded-3xl border border-brand-100 bg-white p-8 text-center">
      <h1 className="text-2xl font-bold">Welcome back 👋</h1>
      <p className="text-sm text-gray-500">Sign in to place orders and track them.</p>
      <button onClick={() => go("google")} className="w-full rounded-full border border-brand-100 py-3 font-medium hover:bg-brand-50">Continue with Google</button>
      <button onClick={() => go("github")} className="w-full rounded-full bg-gray-900 py-3 font-medium text-white hover:bg-gray-700">Continue with GitHub</button>
    </div>
  );
}
