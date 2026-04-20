# Copilot Code Review Instructions

This is a Docusaurus 3 documentation site for Fictionlab robotics products
(Leo Rover, Raph Rover). Content is written in MDXv3.

## MDX File Rules

### Required Frontmatter

Every `.mdx` file (except `_`-prefixed files and files in `docs/guidelines/`)
must include all of these frontmatter fields:

- `title` — Full page title for SEO
- `sidebar_label` — Short label for sidebar navigation
- `keywords` — Array of 4–5 keywords
- `description` — Up to 160 characters; use `>-` YAML scalar for multiline
  values to avoid Prettier issues with special characters like colons
- `image` — Path to a social/meta image (e.g. `/img/robots/leo/...`)

Flag any `.mdx` file missing these fields (unless the filename starts with `_`
or the file is inside `docs/guidelines/`).

### File Naming

- All documentation files must use `.mdx` extension.
- File names must be **lowercase with dashes** — no underscores, no spaces
  (e.g. `intel-realsense.mdx`, not `Intel_RealSense.mdx`).
- Integration pages (files under `docs/integrations/`) must follow the
  `[manufacturer]-[model].mdx` naming pattern
  (e.g. `intel-realsense-d435.mdx`, `sick-tim571.mdx`).
- Image file names must also be lowercase with dashes, and be descriptive —
  never use auto-generated names like `323d2324.webp`.

### Images

- Images must use **only** `ImageZoom` or `ThemedImageZoom` components.
- Flag any raw markdown images (`![alt](url)`) or HTML `<img>` tags.
- Images should be in `.webp` format (quality 80, lossy). `.svg` is acceptable
  for diagrams and icons.
- Images must be stored under `static/img/` in the appropriate subdirectory
  (e.g. `static/img/robots/leo/integrations/<name>/`).
- Themed images (light/dark variants) must use `-light` and `-dark` suffixes
  (e.g. `diagram-light.webp`, `diagram-dark.webp`) and have matching
  dimensions.

### Components

- `ImageZoom` and `LinkButton` are globally registered — they do NOT need
  imports. Flag unnecessary imports of these two components.
- All other components require explicit imports:
  `ThemedImageZoom`, `FlexTable`, `FlexTableItem`, `FusionEmbed`, `HiddenTabs`,
  `ProductPreview`, `CenterContent`.
- Product partials are imported from `@site/src/products/` (e.g.
  `import Product from "@site/src/products/powerbox.mdx"`).

## Formatting Styles

Verify that inline formatting follows these conventions:

| Type                       | Style    | Example                                  |
| -------------------------- | -------- | ---------------------------------------- |
| Click/press command        | **bold** | click **yes** to proceed                 |
| Choose from options        | `code`   | Choose `Xorg` session                    |
| Type/enter text            | `code`   | type `pi` for the username               |
| External software mentions | link     | uses [NetworkManager](url) to manage...  |
| Tool names (SSH, CLI)      | `code`   | use the `rosmsg` tool                    |
| Directories/paths          | **bold** | files inside **/home/pi** directory      |
| Versions                   | `code`   | install the `full` version               |
| File names                 | `code`   | modify the `hostapd.conf` file           |
| Field/parameter names      | `code`   | set the `ssid` field                     |
| Keyboard shortcuts         | **bold** | press **Ctrl+O** then **Enter**          |
| ROS topics                 | `code`   | see the `/battery` topic                 |
| Service names              | `code`   | stop the `leo` service                   |
| Variables                  | `code`   | set `START_ROSCORE` to `true`            |

## Empty Sections

Do not leave sections empty. If a section is unfinished, it must contain a
`{/* TODO */}` comment and a visible `_Work in progress_` note for readers.

## Redirects

When a file is renamed or moved, check that a corresponding redirect rule exists
in `static/_redirects` (Cloudflare format: `old-path new-path 301`).

## Versioning

- Current docs live in `docs/`. Older versions in `*_versioned_docs/`.
- Leo Rover: current = 1.9, versioned = 1.8.
- Integrations: current, versioned = noetic.
- Edits must target the correct version directory.

## Spelling

If a PR introduces technical terms (ROS topics, product names, etc.) that would
be flagged by CSpell, ensure they are added to the `words` array in
`cspell.json`.

## Integration & Addon Pages

New integration or addon pages should follow the structure defined in the
templates:

- `docs/integrations/_integration.template.mdx`
- `docs/guidelines/templates/addon-template.mdx`

Expected sections for integration pages: hero image, description, "What to
expect?", "Prerequisites", "Hardware integration" (Mounting, Wiring), "Software
integration", "Example usage", "What's next?".
