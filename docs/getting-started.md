# Getting Started

## Overview

BlackMoon Admin Kit is an HTML admin dashboard template built with **Vite** and **Nunjucks** templating. It includes 30+ pages, 3 theme modes, i18n support, and a comprehensive component library — all without any frontend framework dependency.

| Stack | Details |
|-------|---------|
| Template Engine | Nunjucks (via `vite-plugin-nunjucks`) |
| Build Tool | Vite 8 |
| CSS | SCSS compiled via Vite/Sass, `bm-` prefix |
| JavaScript | Vanilla JS (ES5, IIFE modules) |
| Icons | Phosphor Icons (web font via jsDelivr CDN) |

## Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

## Quick Start

```bash
cd html
npm install
npm run dev
# Open http://localhost:5173/pages/dashboard.html
```

### Production Build

```bash
npm run build      # Compile to dist/
npm run preview    # Preview the build
```

### Linting & Formatting

```bash
npm run lint            # ESLint check JS
npm run lint:fix        # ESLint auto-fix JS
npm run lint:css        # Stylelint check SCSS
npm run lint:css:fix    # Stylelint auto-fix SCSS
npm run format          # Prettier format all
npm run format:check    # Prettier check formatting
```

## Project Structure

```
admin_template/
├── html/                         # Main template
│   ├── index.html                # Redirect → dashboard
│   ├── package.json              # Vite + Nunjucks dependencies
│   ├── vite.config.js            # Vite config with auto-discovery of pages/**/*.html
│   ├── src/
│   │   ├── layouts/
│   │   │   ├── base.html         # Main layout (sidebar + header + content + footer)
│   │   │   ├── auth.html         # Auth layout (brand panel + form panel)
│   │   │   └── error.html        # Error layout (minimal, no sidebar)
│   │   └── partials/
│   │       ├── head.html         # <meta>, CSS links
│   │       ├── header.html       # Top header bar
│   │       ├── sidebar.html      # Navigation sidebar
│   │       ├── footer.html       # Page footer
│   │       ├── overlays.html     # User menu, notifications, command palette, settings drawer
│   │       └── scripts.html      # JS file includes
│   ├── pages/                    # All page templates
│   │   ├── dashboard.html
│   │   ├── analytics.html
│   │   ├── users.html
│   │   ├── auth/                 # login, register, forgot-password, two-factor
│   │   ├── errors/               # 403, 404, 500, maintenance
│   │   ├── shop/                 # products, cart, checkout
│   │   └── ...                   # 30+ pages total
│   └── public/
│       └── assets/
│           └── js/
│               ├── app.js            # UI components (modal, tabs, toast, datepicker, datagrid…)
│               ├── theme.js          # Theme toggle (light ↔ light-grey ↔ dark)
│               ├── sidebar.js        # Sidebar collapse/expand + mobile drawer
│               ├── i18n.js           # Internationalization (en, tr, de)
│               └── pages/            # Per-page JS modules
├── shared/                           # Design reference files (not in build)
│   ├── tailwind.config.js            # Tailwind config reference
│   └── color_codes.md                # Named color palette
└── docs/                         # Documentation
    ├── getting-started.md        # This file
    ├── components.md             # UI component reference
    ├── layout-system.md          # Layout architecture
    ├── theming.md                # Colors & theme modes
    ├── roadmap.md                # Development roadmap
    └── reference/                # Design token references (NOT in build)
        ├── css/                  # Static CSS reference copies
        ├── tailwind.config.js    # Tailwind preset (future use)
        └── color_codes.md        # Named color palette
```

## Nunjucks Templating

Pages use Nunjucks `{% extends %}` and `{% block %}` to inherit from shared layouts.

### Creating a page with the main layout

```html
{% extends "layouts/base.html" %}
{% set title = "My Page" %}
{% set activeMenu = "my-page" %}
{% set basePath = "" %}

{% block content %}
  <div class="bm-page-header">
    <h1 class="bm-page-title">My Page</h1>
  </div>
  <!-- Page content here -->
{% endblock %}
```

### Available layout variables

| Variable | Usage |
|----------|-------|
| `title` | Page title (shown in `<title>` tag) |
| `activeMenu` | Sidebar menu item to highlight |
| `basePath` | Relative prefix for links (`""` for root pages, `"../"` for nested) |
| `pageStyles` | Set truthy to load `page-styles.css` |
| `pageCSS` | Page-specific SCSS file name (e.g., `"calendar-app"`) |
| `pageJS` | Page-specific JS file name (e.g., `"dashboard"`) |

### Available blocks

| Block | Layout | Purpose |
|-------|--------|---------|
| `headExtra` | All | Additional `<head>` content (CSS, scripts) |
| `content` | base, auth, error | Main page content |
| `brand` | auth | Auth page brand panel hero content |
| `scripts` | All | Additional scripts before `</body>` |

## Pages Included

### Main Menu
| Page | File | Description |
|------|------|-------------|
| Dashboard | `dashboard.html` | Stats cards, charts (Chart.js), activity table |
| Analytics | `analytics.html` | Analytics overview with charts |
| Users | `users.html` | User list with filters, pagination, add modal |
| Messages | `messages.html` | Message/inbox interface |
| Content | `content.html` | Content management with filters |
| Activity Feed | `activity-feed.html` | Activity log feed |

### Apps
| Page | File | Description |
|------|------|-------------|
| CRM | `crm.html` | Customer relationship management |
| Calendar | `calendar-app.html` | Calendar application |
| Kanban | `kanban.html` | Kanban board |
| Chat | `chat.html` | Real-time chat interface |

### Pages
| Page | File | Description |
|------|------|-------------|
| Invoices | `invoices.html` | Invoice listing |
| Profile | `profile.html` | User profile |
| Company Profile | `profile-company.html` | Company profile |
| Social Profile | `profile-social.html` | Social media profile |
| Settings | `settings.html` | Account settings (tabbed) |
| Security | `security.html` | Security settings |

### Shop
| Page | File | Description |
|------|------|-------------|
| Products | `shop/products.html` | Product catalog |
| Cart | `shop/cart.html` | Shopping cart |
| Checkout | `shop/checkout.html` | Checkout flow |

### UI Showcase
| Page | File | Description |
|------|------|-------------|
| Components | `components.html` | All UI components demo |
| Cards | `cards.html` | Card variants |
| Tables | `tables.html` | Table styles |
| Forms Advanced | `forms-advanced.html` | Advanced form elements |
| Pricing | `pricing.html` | Pricing plans |
| FAQ | `faq.html` | FAQ with accordion |
| Timeline | `timeline.html` | Timeline view |
| Blank | `blank.html` | Blank starter page |

### Auth & Error Pages
| Page | File | Layout |
|------|------|--------|
| Login | `auth/login.html` | `auth.html` |
| Register | `auth/register.html` | `auth.html` |
| Forgot Password | `auth/forgot-password.html` | `auth.html` |
| Two-Factor | `auth/two-factor.html` | `auth.html` |
| 403 Forbidden | `errors/403.html` | `error.html` |
| 404 Not Found | `errors/404.html` | `error.html` |
| 500 Server Error | `errors/500.html` | `error.html` |
| Maintenance | `errors/maintenance.html` | `error.html` |

## Adding a New Page

1. Create `pages/my-page.html` extending the appropriate layout
2. Set `activeMenu` variable for sidebar highlighting
3. Add menu entry in `src/partials/sidebar.html`
4. Vite auto-discovers all `pages/**/*.html` files — no config change needed

## Adding a New Component

1. Use existing `bm-` CSS classes from CSS files
2. If a new component is needed, add styles following the `bm-` naming convention
3. Use CSS custom properties from `theme.css` for all colors — never hardcode
4. If the component needs JS behavior, add it to `app.js` and call its init in `DOMContentLoaded`

## Icon Set

- **Phosphor Icons** — The single icon set, loaded via jsDelivr CDN (web font)
- Usage: `<i class="ph ph-icon-name"></i>` or `<span class="ph ph-icon-name"></span>`
- Browse icons at: https://phosphoricons.com
