<div align="center">

# 🌗 BlackMoon Admin Kit

**A Production-Ready, Blazing-Fast Admin Dashboard Template**

[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](#tech-stack)
[![Nunjucks](https://img.shields.io/badge/Nunjucks-3.2-1C4913?logo=nunjucks&logoColor=white)](#tech-stack)
[![Sass](https://img.shields.io/badge/Sass-1.7-CC6699?logo=sass&logoColor=white)](#tech-stack)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)](#tech-stack)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

*Built completely with **Vanilla CSS/JS** — No frameworks required.* All UI components use the `bm-` class prefix and are beautifully themed via CSS custom properties.

---

> 🤖 **100% AI-Generated & Maintained Architecture**  
> **BlackMoon Admin Kit** is a revolutionary experiment: **Zero manual coding.** Every single line of markup, styling, scripting, and documentation in this repository was, and always will be, generated **exclusively by GitHub Copilot**. No human hand will ever write code here—this is pure AI craftsmanship from inception to continuous iteration.

</div>

<br>

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| 📦 **Build** | Vite 8 + vite-plugin-nunjucks |
| 🧩 **Templates** | Nunjucks (layouts + partials) |
| 💅 **Styling** | SCSS compiled via Vite/Sass, `bm-` prefix |
| ⚡ **JavaScript** | Vanilla JS (IIFE modules, ~39 page scripts) |
| 🎨 **Icons** | Phosphor Icons (web font via jsDelivr CDN) |
| 🌍 **i18n** | Built-in (English, Turkish, German) |
| 🧹 **Linting** | ESLint + Prettier + Stylelint + Husky pre-commit |

---

## ✨ Outstanding Features

- **📐 Advanced Layout**
  - **Sidebar + Header:** Fixed sidebar (280 ↔ 80 px collapse), fixed header, and beautifully scrollable content.
  - **Responsive Design:** Mobile drawer sidebar with backdrop, adaptive header, and breakpoint-aware layouts.
  - **Dynamic Sidebar:** Collapsible, hover-expand, accordion submenus, and active page auto-highlight.
  - **Feature-Rich Header:** Nav links, powerful command palette (Ctrl+K), quick theme toggle, layout toggles, notifications, and user dropdown.

- **🎨 Themes & Design**
  - **3 Seamless Modes:** Light, Light Grey, and Dark — easily toggled via classes with `localStorage` persistence & system preference detection.
  - **CSS Design Tokens:** Semantic colors, perfectly balanced gray scales, elegant shadows, radii, and smooth motion tokens.

- **🛠 Robust Components (30+)**
  - Buttons, cards, tables, **DataGrid**, forms, modals, drawers, tabs, accordions, toast notifications, datepicker, steppers, carousel, lightboxes, and command palettes.
  - **Skeleton Loading:** Built-in `.bm-skeleton-*` components with shimmer animations and a JS API.
  - **Empty States:** Specialized `.bm-empty` macros for elegant data absence.

- **🚀 Developer Experience**
  - **Form Validation:** Integrated `App.validate()` arraying ARIA feedback, auto-initiation via `data-validate`, and deep HTML5 attribute support.
  - **Accessibility First (WCAG 2.1 AA):** Complete with semantic landmarks, precise ARIA attributes, focus trapping, `:focus-visible` outlines, `prefers-reduced-motion` detection, and live regions.
  - **Internationalization (i18n):** Out-of-the-box readiness in EN, TR, and DE with seamless extension via `i18n.js`.
  - **RTL & Print Ready:** CSS logical properties via `[dir="rtl"]` and customized `@media print` directives for hiding UI chrome.

- **📄 40+ Pre-built Pages**
  - Dashboard, Analytics, CRM, Chat, Mail, Kanban, Calendar, File Manager, Shop, Auth routes, Error variants, and much more!

---

## 🏃 Quick Start

Get your dashboard running locally in less than a minute!

```bash
# Navigate to the HTML workspace
cd html

# Install dependencies
npm install

# Start the blazing-fast development server (HMR enabled)
npm run dev       

# Other useful commands:
npm run build     # Compile production build into dist/
npm run preview   # Locally preview the built files
npm run lint      # Run ESLint validation
npm run lint:css  # Run Stylelint validation
npm run format    # Format all codebase with Prettier
```

---

## 📚 Comprehensive Documentation

Ready to dig deeper? Check out our extensive guides:

- 🟢 [Getting Started](./docs/getting-started.md)
- 📐 [Layout System](./docs/layout-system.md)
- 🎨 [Theming System](./docs/theming.md)
- 🧩 [Components Library](./docs/components.md)
- ♿ [Accessibility (A11y)](./docs/accessibility.md)
- ⚙️ [JavaScript Architecture](./docs/javascript-architecture.md)
- 📅 [Roadmap](./docs/roadmap.md)

---

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

