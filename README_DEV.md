# 🧠 SPL@T Developer Setup Guide

Welcome to the SPL@T core codebase — where we ship unapologetic, high-velocity code with precision.  
This guide covers the local developer environment, VS Code configuration, and command workflow.  

---

## ⚙️ Prerequisites

| Tool | Required | Notes |
|------|-----------|-------|
| **Node.js** | ✅ | Use the version listed in `.nvmrc` or `engines` in `package.json`. |
| **pnpm** | ✅ | Required. SPL@T uses pnpm exclusively (`npm i -g pnpm`). |
| **VS Code** | ✅ | Recommended editor, configured automatically by `.vscode/`. |
| **Supabase CLI** | optional | For local database mirroring and migrations. |
| **Vercel CLI** | optional | For deployment testing and environment sync. |

---

## 🧩 VS Code Environment

The `.vscode/` folder defines a complete development environment:

| File | Purpose |
|------|----------|
| **settings.json** | Formatting, linting, pnpm enforcement, Tailwind IntelliSense |
| **extensions.json** | Auto-installs required plugins (ESLint, Prettier, Tailwind, GitLens, etc.) |
| **launch.json** | Debug SPL@T via `pnpm dev` or attach to a running process |
| **tasks.json** | One-click pnpm commands (build, lint, test, run dev) |

### 💡 Quick Launch
- **⌘⇧B** → Runs the dev server (`pnpm dev`)
- **Run → Run Task** → Choose any predefined task
- **Run → Start Debugging** → “⚡ Run SPL@T (pnpm dev)” launches with breakpoints

---

## 🪶 Formatting & Standards

| Tool | Rule Source |
|------|--------------|
| **Prettier** | `.vscode/settings.json` & `.prettierrc` (single quotes, no semicolons, trailing commas ES5) |
| **ESLint** | Enforces SPL@T lint rules (`pnpm lint`) |
| **Tailwind CSS** | Class suggestions enabled via regex (`clsx`, `cva`, `cn`) |
| **.editorconfig** | Cross-editor enforcement (LF endings, UTF-8, 2-space indentation) |

All formatters run automatically on save.  
To manually format:  
```bash
pnpm lint --fix
```

