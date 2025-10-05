#!/bin/bash
echo "🧹 Clearing Next.js, Turbo, and pnpm caches..."
rm -rf .next .turbo node_modules/.cache

echo "📦 Reinstalling dependencies..."
pnpm install

echo "🚀 Starting dev server with fresh envs..."
pnpm run dev
