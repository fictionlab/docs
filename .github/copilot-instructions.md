# Fictionlab Documentation - Project Guidelines

This is a **Docusaurus 3** documentation site for Fictionlab robotics products
(Leo Rover, Raph Rover) and hardware/software integrations. Content is written
in **MDXv3**.

## Repository Structure

| Path                           | Purpose                                           |
| ------------------------------ | ------------------------------------------------- |
| `docs/leo-rover/`             | Leo Rover docs (manuals, guides, advanced-guides, documentation, addons, leo-examples) |
| `docs/raph-rover/`            | Raph Rover docs (mirrors Leo Rover structure + `partial/` for reusable fragments) |
| `docs/integrations/`          | Hardware/software integrations (cameras, lidars, positioning-systems, software) |
| `docs/guidelines/`            | Internal documentation style guide and templates  |
| `leo-rover_versioned_docs/`   | Versioned Leo Rover docs (version-1.8)            |
| `integrations_versioned_docs/`| Versioned integrations docs (version-noetic)      |
| `src/components/`             | Custom React components for MDX                   |
| `src/products/`               | Product MDX partials (e.g. powerbox.mdx)          |
| `src/theme/`                  | Docusaurus theme overrides (MDXComponents, NavbarItem, DocVersionBanner) |
| `sidebars/`                   | Sidebar configs (LeoSidebars.ts, RaphSidebars.ts, integrationsSidebar.ts, guidelinesSidebar.ts) |
| `static/img/`                 | Images organized by `robots/leo/`, `robots/raph/`, `branding/`, `icons/` |
| `static/_redirects`           | Cloudflare-style redirect rules                      |
| `scripts/`                    | Validation scripts (frontmatter-check, redirects-check, generate-docs-tree) |

## Build & Development

| Command                    | Purpose                                    |
| -------------------------- | ------------------------------------------ |
| `npm install`              | Install dependencies                       |
| `npm start`                | Start dev server at localhost:3000          |
| `npm run build`            | Production build                           |
| `npm run format`           | Auto-format with Prettier                  |
| `npm run check`            | Run all checks (formatting, spelling, frontmatter, types, redirects) |
| `npm run check:formatting` | Prettier validation                        |
| `npm run check:spelling`   | CSpell spell check                         |
| `npm run check:frontmatter`| Validate required frontmatter keys         |
| `npm run check:types`      | TypeScript type check                      |
| `npm run check:redirects`  | Validate redirect rules                    |

**Node.js >= 20** is required.

## CI Checks

All PRs to `development` and `production` run:

1. **Build** - Full Docusaurus build (`npm run build`)
2. **Lint** - Frontmatter, types, formatting, spelling
3. **Redirects** - Validates `static/_redirects` against changed files

## Git Workflow

- Default branch: `development`
- Production branch: `production` (only merged from `development`)
- Branch naming: `feature/description` or `content/description` from
  `development`
- PRs require review from `@Krzemien97` or `@bjsowa` (see `CODEOWNERS`)

## Images

- Store images under `static/img/` in the appropriate subdirectory (e.g. `static/img/robots/leo/integrations/<name>/`).
- Prefer `.webp` format for raster images (quality 80, lossy); `.svg` is acceptable for diagrams and icons.
- Image file names must be **lowercase with dashes** and descriptive - never auto-generated names like `323d2324.webp`.

## Code Style

- Prettier handles formatting for JS, TS, TSX, MDX, and CSS files.
- TypeScript is used for config files and React components.
- `tsconfig.json` extends `@docusaurus/tsconfig`.
