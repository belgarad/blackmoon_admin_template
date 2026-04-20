# Reference Files

This folder contains **design reference files only** — they are **not part of the build pipeline**.

| File | Purpose |
|------|---------|
| `color_codes.md` | Master color palette reference used to derive CSS custom properties |
| `tailwind.config.js` | Tailwind CSS mapping of CSS variables for potential future framework integration |
| `css/layout.css` | Static CSS reference copy of the layout system (source of truth: `html/src/scss/layout.scss`) |
| `css/theme.css` | Static CSS reference copy of theme tokens (source of truth: `html/src/scss/theme.scss`) |

> **Do not modify these files expecting changes in the live template.**
> Always edit the SCSS sources under `html/src/scss/` instead.
