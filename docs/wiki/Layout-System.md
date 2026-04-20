# Layout System

The BlackMoon Admin Kit layout follows the  pattern: fixed sidebar + fixed header + scrollable content area. The layout is implemented in Nunjucks templates with shared partials.

## Architecture

```
┌─────────────────────────────────────────────┐
│              LOADING BAR (3px)              │
├─────────────────────────────────────────────┤
│                HEADER (70px)                │
├────────────┬────────────────────────────────┤
│            │                                │
│  SIDEBAR   │         CONTENT                │
│  (280px)   │    (bm-container-fixed)        │
│            │       max-width: 1280px        │
│            │                                │
│            ├────────────────────────────────┤
│            │         FOOTER                 │
└────────────┴────────────────────────────────┘
```

## Template Structure

The layout is composed from Nunjucks partials in `src/`:

```
src/
├── layouts/
│   ├── base.html       ← Main layout (sidebar + header + content + footer)
│   ├── auth.html       ← Auth layout (brand panel + form panel, no sidebar)
│   └── error.html      ← Error layout (minimal, no sidebar/header)
└── partials/
    ├── head.html       ← <meta>, CSS links
    ├── header.html     ← Top header bar
    ├── sidebar.html    ← Navigation sidebar with menus
    ├── footer.html     ← Page footer
    ├── overlays.html   ← User menu, notifications, command palette, settings drawer
    └── scripts.html    ← JS file includes (i18n, theme, sidebar, app)
```

### base.html structure
```html
<body class="bm-sidebar-fixed bm-header-fixed">
  <a href="#content" class="bm-skip-link">Skip to main content</a>
  <div id="sidebarBackdrop" class="bm-drawer-backdrop bm-d-none"></div>
  <div class="bm-flex-grow">
    {% include "partials/sidebar.html" %}
    <div class="bm-wrapper">
      {% include "partials/header.html" %}
      <main id="content">
        <div class="bm-container-fixed bm-py-nav">
          {% block content %}{% endblock %}
        </div>
      </main>
      {% include "partials/footer.html" %}
    </div>
  </div>
  {% include "partials/overlays.html" %}
  {% include "partials/scripts.html" %}
</body>
```

## Body Classes

Apply these to `<body>` (set in `base.html` by default):

| Class | Description |
|-------|-------------|
| `bm-sidebar-fixed` | Fixed sidebar, wrapper gets left padding |
| `bm-header-fixed` | Fixed header, wrapper gets top padding |
| `bm-sidebar-collapse` | Sidebar shrinks to 80px, expands on hover |

## CSS Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--sidebar-width` | `280px` | Current sidebar width |
| `--sidebar-width-collapse` | `80px` | Collapsed sidebar width |
| `--sidebar-default-width` | `280px` | Full sidebar width |
| `--sidebar-transition-duration` | `0.3s` | Collapse/expand transition speed |
| `--sidebar-transition-timing` | `ease` | Transition timing function |
| `--header-height` | `70px` | Header height |

## Sidebar Behavior

### Desktop (≥1024px)
- Sidebar is visible by default
- Toggle collapse with the `bm-sidebar-toggle` button
- Collapsed state: sidebar shrinks to 80px, menu titles/headings hide
- Hover over collapsed sidebar to temporarily expand
- Collapse state is saved to `localStorage` (`admin-sidebar-collapsed`)
- Collapse icon rotates 180° when collapsed

### Mobile (<1024px)
- Sidebar is hidden by default
- Opens as a **drawer** with the `bm-drawer-open` class
- A backdrop overlay (`bm-drawer-backdrop`) covers the content
- Clicking the backdrop or resizing to desktop closes the drawer
- Mobile hamburger button (`#mobileToggle`) shown only on mobile

### Submenus
- Menu items with children use `.bm-has-sub`
- Click toggles the `.open` class to expand/collapse `.bm-menu-sub`
- Arrow icons: `add` (closed) / `remove` (open)
- Active page auto-opens parent submenu on load

## Header Features

The header provides:

| Feature | Element | Description |
|---------|---------|-------------|
| Mobile toggle | `#mobileToggle` | Hamburger button (hidden on desktop) |
| Navigation | `nav` links | Quick links to Dashboard, Analytics, Users, Apps |
| Search | `#searchBtn` | Opens Command Palette (Ctrl+K) |
| Theme toggle | `ThemeManager.toggle()` | Cycles light → light-grey → dark |
| Layout toggle | `App.LayoutManager.toggle()` | Toggle layout mode |
| Settings | `#settingsTrigger` | Opens settings drawer |
| Notifications | `#notifTrigger` | Notification panel with unread count |
| User menu | `#userMenuTrigger` | Dropdown with profile, settings, sign out |

## Container

`.bm-container-fixed` provides a centered, max-width container:

| Viewport | Behavior |
|----------|----------|
| All | 100% width, horizontal padding |
| ≥1280px | 1280px max-width, 30px padding, auto margins |

## Responsive Breakpoints

| Breakpoint | Usage |
|------------|-------|
| `<1024px` | Mobile: sidebar hidden, drawer mode, header nav hidden, mobile toggle shown |
| `≥1024px` | Desktop: sidebar visible, collapse toggle available, header nav shown |
| `≥1280px` | Container uses max-width |

## Auth Layout

Used for login, register, forgot-password, two-factor pages.

```
┌──────────────────────┬──────────────────────┐
│                      │                      │
│    BRAND PANEL       │    FORM PANEL        │
│    (42% width)       │    (58% width)       │
│                      │                      │
│  Gradient background │  Theme toggle        │
│  Logo + headline     │  Form content        │
│  Feature list        │  Footer links        │
│  Decorative circles  │                      │
│                      │                      │
└──────────────────────┴──────────────────────┘
```

- Brand panel has configurable gradient via `{{ brandGradient }}`
- Decorative SVG circles for visual interest
- Form panel includes theme toggle button
- Responsive: stacks vertically on mobile

## Error Layout

Minimal layout for 403, 404, 500, and maintenance pages. No sidebar or header — just CSS links + error content + theme script.

## Overlay Components

Loaded via `overlays.html` partial, these are fixed-position panels:

| Component | Trigger | Description |
|-----------|---------|-------------|
| User Menu | Click avatar area | Profile links, theme switch, sign out |
| Notification Panel | Click bell icon | Notification list with unread indicators |
| Command Palette | Ctrl+K or search button | Global search with keyboard navigation |
| Settings Drawer | Click tune icon | App appearance settings |

## Page-Specific CSS & JS (Opt-in Pattern)

Pages can opt into additional stylesheets and scripts via Nunjucks variables.

### Page CSS

Set the `pageStyles` variable to load the shared `page-styles.scss` bundle:

```html
{% extends "layouts/base.html" %}
{% set pageStyles = true %}
```

For page-specific CSS, set `pageCSS` to load a file from `src/scss/pages/`:

```html
{% set pageCSS = "calendar-app" %}
{# Loads: /src/scss/pages/calendar-app.scss #}
```

### Page JS

Set `pageJS` to auto-load a page script from `public/assets/js/pages/`:

```html
{% set pageJS = "dashboard" %}
{# Loads: /assets/js/pages/dashboard.js #}
```

Or manually include scripts in the `{% block scripts %}` block:

```html
{% block scripts %}
<script src="{{ basePath }}assets/js/pages/my-page.js"></script>
{% endblock %}
```

### Available Nunjucks Variables

| Variable | Type | Purpose |
|----------|------|---------|
| `title` | string | Page `<title>` tag |
| `activeMenu` | string | Sidebar item to highlight |
| `basePath` | string | Relative path prefix (`""` or `"../"`) |
| `pageStyles` | boolean | Load shared `page-styles.scss` |
| `pageCSS` | string | Page-specific SCSS file name |
| `pageJS` | string | Page-specific JS file name |
| `pageDescription` | string | SEO meta description |
| `pageKeywords` | string | SEO meta keywords |
| `pageUrl` | string | Canonical URL |
| `pageImage` | string | OG/Twitter image URL |

### Available Blocks

| Block | Layout | Purpose |
|-------|--------|---------|
| `headExtra` | All | Additional `<head>` content |
| `content` | All | Main page content |
| `brand` | auth | Auth page brand panel |
| `scripts` | All | Additional scripts before `</body>` |

## Nunjucks Macros

Reusable macros are in `src/partials/macros/`:

| Macro | File | Usage |
|-------|------|-------|
| `emptyState` | `macros/empty-state.html` | Empty state placeholder with icon, title, description, action |

```html
{% from "partials/macros/empty-state.html" import emptyState %}
{{ emptyState("search_off", "No results found", "Try adjusting your filters.", "Clear Filters", "#") }}
```
