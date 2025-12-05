#!/bin/bash
# ======================================================
# 💋 SPL@T Dynamic Rollback Script
# Automatically rolls back to the latest *-stable tag.
# ======================================================

set -e

echo "🩸 [1/6] Fetching all tags from remote..."
git fetch --tags

LATEST_STABLE_TAG=$(git tag --sort=-creatordate | grep '\-stable$' | head -n 1)

if [ -z "$LATEST_STABLE_TAG" ]; then
  echo "❌ No stable tags found! Aborting rollback."
  exit 1
fi

echo "💫 Latest stable tag detected: $LATEST_STABLE_TAG"

echo "⚙️ [2/6] Checking out stable tag..."
git checkout "$LATEST_STABLE_TAG"
git log -1 --oneline

echo "🧱 [3/6] Resetting main branch to $LATEST_STABLE_TAG..."
git checkout main
git reset --hard "$LATEST_STABLE_TAG"

echo "🌐 [4/6] Pushing stable version to GitHub..."
git push origin main --force
echo "✅ GitHub main branch reset to $LATEST_STABLE_TAG"

echo "🚀 [5/6] Redeploying to Vercel Production..."
pnpm vercel --prod --force

echo "🔗 [6/6] Optional: re-alias deployment"
echo "👉 Run manually if needed:"
echo "   pnpm vercel alias set splat-landing-lite-13lrswj8h-splat-apps-projects.vercel.app splat-stable.usesplat.com"

echo "✅ Rollback complete — SPL@T now live on $LATEST_STABLE_TAG"
