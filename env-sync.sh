#!/bin/bash
# 🧬 SPL@T Env Sync Script
# Sync local Supabase & app environment vars with Vercel project settings.

set -e

if ! command -v vercel &>/dev/null; then
  echo "❌ Vercel CLI not installed. Run: pnpm add -g vercel"
  exit 1
fi

echo "🔐 Syncing environment variables to Vercel..."

# Load vars from local .env.local
export $(grep -v '^#' .env.local | xargs)

# Push critical vars to Vercel
vercel env add NEXT_PUBLIC_SUPABASE_URL production <<<"$NEXT_PUBLIC_SUPABASE_URL"
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production <<<"$NEXT_PUBLIC_SUPABASE_ANON_KEY"
vercel env add SUPABASE_SERVICE_ROLE_KEY production <<<"$SUPABASE_SERVICE_ROLE_KEY"

echo "✅ Environment variables synced successfully!"
