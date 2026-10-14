# ShopSphere - Next.js 16 E-commerce Mini Project

Light-themed marketplace built for Programming Laboratory-III (DJS23AMD302L).

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and fill in the values (Supabase/Neon Postgres, MongoDB Atlas, Google + GitHub OAuth).
   - OAuth callback URLs: `http://localhost:3000/api/auth/callback/google` and `.../github`
3. `npx prisma migrate dev --name init`   (creates the PostgreSQL tables)
4. `npm run seed`                          (inserts 12 demo products in MongoDB)
5. `npm run dev` -> http://localhost:3000
6. Sign in once, then `npm run make-admin your@email.com` to unlock `/admin`.

## Docker (Exp 12)
`docker compose up --build`

## Deploy (Exp 10)
Push to GitHub -> import in Vercel -> add every variable from `.env.example` -> deploy.
For production run `npx prisma migrate deploy` once against the DIRECT_URL database.
