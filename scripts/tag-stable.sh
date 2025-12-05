#!/bin/bash
# ======================================================
# 💋 SPL@T Auto-Tag Script
# Automatically bumps build number, tags, pushes, deploys
# ======================================================

set -e

git fetch --tags

LATEST_TAG=$(git tag --sort=-v:refname | grep '^v[0-9]*\.[0-9]*\.[0-9]*-splat-stable$' | head -n 1)
if [ -z "$LATEST_TAG" ]; then
  LATEST_TAG="v1.0.0-splat-stable"
fi

IFS='.-' read -r V_MAJOR V_MINOR V_PATCH _ <<< "$LATEST_TAG"
NEXT_PATCH=$((V_PATCH + 1))
NEW_TAG="v${V_MAJOR}.${V_MINOR}.${NEXT_PATCH}-splat-stable"

echo "💫 Latest tag: $LATEST_TAG"
echo "🏷️  New tag:   $NEW_TAG"

read -p "👉 Proceed to tag and deploy $NEW_TAG? (y/N): " CONFIRM
if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
  echo "❌ Tagging cancelled."
  exit 1
fi

git tag -a "$NEW_TAG" -m "🚀 SPL@T Build $NEW_TAG — Auto-tagged via script"
git push origin "$NEW_TAG"

echo "✅ Tagged and pushed $NEW_TAG to GitHub."

read -p "🚀 Deploy $NEW_TAG to production? (y/N): " DEPLOY_CONFIRM
if [[ "$DEPLOY_CONFIRM" == "y" || "$DEPLOY_CONFIRM" == "Y" ]]; then
  pnpm vercel --prod --force
  echo "✅ Vercel production deployed for $NEW_TAG."
else
  echo "🛑 Skipping deploy step."
fi

echo "🎉 SPL@T build tagging complete — $NEW_TAG is now official."
