# Skeleton Implementation Notes

## Scope implemented in this round

- App shell（top bar + domain switcher + sidebar + content area）
- URL-driven domain switcher（no extra domain app state）
- Sidebar navigation for Operations / Workspace
- Full required route structure
- Two home pages with section-level entry links
- Shared placeholder template for all non-home routes

## GitHub Pages compatibility

- Static frontend only
- No backend runtime
- Hash route pattern (`#/...`) to avoid server-side route handling
- Relative Vite asset base (`base: ./`) so project-subpath deployments on GitHub Pages do not render blank pages
- Build command:

```bash
npm run build
```

Output directory: `dist/`

## Lightweight design decisions

- Vanilla Vite app (no heavy framework)
- No Redux / no complex global state
- Minimal sidebar behavior (no persisted collapse state)
- Navigation rendered from one config file

## Placeholder constraints followed

- No tables
- No workflow logic
- No API integration
- No real business mock dataset
- Structured English business identifiers are only allowed when absolutely needed
