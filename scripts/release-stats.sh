#!/bin/bash
# ======================================================
# 💋 SPL@T Release Stats Dashboard + Supabase Logger
# ======================================================

set -euo pipefail

MAX_TAGS=10
SUPABASE_URL="${NEXT_PUBLIC_SUPABASE_URL:-${SUPABASE_URL:-}}"
SUPABASE_KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"
SUPABASE_TABLE="release_history"

bold() { echo -e "\033[1m$1\033[0m"; }
green() { echo -e "\033[32m$1\033[0m"; }
red() { echo -e "\033[31m$1\033[0m"; }
cyan() { echo -e "\033[36m$1\033[0m"; }
yellow() { echo -e "\033[33m$1\033[0m"; }

echo ""
bold "🧱 SPL@T Release Dashboard"
echo "───────────────────────────────────────────"
echo ""

if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  red "❌ Not a Git repository. Run this in your SPL@T project root."
  exit 1
fi

if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_KEY" ]; then
  yellow "⚠️  Supabase environment variables not set. Skipping upload."
  UPLOAD_ENABLED=false
else
  UPLOAD_ENABLED=true
fi

bold "🔖 Recent Git Tags:"
git fetch --tags > /dev/null 2>&1
TAGS=$(git tag --sort=-creatordate | grep 'splat' | head -n $MAX_TAGS || true)

if [ -z "$TAGS" ]; then
  red "❌ No SPL@T tags found."
else
  echo "$TAGS" | while read -r TAG; do
    COMMIT=$(git log -1 --pretty=format:"%h" "$TAG" 2>/dev/null || echo "?")
    DATE=$(git log -1 --date=format:"%b %d, %Y %H:%M" --pretty=format:"%ad" "$TAG" 2>/dev/null || echo "?")
    AUTHOR=$(git log -1 --pretty=format:"%an" "$TAG" 2>/dev/null || echo "?")
    echo "• $(green $TAG) — $AUTHOR — Commit $COMMIT — $DATE"
  done
fi

echo ""
bold "🚀 Recent Vercel Production Deploys:"
if ! command -v vercel &> /dev/null; then
  yellow "⚠️  Vercel CLI not found. Install it with: pnpm i -g vercel"
else
  vercel list --prod --limit=3 --confirm 2>/dev/null | awk 'NR>1 {print "• "$0}'
fi

echo ""
bold "🌐 Current Git Branch:"
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "$(cyan $BRANCH)"

CURRENT_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "unreleased")
CURRENT_COMMIT=$(git rev-parse HEAD)
AUTHOR=$(git log -1 --pretty=format:"%an")
VERCEL_URL=$(command -v vercel >/dev/null 2>&1 && vercel list --prod --limit=1 --confirm 2>/dev/null | awk 'NR==2 {print $2}' || echo "manual")
NOW=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

if [ "$UPLOAD_ENABLED" = true ]; then
  echo ""
  bold "📡 Uploading release snapshot to Supabase..."
  curl -s -X POST "$SUPABASE_URL/rest/v1/$SUPABASE_TABLE" \
    -H "apikey: $SUPABASE_KEY" \
    -H "Authorization: Bearer $SUPABASE_KEY" \
    -H "Content-Type: application/json" \
    -d "{\n      \"tag\": \"$CURRENT_TAG\",\n      \"commit_hash\": \"$CURRENT_COMMIT\",\n      \"author\": \"$AUTHOR\",\n      \"branch\": \"$BRANCH\",\n      \"vercel_url\": \"$VERCEL_URL\",\n      \"notes\": \"Automated release snapshot from release-stats.sh\",\n      \"deployed_at\": \"$NOW\"\n    }" \
    >/dev/null && green "✅ Release logged to Supabase successfully."
else
  yellow "⚠️  Skipped Supabase logging — missing SUPABASE_SERVICE_ROLE_KEY."
fi

echo ""
bold "💋 Done — stay sexy, stay stable."
