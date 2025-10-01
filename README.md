This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:
yep
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) live under `pages/api`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

---

## 🔒 Dev-only Admin Endpoints

For development and local bootstrapping, SPL@T exposes two helper APIs:

- `POST /api/admin/create-admin`
  - Create an initial admin user with email/password.
- `POST /api/admin/reset-password`
  - Reset the password of an existing admin user.

### ⚠️ Safety
- Both endpoints are **protected by `devOnlyGuard`** (`lib/devOnlyGuard.ts`).
- In **production** (`NODE_ENV=production`), they will immediately return:

```json
{ "success": false, "error": "This endpoint is disabled in production" }
```

- This ensures sensitive helpers cannot be abused outside local/dev.

### Usage
1. Ensure Supabase is running with your local dev database.
2. Call the endpoints via curl, Postman, or frontend forms.
3. Once bootstrapped, log in with the created/reset admin credentials.

### Quick Examples

#### Create Admin
```bash
curl -X POST http://localhost:3000/api/admin/create-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"trent@usesplat.com","password":"SuperSecretPassword123"}'
```

#### Reset Admin Password
```bash
curl -X POST http://localhost:3000/api/admin/reset-password \
  -H "Content-Type: application/json" \
  -d '{"email":"trent@usesplat.com","newPassword":"EvenMoreSecret456"}'
```
