#!/bin/bash
git rm pages/waitlist.tsx pages/api/waitlist.ts pages/api/join-waitlist.ts components/WaitlistForm.tsx components/JoinWaitlistForm.tsx
git add pages/index.tsx
git commit -m "🚀 Launch-ready: Remove waitlist and restore prod home page"
git push origin main
