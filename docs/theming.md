# Theming Guide

BlackMoon Admin Kit uses **CSS custom properties** (variables) for theming, supporting three theme modes: **Light**, **Light Grey**, and **Dark**.

## How It Works

1. **Light theme** variables are defined on `:root` in `theme.css`
2. **Light Grey theme** overrides are defined on `.light-grey` class
3. **Dark theme** overrides are defined on `.dark` class
4. `theme.js` cycles through themes by toggling classes on `<html>`
5. All components use `var(--property)` references — no hardcoded colors
6. Theme preference is stored in `localStorage` under `admin-theme`

## Theme Modes

| Mode | Class | Background | Description |
|------|-------|------------|-------------|
| Light | `:root` (default) | `#ffffff` | Clean white background |
| Light Grey | `.light-grey` | `#f0f2f5` | Softer grey background, white cards |
| Dark | `.dark` | `#0f0f12` | Dark background with inverted gray scale |

Default theme (when no preference saved): **Light Grey**

## Theme Toggle Implementation

```javascript
// theme.js — auto-loaded via scripts.html partial
// Cycles: light → light-grey → dark → light...
// Stores preference in localStorage('admin-theme')

// Toggle to next theme
ThemeManager.toggle();
```

### How it works internally

```javascript
const THEMES = ['light', 'light-grey', 'dark'];

function applyTheme(theme) {
  document.documentElement.classList.remove('dark', 'light-grey');
  if (theme === 'dark')       document.documentElement.classList.add('dark');
  if (theme === 'light-grey') document.documentElement.classList.add('light-grey');

  // Update all [data-theme-icon] elements with current icon
  // Update all [data-theme-label] elements with current label
}
```

### Theme-aware elements

| Attribute | Purpose |
|-----------|---------|
| `data-theme-icon` | Icon element auto-updated: `light_mode` / `brightness_medium` / `dark_mode` |
| `data-theme-label` | Label element auto-updated: `Light Mode` / `Light Grey Mode` / `Dark Mode` |

### System theme detection

When no preference is saved, the system's `prefers-color-scheme` is respected. Changes to system theme are detected via `matchMedia` listener.

## Color Tokens

### Semantic Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--primary` | `#3b82f6` | `#60a5fa` | Primary actions, links, active states |
| `--primary-foreground` | `#ffffff` | `#0f172a` | Text on primary backgrounds |
| `--primary-light` | `rgba(59,130,246,0.1)` | `rgba(96,165,250,0.15)` | Primary tinted backgrounds |
| `--success` | `#22c55e` | `#4ade80` | Success states, online indicators |
| `--success-light` | `rgba(34,197,94,0.1)` | `rgba(74,222,128,0.15)` | Success tinted backgrounds |
| `--warning` | `#f59e0b` | `#fbbf24` | Warning states, pending |
| `--warning-light` | `rgba(245,158,11,0.1)` | `rgba(251,191,36,0.15)` | Warning tinted backgrounds |
| `--danger` | `#ef4444` | `#f87171` | Error states, destructive actions |
| `--danger-light` | `rgba(239,68,68,0.1)` | `rgba(248,113,113,0.15)` | Danger tinted backgrounds |
| `--info` | `#3b82f6` | `#60a5fa` | Informational badges, links |
| `--info-light` | `rgba(59,130,246,0.1)` | `rgba(96,165,250,0.15)` | Info tinted backgrounds |

### Surface Colors

| Token | Light | Light Grey | Dark | Usage |
|-------|-------|------------|------|-------|
| `--background` | `#ffffff` | `#f0f2f5` | `#0f0f12` | Page background |
| `--foreground` | `#1b1b28` | `#1b1b28` | `#f5f5f7` | Primary text |
| `--card` | `#ffffff` | `#ffffff` | `#1a1a23` | Card backgrounds |
| `--card-foreground` | `#1b1b28` | `#1b1b28` | `#f5f5f7` | Card text |
| `--popover` | `#ffffff` | `#ffffff` | `#1a1a23` | Popover backgrounds |
| `--muted` | `#f4f4f5` | `#e2e5e9` | `#27272a` | Muted backgrounds |
| `--muted-foreground` | `#71717a` | `#6b7280` | `#a1a1aa` | Secondary text |
| `--accent` | `#f4f4f5` | `#e2e5e9` | `#27272a` | Hover backgrounds |
| `--secondary` | `#f4f4f5` | `#e2e5e9` | `#27272a` | Secondary backgrounds |
| `--border` | `#e4e4e7` | `#d1d5db` | `#26262f` | Borders, dividers |
| `--input` | `#e4e4e7` | `#d1d5db` | `#26262f` | Input borders |
| `--ring` | `#3b82f6` | `#3b82f6` | `#60a5fa` | Focus rings |
| `--destructive` | `#ef4444` | `#ef4444` | `#f87171` | Destructive actions |
| `--mono` | `#18181b` | `#18181b` | `#fafafa` | Monochrome accent |

### Gray Scale (Zinc)

Tokens `--gray-50` through `--gray-950` are defined in light mode and **inverted** in dark mode for natural contrast:

| Light | Dark |
|-------|------|
| `--gray-50: #fafafa` | `--gray-50: #18181b` |
| `--gray-100: #f4f4f5` | `--gray-100: #27272a` |
| `--gray-200: #e4e4e7` | `--gray-200: #3f3f46` |
| ... | ... |
| `--gray-950: #09090b` | `--gray-950: #ffffff` |

### Table Tokens

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--table-header-bg` | `transparent` | `rgba(255,255,255,0.03)` | Table header background |
| `--table-stripe-bg` | `rgba(0,0,0,0.02)` | `rgba(255,255,255,0.02)` | Striped row background |
| `--table-hover-bg` | `var(--accent)` | `rgba(255,255,255,0.05)` | Row hover background |
| `--table-selected-bg` | `var(--primary-light)` | `var(--primary-light)` | Selected row background |
| `--table-border` | `var(--border)` | `var(--border)` | Table borders |

### Motion Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | `100ms` | Hover transitions |
| `--duration-normal` | `200ms` | Standard transitions |
| `--duration-slow` | `350ms` | Complex animations |
| `--easing-standard` | `cubic-bezier(0.32,0.72,0,1)` | Standard easing |
| `--easing-spring` | `cubic-bezier(0.34,1.56,0.64,1)` | Bouncy easing |
| `--easing-ease-out` | `cubic-bezier(0,0,0.2,1)` | Ease-out curve |

### Radius & Shadow Tokens

| Token | Value |
|-------|-------|
| `--radius` | `0.5rem` |
| `--radius-sm` | `calc(var(--radius) - 4px)` |
| `--radius-md` | `calc(var(--radius) - 2px)` |
| `--radius-lg` | `var(--radius)` |
| `--radius-xl` | `calc(var(--radius) + 4px)` |
| `--radius-2xl` | `calc(var(--radius) + 8px)` |
| `--radius-full` | `9999px` |
| `--shadow-xs` | Minimal shadow |
| `--shadow-sm` | Subtle shadow (cards) |
| `--shadow-md` | Medium shadow |
| `--shadow-lg` | Large shadow (dropdowns) |
| `--shadow-xl` | Extra large shadow (modals) |

## Customizing Colors

To change the primary color across the entire template:

1. Open `html/public/assets/css/theme.css`
2. Change `--primary` in `:root` (light) and `.dark` (dark)
3. Update `--primary-light` and `--ring` accordingly

Example — changing to purple:
```css
:root {
  --primary: #8b5cf6;
  --primary-foreground: #ffffff;
  --primary-light: rgba(139, 92, 246, 0.1);
  --ring: #8b5cf6;
}
.dark {
  --primary: #a78bfa;
  --primary-foreground: #1e1b4b;
  --primary-light: rgba(167, 139, 250, 0.15);
  --ring: #a78bfa;
}
```

## CSS File Organization

| File | Purpose |
|------|---------|
| `theme.css` | CSS custom properties for all three themes |
| `layout.css` | Layout structure (sidebar, header, wrapper) + all UI components |
| `components.css` | Overlay/panel component classes (dropdowns, notifications) |
| `utilities.css` | Utility classes (typography, color, spacing, flex, grid) |
| `page-styles.css` | Shared page-specific styles (CRM, content filters, etc.) |
| `auth.css` | Auth page layout (brand panel + form panel) |
| `pages/*.css` | Per-page CSS files (calendar, chat, kanban, etc.) |

## Design Tokens (Tailwind)

The shared Tailwind config (`docs/reference/tailwind.config.js`) maps CSS variables to Tailwind utility classes for future framework use:

```javascript
colors: {
  primary:    'var(--primary)',
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  card:       'var(--card)',
  muted:      'var(--muted)',
  border:     'var(--border)',
  // ... etc
}
```

This enables `bg-primary`, `text-muted-foreground`, `border-border` etc. in Tailwind-based builds while automatically adapting to the active theme.
