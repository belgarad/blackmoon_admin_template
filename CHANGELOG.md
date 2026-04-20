# Changelog

All notable changes to **BlackMoon Admin Kit** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2026-04-21

First public release.

### Added

#### Build & Tooling
- Vite 8 build pipeline with `vite-plugin-nunjucks` for layouts and partials.
- SCSS compilation via `sass` with a single `app.scss` entry point.
- ESLint, Stylelint, Prettier, Husky pre-commit hooks, and `lint-staged`.
- npm scripts: `dev`, `build`, `preview`, `lint`, `lint:css`, `format`.

#### Layout System
- Fixed sidebar (280 ↔ 80 px collapse) with hover-expand and accordion submenus.
- Fixed header with quick-nav, command palette trigger, theme/layout toggles, notifications, and user menu.
- Mobile drawer sidebar with backdrop and adaptive header.
- Active page auto-highlighting in sidebar.
- Skip-to-content link and semantic landmarks for accessibility.

#### Theming
- Three theme modes: **Light**, **Light Grey** (default), **Dark**.
- Class-based theme toggle (`ThemeManager`) with `localStorage` persistence and system `prefers-color-scheme` detection.
- Distinct Phosphor icons per mode: `ph-sun`, `ph-sun-horizon`, `ph-moon`.
- CSS design tokens: semantic colors, gray scale, shadows, radii, motion tokens.
- Strict color palette compliance — all colors sourced from `docs/reference/color_codes.md`.
- RTL support via CSS logical properties and `[dir="rtl"]` overrides.

#### Components (30+)
- Buttons, cards, tables, **DataGrid**, forms, modals, drawers, tabs, accordion, toast.
- Command palette (`Ctrl+K`), datepicker, stepper, carousel, lightbox.
- Skeleton loaders (`.bm-skeleton-*`) with shimmer animation and JS API.
- Empty states (`.bm-empty`) component + Nunjucks macro.
- Form validation `App.validate()` with ARIA integration, auto-init via `data-validate`, HTML5 attribute support.

#### Pages (40+)
- **Dashboards**: Default, Analytics, Finance, Marketing, Projects.
- **Apps**: CRM, Chat, Mail, Kanban, Calendar, File Manager.
- **Shop**: Products, Cart, Checkout, Orders, Categories, Add/Edit Product, Order Detail.
- **Account**: Overview, Activity, API Keys, Billing, Logs, Referrals, Statements.
- **Auth**: Login, Register, Forgot Password, Two-Factor.
- **Errors**: 403, 404, 500, Maintenance.
- **Other**: Profile, Contacts, Invoices, Subscriptions, Users, Roles, Permissions, Settings, Pricing, FAQ, Blog (listing + post), Support tickets, Wizards, Widgets.

#### Internationalization
- Built-in i18n module (`i18n.js`) with locale switching.
- Languages: English, Turkish, German, Spanish, Russian, Korean.
- 542 country flags via `flag-icons` package, served from `/flags/` (4x3 SVG).

#### Icons
- Phosphor Icons web font via jsDelivr CDN (`@phosphor-icons/web@2.1.1`).
- Class-based usage: `<i class="ph ph-{name}">`.

#### Accessibility (WCAG 2.1 AA)
- Semantic landmarks, ARIA attributes, focus trapping in modals/drawers.
- `:focus-visible` styles, `prefers-reduced-motion` support.
- Screen reader live region for dynamic announcements.

#### Other
- Print stylesheet (`@media print`) hides UI chrome and simplifies cards.
- Vanilla JS architecture — IIFE modules, ~39 per-page scripts, no framework runtime.
- Comprehensive documentation under `docs/`: getting-started, layout-system, theming, components, accessibility, javascript-architecture, roadmap.
- MIT License.
- `THIRD_PARTY_NOTICES.md` for third-party attribution.

[1.0.0]: https://github.com/your-org/admin_template/releases/tag/v1.0.0
