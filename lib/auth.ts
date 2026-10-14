import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "./prisma";

// Exp 7: Better Auth with Google + GitHub (secrets stay server-side: Exp 13)
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  // Exp 8: custom "role" column. input:false => users cannot set it themselves
  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "USER", input: false },
    },
  },
  plugins: [nextCookies()],
});
