---
applyTo: "**/*.mdx"
---

# MDX Authoring & Review Guidelines

## File Conventions

- File names: **lowercase, dashes** — no underscores, no spaces (e.g. `intel-realsense.mdx`).
- Integration pages (under `docs/integrations/`) must follow `[manufacturer]-[model].mdx` (e.g. `intel-realsense-d435.mdx`, `sick-tim571.mdx`).
- Files prefixed with `_` (e.g. `_integration.template.mdx`) are excluded from builds and frontmatter checks.
- Image file names must be lowercase-with-dashes and descriptive — never auto-generated names like `323d2324.webp`.
- Each documentation section uses `_category_.json` for sidebar category metadata.

## Frontmatter

Every `.mdx` file (except `_`-prefixed and `docs/guidelines/`) **must** include:

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

Optional fields: `id`, `sidebar_position`, `slug`, `unlisted`, `toc_max_heading_level`.

Validated by `yarn check:frontmatter` in CI.

## Images

- Use **only** `ImageZoom` or `ThemedImageZoom` components — never raw markdown images (`![alt](url)`) or HTML `<img>` tags.
- `ImageZoom` is globally registered (no import needed). `ThemedImageZoom` requires an explicit import.
- Themed image pairs must use `-light` / `-dark` suffixes (e.g. `diagram-light.webp`, `diagram-dark.webp`) and have matching dimensions.

Usage:

```mdx
<ImageZoom
  src="/img/robots/leo/example.webp"
  alt="Description"
  width="1200"
  height="800"
/>
```

`width` and `height` are required — `ImageZoom` throws an error if either is missing.

```mdx
import ThemedImageZoom from "@site/src/components/ThemedImageZoom";

<ThemedImageZoom
  sources={{
    light: "/img/robots/leo/example-light.webp",
    dark: "/img/robots/leo/example-dark.webp",
  }}
  alt="Description"
  width="1200"
  height="800"
/>
```

## Components

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

Product partials: `import Product from "@site/src/products/powerbox.mdx"`.

## Inline Formatting

| Type                       | Style    | Example                                 |
| -------------------------- | -------- | --------------------------------------- |
| Click/press command        | **bold** | click **yes** to proceed                |
| Choose from options        | `code`   | Choose `Xorg` session                   |
| Type/enter text            | `code`   | type `pi` for the username              |
| External software mentions | link     | uses [NetworkManager](url) to manage... |
| Tool names (SSH, CLI)      | `code`   | use the `rosmsg` tool                   |
| Directories/paths          | **bold** | files inside **/home/pi** directory     |
| Versions                   | `code`   | install the `full` version              |
| File names                 | `code`   | modify the `hostapd.conf` file          |
| Field/parameter names      | `code`   | set the `ssid` field                    |
| Keyboard shortcuts         | **bold** | press **Ctrl+O** then **Enter**         |
| ROS topics                 | `code`   | see the `/battery` topic                |
| Service names              | `code`   | stop the `leo` service                  |
| Variables                  | `code`   | set `START_ROSCORE` to `true`           |

## Empty Sections

Do not leave sections empty. If a section is unfinished, it must contain a `{/* TODO */}` comment and a visible `_Work in progress_` note for readers.

## Redirects

When renaming or moving a page, add a redirect rule to `static/_redirects` (Cloudflare format: `old-path new-path 301`). Validated by `yarn check:redirects` in CI.

## Versioning

- Current docs in `docs/`, older versions in `*_versioned_docs/`.
- Leo Rover: current = 1.9, versioned = 1.8 (`leo-rover_versioned_docs/version-1.8/`).
- Integrations: current, versioned = noetic (`integrations_versioned_docs/version-noetic/`).
- Edits must target the correct version directory.

## Spelling

New technical terms (ROS topics, product names, etc.) must be added to the `words` array in `cspell.json`. Validated by `yarn check:spelling` in CI.

## Templates

When creating new pages, follow the existing templates:

- Integration pages: `docs/integrations/_integration.template.mdx`
- Addon pages: `docs/guidelines/templates/addon-template.mdx`

Expected sections for integration pages: hero image, description, "What to expect?", "Prerequisites", "Hardware integration" (Mounting, Wiring), "Software integration", "Example usage", "What's next?".

Full style guide: https://docs.fictionlab.pl/guidelines

## Code Review

Any inconsistency with the rules in this file must be flagged as a code review comment.
