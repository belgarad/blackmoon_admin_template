# BlackMoon Admin Kit

A production-ready admin dashboard template built with **Vite**, **Nunjucks**, and **vanilla CSS/JS**. All UI components use the `bm-` class prefix and are themed via CSS custom properties.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Build** | Vite 8 + vite-plugin-nunjucks |
| **Templates** | Nunjucks (layouts + partials) |
| **Styling** | SCSS compiled via Vite/Sass, `bm-` prefix |
| **JavaScript** | Vanilla JS (IIFE modules, ~39 page scripts) |
| **Icons** | Phosphor Icons (web font via jsDelivr CDN) |
| **i18n** | Built-in (English, Turkish, German) |
| **Linting** | ESLint + Prettier + Stylelint + Husky pre-commit |

## Features

- **Sidebar + Header Layout** — Fixed sidebar (280 ↔ 80 px collapse), fixed header, scrollable content
- **3 Theme Modes** — Light, Light Grey, Dark — class-based toggle with `localStorage` persistence & system detection
- **Responsive** — Mobile drawer sidebar with backdrop, adaptive header, breakpoint-aware layouts
- **Sidebar** — Collapsible, hover-expand, accordion submenus, active page auto-highlight
- **Header** — Nav links, command palette (Ctrl+K), theme toggle, layout toggle, notifications, user menu
- **CSS Design Tokens** — Semantic colors, gray scale, shadows, radii, motion tokens
- **i18n Ready** — English, Turkish & German out of the box; extensible via `i18n.js`
- **30+ UI Components** — Buttons, cards, tables, DataGrid, forms, modals, drawers, tabs, accordion, toast, command palette, datepicker, stepper, carousel, lightbox …
- **Form Validation** — `App.validate()` with ARIA integration, auto-init via `data-validate`, HTML5 attribute support
- **Accessibility (WCAG 2.1 AA)** — Semantic landmarks, ARIA attributes, focus trapping, `:focus-visible`, `prefers-reduced-motion`, screen reader live region
- **RTL Support** — CSS logical properties, `[dir="rtl"]` overrides, Settings panel toggle
- **Print Stylesheet** — `@media print` hides UI chrome, simplifies cards
- **Skeleton Loading** — `.bm-skeleton-*` components with shimmer animation + JS API
- **Empty States** — `.bm-empty` component + Nunjucks macro
- **40+ Pages** — Dashboard, Analytics, CRM, Chat, Mail, Kanban, Calendar, File Manager, Shop, Auth, Errors, and more

## Quick Start

```bash
cd html
npm install
npm run dev       # Development server with HMR
npm run build     # Production build → dist/
npm run preview   # Preview production build
npm run lint      # ESLint check
npm run lint:css  # Stylelint check
npm run format    # Prettier format all
```

## Documentation

- [Getting Started](./docs/getting-started.md)
- [Layout System](./docs/layout-system.md)
- [Theming](./docs/theming.md)
- [Components](./docs/components.md)
- [Accessibility](./docs/accessibility.md)
- [JavaScript Architecture](./docs/javascript-architecture.md)
- [Roadmap](./docs/roadmap.md)

## Project Structure

```
admin_template/
├── docs/                      Documentation
│   ├── getting-started.md
│   ├── layout-system.md
│   ├── theming.md
│   ├── components.md
│   └── roadmap.md
├── html/                      Main template
│   ├── src/
│   │   ├── layouts/           Nunjucks layouts (base, auth, error)
│   │   ├── partials/          Shared partials + macros
│   │   └── scss/              SCSS source (app.scss entry)
│   ├── pages/                 40+ page templates
│   │   ├── auth/              Login, register, forgot-password, two-factor
│   │   ├── errors/            403, 404, 500, maintenance
│   │   ├── shop/              Products, cart, checkout, orders
│   │   ├── file-manager/      File manager
│   │   ├── projects/          Project management
│   │   ├── account/           Account pages
│   │   ├── blog/              Blog listing & post
│   │   └── support/           Support tickets
│   ├── public/assets/js/
│   │   ├── app.js             Core UI framework
│   │   ├── sidebar.js         Sidebar management
│   │   ├── theme.js           Theme toggle
│   │   ├── i18n.js            Internationalization
│   │   └── pages/             ~39 per-page scripts
│   ├── vite.config.js         Vite + Nunjucks build config
│   └── package.json
├── docs/                      Documentation
│   └── reference/             Design token references (not in build)
└── README.md
```

## Design Tokens

CSS custom properties defined in `html/src/scss/theme.scss`:

| Token | Light | Light Grey | Dark |
|-------|-------|------------|------|
| `--primary` | `#3b82f6` | `#3b82f6` | `#60a5fa` |
| `--background` | `#ffffff` | `#f0f2f5` | `#0f0f12` |
| `--foreground` | `#1b1b28` | `#1b1b28` | `#f5f5f7` |
| `--card` | `#ffffff` | `#ffffff` | `#1a1a23` |
| `--border` | `#e4e4e7` | `#d1d5db` | `#26262f` |
| `--success` | `#22c55e` | `#22c55e` | `#4ade80` |
| `--warning` | `#f59e0b` | `#f59e0b` | `#fbbf24` |
| `--danger` | `#ef4444` | `#ef4444` | `#f87171` |

## License

MIT © 2026 Mustafa Ceylan

