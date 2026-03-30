# Fictionlab Documentation — Project Guidelines

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

## Content Authoring Rules

### File Conventions

- All documentation files use `.mdx` extension.
- File names: **lowercase, dashes instead of underscores** (e.g.
  `intel-realsense.mdx`).
- Files prefixed with `_` (e.g. `_integration.template.mdx`) are excluded from
  builds and frontmatter checks.
- Each documentation section uses `_category_.json` for sidebar category
  metadata.

### Frontmatter (Required)

Every `.mdx` file (except `_`-prefixed and `guidelines/`) **must** include:

```yaml
---
title: Full page title for SEO
sidebar_label: Short sidebar label
keywords:
  - keyword1
  - keyword2
  - keyword3
  - keyword4
description: >-
  Up to 160 characters. Use >- scalar for multiline to avoid Prettier issues.
image: /img/robots/leo/integrations/example/image.webp
---
```

Optional fields: `id`, `sidebar_position`, `slug`, `unlisted`,
`toc_max_heading_level`.

Validation: `yarn check:frontmatter` enforces the required keys in CI.

### Images

- Use **only** `ImageZoom` or `ThemedImageZoom` components — never raw markdown
  images or HTML `<img>` tags.
- Store images in `static/img/` following the existing directory structure
  (e.g. `static/img/robots/leo/integrations/<name>/`).
- Prefer `.webp` format for raster images, `.svg` for diagrams and icons.

### Components Available in MDX

Globally registered (no import needed): `LinkButton`, `ImageZoom`.

Other components require explicit import:

```mdx
import ThemedImageZoom from "@site/src/components/ThemedImageZoom";
import FlexTable from "@site/src/components/FlexTable";
import FlexTableItem from "@site/src/components/FlexTableItem";
import FusionEmbed from "@site/src/components/FusionEmbed";
import HiddenTabs from "@site/src/components/HiddenTabs";
import ProductPreview from "@site/src/components/ProductPreview";
import CenterContent from "@site/src/components/CenterContent";
```

Product partials are imported from `src/products/`:

```mdx
import Product from "@site/src/products/powerbox.mdx";
```

### Templates

When creating new pages, follow existing templates:

- **Integration pages:**
  `docs/integrations/_integration.template.mdx`
- **Addon pages:**
  `docs/guidelines/templates/addon-template.mdx`

Full style guide: https://docs.fictionlab.pl/guidelines

### Redirects

When renaming or moving a page, add a redirect rule to `static/_redirects`
(Cloudflare format: `old-path new-path 301`). The `yarn check:redirects` script
validates redirect coverage on PRs.

## Build & Development

| Command                  | Purpose                                    |
| ------------------------ | ------------------------------------------ |
| `yarn install`           | Install dependencies                       |
| `yarn start`             | Start dev server at localhost:3000          |
| `yarn build`             | Production build                           |
| `yarn format`            | Auto-format with Prettier                  |
| `yarn check`             | Run all checks (formatting, spelling, frontmatter, types, redirects) |
| `yarn check:formatting`  | Prettier validation                        |
| `yarn check:spelling`    | CSpell spell check                         |
| `yarn check:frontmatter` | Validate required frontmatter keys         |
| `yarn check:types`       | TypeScript type check                      |
| `yarn check:redirects`   | Validate redirect rules                    |

**Node.js >= 20** and **Yarn Classic (1.x)** are required.

## CI Checks

All PRs to `development` and `production` run:

1. **Build** — Full Docusaurus build (`yarn build`)
2. **Lint** — Frontmatter, types, formatting, spelling
3. **Redirects** — Validates `static/_redirects` against changed files

## Git Workflow

- Default branch: `development`
- Production branch: `production` (only merged from `development`)
- Branch naming: `feature/description` or `content/description` from
  `development`
- PRs require review from `@Krzemien97` or `@bjsowa` (see `CODEOWNERS`)

## Versioning

The site uses Docusaurus versioning for two doc plugins:

- **Leo Rover**: current (1.9) + versioned 1.8
  (`leo-rover_versioned_docs/version-1.8/`)
- **Integrations**: current + versioned noetic
  (`integrations_versioned_docs/version-noetic/`)

When editing versioned content, apply changes to the correct version directory.
Current version lives in `docs/`, older versions in `*_versioned_docs/`.

## Spelling

CSpell is configured in `cspell.json`. If a technical term (ROS topic, product
name, etc.) is flagged as unknown, add it to the `words` array in `cspell.json`.

## Code Style

- Prettier handles formatting for JS, TS, TSX, MDX, and CSS files.
- TypeScript is used for config files and React components.
- `tsconfig.json` extends `@docusaurus/tsconfig`.
