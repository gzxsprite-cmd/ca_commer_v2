# Skeleton Implementation Notes

## Root cause of GitHub Pages blank page

Previous implementation introduced a build/runtime assumption (Vite pipeline) that is not required for this skeleton round.
For project-site deployment on GitHub Pages, any mismatch between built asset paths and actual hosted path can cause script/css loading failure and render a blank page.

To maximize reliability, this round removes build-time dependency and uses direct static files.

## Current implementation shape

```text
/
├─ index.html
├─ style.css
├─ app.js
├─ assets/
└─ docs/
```

## Routing approach

- Hash-based routing only (`#/...`)
- Supported domains:
  - `/operations/*`
  - `/workspace/*`
- Unknown hash fallback:
  - `#/operations/home`

## Why this structure for GitHub Pages

- No backend runtime
- No build pipeline requirement for deployment
- No root-path asset rewrite risk from bundler output
- Directly serves as a frontend-only SPA skeleton

## Scope included

- App shell (top bar + domain switcher + sidebar + content)
- Domain switcher (URL-prefix driven)
- Sidebar navigation
- Operations Home
- Workspace Home
- Shared placeholder page template

## Placeholder boundaries

- No business-detail pages
- No tables
- No API/backend
- No workflow engine
- No fake complex business data
