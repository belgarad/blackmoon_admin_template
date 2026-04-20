# Components Reference

All UI components use the `bm-` CSS class prefix and are styled via CSS custom properties defined in `theme.css`. Interactive behaviors are handled by `app.js` (auto-initialized on `DOMContentLoaded`).

---

## Layout Components

### Sidebar (`.bm-sidebar`)
Collapsible navigation sidebar with submenu support.

| Feature | Description |
|---------|-------------|
| Width | 280px expanded, 80px collapsed |
| Position | Fixed left, full height |
| Mobile | Drawer mode with backdrop overlay |
| Collapse | Desktop-only, hover to expand |
| Submenus | Accordion-style with `bm-has-sub` / `bm-menu-sub` |

**Classes:**
- `.bm-sidebar` — Base sidebar container
- `.bm-sidebar-header` — Logo + toggle button area
- `.bm-sidebar-content` — Scrollable menu wrapper
- `.bm-sidebar-scrollable` — Inner scroll container with thin scrollbar
- `.bm-sidebar-toggle` — Collapse/expand button (positioned at sidebar edge)
- `.bm-sidebar-logo` — Logo link wrapper
- `.bm-logo-icon` — Logo icon box (primary background)
- `.bm-logo-text` — Full logo text (hidden on collapse)
- `.bm-logo-text-mini` — Mini logo text (shown on collapse)
- `.bm-drawer-open` — Forces sidebar visible (mobile drawer)
- `.bm-drawer-backdrop` — Overlay behind mobile drawer

**Menu Classes:**
- `.bm-menu` — Menu container (flex column)
- `.bm-menu-item` — Menu item wrapper
- `.bm-menu-link` — Clickable menu link (use `.active` for current page)
- `.bm-menu-icon` — Icon container
- `.bm-menu-title` — Link text label (supports `data-i18n` for translations)
- `.bm-menu-heading` — Section heading (uppercase, small)
- `.bm-menu-arrow` — Submenu expand/collapse arrow
- `.bm-has-sub` — Menu item with submenu (add `.open` to expand)
- `.bm-menu-sub` — Submenu container
- `.bm-sub-item` — Submenu item wrapper
- `.bm-menu-sub-link` — Submenu link (use `.active` for current)
- `.bm-menu-bullet` — Submenu bullet indicator

### Header (`.bm-header`)
Fixed top header bar with navigation and action buttons.

| Feature | Description |
|---------|-------------|
| Height | 70px (`--header-height`) |
| Position | Fixed top, adjusts for sidebar width |
| Content | Nav links, search, theme toggle, layout toggle, settings, notifications, user menu |

**Classes:**
- `.bm-header` — Base header
- `.bm-container-fixed` — Centered container inside header

**Header actions include:**
- Search button (`Ctrl+K` opens Command Palette)
- Theme toggle (cycles light → light-grey → dark)
- Layout toggle (via `App.LayoutManager.toggle()`)
- Settings trigger (opens settings drawer)
- Notification button with unread count badge
- User menu with avatar dropdown

### Footer (`.bm-footer`)
Simple page footer with copyright and nav links.

### Wrapper (`.bm-wrapper`)
Content area that adjusts for sidebar width.

**Body Classes:**
- `.bm-sidebar-fixed` — Enables fixed sidebar + wrapper padding
- `.bm-header-fixed` — Enables fixed header + top padding
- `.bm-sidebar-collapse` — Collapses sidebar to 80px

---

## UI Components

### Buttons (`.bm-btn`)
```html
<button class="bm-btn bm-btn-primary">Primary</button>
<button class="bm-btn bm-btn-secondary">Secondary</button>
<button class="bm-btn bm-btn-outline">Outline</button>
<button class="bm-btn bm-btn-ghost">Ghost</button>
<button class="bm-btn bm-btn-destructive">Destructive</button>
```

**Modifiers:**
- `.bm-btn-sm` — Small size
- `.bm-btn-lg` — Large size
- `.bm-btn-icon` — Square icon-only button (36px)

### Cards (`.bm-card`)
```html
<div class="bm-card">
  <div class="bm-card-header">
    <span class="bm-card-title">Title</span>
  </div>
  <div class="bm-card-body">Content</div>
  <div class="bm-card-footer">
    <button class="bm-btn bm-btn-primary">Save</button>
  </div>
</div>
```

### Stats Card (`.bm-stats-card`)
```html
<div class="bm-stats-card">
  <div class="bm-stats-card-icon bm-bg-primary-light">
    <i class="ph ph-users bm-text-lg-primary"></i>
  </div>
  <div class="bm-stats-card-value">2,847</div>
  <div class="bm-stats-card-label">Total Users</div>
  <div class="bm-stats-card-trend up">↑ 12.5%</div>
</div>
```

**Trend Classes:** `.up` (green), `.down` (red)

### Stats Card v2 (`.bm-stats-card-v2`)
Enhanced stat card with chart area and dropdown menu.
```html
<div class="bm-stats-card-v2">
  <div class="bm-stats-card-v2-content">
    <div class="bm-stats-card-v2-label">Total Revenue</div>
    <div class="bm-stats-card-v2-value" data-counter="84290" data-counter-prefix="$">$84,290</div>
    <div class="bm-stats-card-v2-footer">
      <span class="bm-stats-card-v2-trend up">
        <i class="ph ph-arrow-up bm-text-8xs"></i>12.5%
      </span>
      <span class="bm-stats-card-v2-compared">vs last month</span>
    </div>
  </div>
  <div id="spark-revenue"></div>
</div>
```

### Badges (`.bm-badge`)
```html
<span class="bm-badge bm-badge-primary">Admin</span>
<span class="bm-badge bm-badge-success">Active</span>
<span class="bm-badge bm-badge-warning">Pending</span>
<span class="bm-badge bm-badge-danger">Failed</span>
<span class="bm-badge bm-badge-info">Info</span>
```

### Avatars (`.bm-avatar`)
```html
<div class="bm-avatar bm-avatar-xs">JD</div>
<div class="bm-avatar bm-avatar-sm">JD</div>
<div class="bm-avatar bm-avatar-md">JD</div>
<div class="bm-avatar bm-avatar-lg">JD</div>
<div class="bm-avatar bm-avatar-xl">JD</div>
```

Sizes: xs (24px), sm (32px), md (40px), lg (48px), xl (64px)

**Avatar Group** (stacked):
```html
<div class="bm-avatar-group">
  <div class="bm-avatar bm-avatar-sm">JD</div>
  <div class="bm-avatar bm-avatar-sm">AB</div>
  <div class="bm-avatar-count bm-avatar bm-avatar-sm">+3</div>
</div>
```

### Tables (`.bm-table`)
```html
<div class="bm-card">
  <div class="bm-table-toolbar"><!-- filters --></div>
  <div class="bm-card-body">
    <table class="bm-table">
      <thead><tr><th>Column</th></tr></thead>
      <tbody><tr><td>Data</td></tr></tbody>
    </table>
  </div>
  <div class="bm-table-footer"><!-- pagination --></div>
</div>
```

**Variants:**
- `.bm-table-compact` — Smaller padding
- `.bm-table-striped` — Zebra striping
- `.bm-table-bordered` — Full borders
- `.bm-table-responsive` — Horizontal scroll wrapper

**Table sections:**
- `.bm-table-toolbar` — Filter bar above table
- `.bm-table-footer` — Pagination row below table
- `.bm-table-empty` — Empty state with icon

### DataGrid (`App.DataGrid`)
JS-powered dynamic data table with sorting, filtering, pagination, and row selection.
```javascript
new App.DataGrid(document.getElementById('myGrid'), {
  pageSize: 10,
  pageSizes: [5, 10, 25, 50],
  selectable: true,
  columns: [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status', render: function(val) { return '<span class="bm-badge bm-badge-success">' + val + '</span>'; } }
  ],
  data: [/* array of objects */],
  onRowClick: function(row, index) { /* handler */ }
});
```

### Form Elements
```html
<label class="bm-label">Label</label>
<input class="bm-input" type="text" placeholder="..." />
<select class="bm-select"><option>Option</option></select>
<input type="checkbox" class="bm-checkbox" />
<input type="radio" class="bm-radio" />
```

**Custom Select:** Native `<select class="bm-select">` elements are auto-replaced by `app.js` with a styled dropdown (`.bm-custom-select`). No extra markup needed.

**Switch Toggle:**
```html
<div class="bm-switch active" onclick="this.classList.toggle('active')"></div>
```

### Alerts (`.bm-alert`)
```html
<div class="bm-alert bm-alert-success">Success message</div>
<div class="bm-alert bm-alert-warning">Warning message</div>
<div class="bm-alert bm-alert-danger">Error message</div>
<div class="bm-alert bm-alert-info">Info message</div>
```

### Modals (`.bm-modal`)
```html
<div class="bm-modal-backdrop" id="myModal" style="display:none">
  <div class="bm-modal">
    <div class="bm-modal-header">
      <span class="bm-modal-title">Title</span>
      <button class="bm-btn bm-btn-ghost bm-btn-icon bm-btn-sm" onclick="App.closeModal('myModal')">
        <i class="ph ph-x"></i>
      </button>
    </div>
    <div class="bm-modal-body">Content</div>
    <div class="bm-modal-footer">
      <button class="bm-btn bm-btn-outline" onclick="App.closeModal('myModal')">Cancel</button>
      <button class="bm-btn bm-btn-primary">Save</button>
    </div>
  </div>
</div>
```

**JS API:** `App.openModal('myModal')` / `App.closeModal('myModal')`

### Drawers (`.bm-drawer`)
Slide-in panel from the right.
```html
<div class="bm-drawer-overlay" data-drawer-overlay="myDrawer"></div>
<div class="bm-drawer" id="myDrawer">
  <div class="bm-drawer-header">
    <span class="bm-drawer-title">Panel Title</span>
    <button class="bm-btn bm-btn-ghost bm-btn-icon bm-btn-sm" data-close-drawer="myDrawer">
      <i class="ph ph-x"></i>
    </button>
  </div>
  <div class="bm-drawer-body">Content</div>
  <div class="bm-drawer-footer">
    <button class="bm-btn bm-btn-primary">Save</button>
  </div>
</div>
```

**Trigger:** `<button data-open-drawer="myDrawer">Open</button>`

### Tabs (`.bm-tabs`)
```html
<div class="bm-tabs" data-tab-group="myTabs">
  <button class="bm-tab active" data-tab="tab1">Tab 1</button>
  <button class="bm-tab" data-tab="tab2">Tab 2</button>
</div>
<div data-tab-panel="myTabs" data-tab-content="tab1">Panel 1</div>
<div data-tab-panel="myTabs" data-tab-content="tab2" style="display:none">Panel 2</div>
```

Tab switching is auto-handled by `app.js` via `data-tab-group` / `data-tab` / `data-tab-panel` attributes.

### Accordion (`.bm-accordion`)
```html
<div class="bm-accordion">
  <div class="bm-accordion-item">
    <button class="bm-accordion-trigger">
      Question?
      <i class="ph ph-caret-down bm-accordion-icon"></i>
    </button>
    <div class="bm-accordion-content">
      <div class="bm-accordion-body">Answer.</div>
    </div>
  </div>
</div>
```

Single-open by default. Add `data-multi` on `.bm-accordion` for multi-open mode.

### Pagination (`.bm-pagination`)
```html
<div class="bm-pagination">
  <button class="bm-page-btn" disabled>‹</button>
  <button class="bm-page-btn active">1</button>
  <button class="bm-page-btn">2</button>
  <button class="bm-page-btn">›</button>
</div>
```

### Breadcrumb (`.bm-breadcrumb`)
```html
<nav class="bm-breadcrumb">
  <div class="bm-breadcrumb-item">
    <a class="bm-breadcrumb-link" href="#">Home</a>
    <span class="bm-breadcrumb-separator">/</span>
  </div>
  <div class="bm-breadcrumb-item">
    <span class="bm-breadcrumb-current">Current Page</span>
  </div>
</nav>
```

### Toast Notifications
Programmatic toast notifications via JS.
```javascript
App.toast.success('Saved!', 'Your changes have been saved.');
App.toast.warning('Warning', 'Please check your input.');
App.toast.danger('Error', 'Something went wrong.');
App.toast.info('Info', 'Processing your request.');
```

Types: `success`, `warning`, `danger`, `info`. Auto-dismiss after 4 seconds (configurable).

### Dropdown Menu (`.bm-dropdown`)
```html
<div class="bm-dropdown">
  <button class="bm-btn bm-btn-ghost bm-btn-icon" data-dropdown-trigger>
    <i class="ph ph-dots-three"></i>
  </button>
  <div class="bm-dropdown-menu">
    <a href="#" class="bm-dropdown-item">Edit</a>
    <a href="#" class="bm-dropdown-item">Delete</a>
  </div>
</div>
```

Auto-initialized via `data-dropdown-trigger`. Closes on outside click.

### Command Palette (`.bm-command-overlay`)
Global search interface (Ctrl+K / Cmd+K). Includes keyboard navigation (↑↓ arrows, Enter to select, Escape to close).

**JS API:** `App.openCommand()` / `App.closeCommand()`

### Tooltip (`.bm-tooltip-wrapper`)
```html
<div class="bm-tooltip-wrapper">
  <button class="bm-btn bm-btn-primary">Hover me</button>
  <div class="bm-tooltip">Tooltip text</div>
</div>
```

### Progress Bar (`.bm-progress`)
```html
<div class="bm-progress">
  <div class="bm-progress-bar" style="width: 60%"></div>
</div>
```

**Variants:** `.bm-progress-sm`, `.bm-progress-lg`, `.bm-progress-success`, `.bm-progress-warning`, `.bm-progress-danger`, `.bm-progress-striped`

### Skeleton Loading (`.bm-skeleton`)
```html
<div class="bm-skeleton bm-skeleton-title"></div>
<div class="bm-skeleton bm-skeleton-text"></div>
<div class="bm-skeleton bm-skeleton-avatar bm-avatar-md"></div>
```

### Empty State (`.bm-empty-state`)
```html
<div class="bm-empty-state">
  <div class="bm-empty-state-icon">
    <i class="ph ph-tray"></i>
  </div>
  <div class="bm-empty-state-title">No items found</div>
  <div class="bm-empty-state-description">Try adjusting your filters.</div>
</div>
```

### Loading Spinner (`.bm-spinner`)
```html
<div class="bm-spinner"></div>
```

### Loading Bar (`#bm-loading-bar`)
Top-of-page progress bar, auto-triggered on page navigation.

**JS API:** `App.LoadingBar.start()` / `App.LoadingBar.done()`

### Separator (`.bm-separator`)
```html
<div class="bm-separator"></div>         <!-- Horizontal -->
<div class="bm-separator-vertical"></div> <!-- Vertical -->
```

---

## Interactive Components (JS-powered)

These components are auto-initialized by `app.js` on `DOMContentLoaded`:

| Component | Trigger | Description |
|-----------|---------|-------------|
| Custom Select | `select.bm-select` | Native selects auto-wrapped with styled dropdown |
| Tabs | `[data-tab-group]` | Tab panel switching |
| Accordion | `.bm-accordion-trigger` | Collapsible panels |
| Drawer | `[data-open-drawer]` | Slide-in panels |
| Dropdown | `[data-dropdown-trigger]` | Context/action menus |
| Modal | `App.openModal(id)` | Dialog overlays |
| Datepicker | `[data-datepicker]` | Calendar date picker |
| Stepper | `[data-stepper]` | Multi-step wizard |
| Range Slider | `[data-range-slider]` | Custom range input |
| OTP Input | `[data-otp]` | One-time password input |
| Counter | `[data-counter]` | Animated number counter |
| Tooltip | `[data-tooltip]` | Hover tooltips |
| Popover | `[data-popover]` | Click popovers |
| Rating | `[data-rating]` | Star rating |
| Tags Input | `[data-tags]` | Tag/chip input |
| Clipboard | `[data-clipboard]` | Copy to clipboard |
| Image Input | `[data-image-input]` | Image upload preview |
| Password Meter | `[data-password-meter]` | Password strength indicator |
| Carousel | `[data-carousel]` | Image/content slider |
| Lightbox | `[data-lightbox]` | Image lightbox viewer |
| Scroll Top | Auto | Back-to-top button |

---

## Page Header Pattern

Standard page header used across all pages:
```html
<div class="bm-page-header">
  <div>
    <nav class="bm-breadcrumb bm-mb-xs">
      <div class="bm-breadcrumb-item">
        <a class="bm-breadcrumb-link" href="#">Home</a>
        <span class="bm-breadcrumb-separator">/</span>
      </div>
      <div class="bm-breadcrumb-item">
        <span class="bm-breadcrumb-current">Page Name</span>
      </div>
    </nav>
    <h1 class="bm-page-title">Page Title</h1>
    <p class="bm-page-subtitle">Description text.</p>
  </div>
  <div class="bm-page-actions">
    <button class="bm-btn bm-btn-outline bm-btn-sm">Export</button>
    <button class="bm-btn bm-btn-primary bm-btn-sm">Add New</button>
  </div>
</div>
```

---

## Accessibility (ARIA) Requirements

All interactive components follow WCAG 2.1 AA guidelines. See [accessibility.md](accessibility.md) for full details.

### Modal / Dialog

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `role` | `dialog` | Identifies as dialog |
| `aria-modal` | `true` | Indicates modal behavior |
| `aria-labelledby` | ID of title element | Associates title with dialog |

Focus is trapped inside the modal while open. Escape closes it. Focus returns to the trigger element on close.

### Dropdown / Menu

| Attribute | On | Purpose |
|-----------|-----|---------|
| `aria-haspopup` | trigger button | Indicates a popup will open |
| `aria-expanded` | trigger button | Reflects open/closed state |
| `role="menu"` | panel | Identifies as menu |

### Tables

| Attribute | On | Purpose |
|-----------|-----|---------|
| `scope="col"` | `<th>` in `<thead>` | Associates header with column |

### Forms

| Attribute | On | Purpose |
|-----------|-----|---------|
| `aria-invalid="true"` | invalid input | Marks field as invalid |
| `aria-describedby` | input | Links to error message element |

Error messages use `.bm-field-error` with auto-generated IDs.

### Buttons (Icon-only)

All icon-only buttons must have `aria-label`:

```html
<button class="bm-btn-icon" aria-label="Delete item">
  <i class="ph ph-trash"></i>
</button>
```

### Sidebar Navigation

| Attribute | On | Purpose |
|-----------|-----|---------|
| `aria-current="page"` | active link | Marks current page |
| `aria-expanded` | submenu toggle | Reflects submenu open/closed |
| `aria-label="Main navigation"` | `<nav>` | Identifies navigation region |

### Settings / Switches

```html
<button type="button" role="switch" aria-checked="true" aria-label="Animations">
```
