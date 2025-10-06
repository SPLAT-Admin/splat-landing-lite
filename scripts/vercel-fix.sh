#!/usr/bin/env bash
set -e

echo "🧹 Cleaning and rebuilding for Vercel..."
rm -rf node_modules .next .vercel/.pnpm-store
corepack enable
corepack prepare pnpm@10.14.0 --activate
pnpm install --frozen-lockfile
pnpm run build
pnpm exec vercel --prod --yes
