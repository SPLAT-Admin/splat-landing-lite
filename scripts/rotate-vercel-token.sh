#!/usr/bin/env bash
set -euo pipefail

cat <<'MSG'
=== Vercel Token Rotation ===
1. Visit https://vercel.com/account/tokens and create a new project-scoped token.
2. Copy the token. Keep this terminal open—paste it when prompted.
MSG

read -rp "Paste new Vercel token: " TOKEN
TOKEN=${TOKEN//[[:space:]]/}

if [[ -z "$TOKEN" ]]; then
  echo "No token provided. Aborting." >&2
  exit 1
fi

echo "\nValidating token with vercel whoami..."
if vercel whoami --token="$TOKEN" >/dev/null 2>&1; then
  echo "✅ Token is valid"
  cat <<'SUCCESS'

Next steps:
  • Update the GitHub repository secret named VERCEL_TOKEN with this value.
  • Commit any changes if necessary.
  • Revoke the old token in the Vercel dashboard.

Remember: Rotate every 90 days.
SUCCESS
else
  echo "❌ Token validation failed. Please try again." >&2
  exit 1
fi
