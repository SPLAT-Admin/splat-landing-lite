#!/bin/bash
set -e
echo "🧹 Cleaning local build cache and reinstalling dependencies..."
rm -rf node_modules .next .vercel
pnpm install --frozen-lockfile
pnpm approve-builds -g || true
echo "🚀 Deploying to Vercel with pnpm..."
pnpm exec vercel --prod --force --confirm
