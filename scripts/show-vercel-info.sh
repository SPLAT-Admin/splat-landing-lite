#!/usr/bin/env bash
set -euo pipefail

PROJECT_FILE=".vercel/project.json"

if [[ ! -f "$PROJECT_FILE" ]]; then
  echo "Unable to find $PROJECT_FILE" >&2
  exit 1
fi

ORG_ID=$(jq -r '.orgId // empty' "$PROJECT_FILE")
PROJECT_ID=$(jq -r '.projectId // empty' "$PROJECT_FILE")

if [[ -z "$ORG_ID" || -z "$PROJECT_ID" ]]; then
  echo "orgId or projectId not found in $PROJECT_FILE" >&2
  exit 1
fi

echo "VERCEL_ORG_ID=$ORG_ID"
echo "VERCEL_PROJECT_ID=$PROJECT_ID"
