#!/bin/bash
# ======================================================
# 🚨 SPL@T Rollback Script — v1.0.0-splat-stable
# Author: Liquid Daddy 💋
# Purpose: Instantly revert to last stable baseline
# ======================================================

set -e

echo "🩸 [1/5] Fetching tags and checking out stable tag..."
git fetch --tags
git checkout v1.0.0-splat-stable
git log -1 --oneline
echo "✅ Checked out SPL@T stable tag."

echo "⚙️ [2/5] Resetting main branch to stable baseline..."
git checkout main
git reset --hard v1.0.0-splat-stable
git status
echo "✅ Main branch now matches SPL@T v1.0.0-splat-stable."

echo "🌐 [3/5] Pushing stable version to GitHub..."
git push origin main --force
echo "✅ GitHub's main branch now synced with stable build."

echo "🚀 [4/5] Redeploying to Vercel Production..."
pnpm vercel --prod --force
echo "✅ Vercel production environment rolled back successfully."

echo "🔗 [5/5] Optional: Re-alias the stable deployment..."
echo "👉 Run this manually if needed (login may be required):"
echo "   pnpm vercel alias set splat-landing-lite-13lrswj8h-splat-apps-projects.vercel.app splat-stable.usesplat.com"

echo "💫 Rollback complete! SPL@T is now live on v1.0.0-splat-stable."
