import { PrismaClient } from "@prisma/client";

// Usage: npm run make-admin you@gmail.com   (sign in once first so the user exists)
const email = process.argv[2];
if (!email) { console.error("Usage: npm run make-admin <email>"); process.exit(1); }

const prisma = new PrismaClient();
prisma.user
  .update({ where: { email }, data: { role: "ADMIN" } })
  .then(() => console.log(`${email} is now ADMIN`))
  .catch(() => console.error("User not found - sign in with that account first."))
  .finally(() => prisma.$disconnect());
