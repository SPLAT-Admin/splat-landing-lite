#!/bin/bash
vercel projects list --token $VERCEL_TOKEN | grep "Preview" | awk {print } | sort -u > preview-domains.txt
echo "✅ Preview domains logged to preview-domains.txt"
echo "⚡ Copy these into Cloudflare Turnstile allowed domains."
