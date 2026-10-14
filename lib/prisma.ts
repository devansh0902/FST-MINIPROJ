import { PrismaClient } from "@prisma/client";

// Exp 14: a single shared client avoids opening a new connection on every hot reload / invocation
const g = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = g.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") g.prisma = prisma;
