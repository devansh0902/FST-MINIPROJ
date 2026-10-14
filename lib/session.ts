import { headers } from "next/headers";
import { auth } from "./auth";

export async function getSession() {
  try {
    return await auth.api.getSession({ headers: await headers() });
  } catch {
    return null;
  }
}

// Second line of defence inside server actions (proxy.ts is the first)
export async function requireAdmin() {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") throw new Error("Forbidden");
  return session;
}
