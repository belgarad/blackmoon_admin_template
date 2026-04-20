# Accessibility (WCAG 2.1 AA)

BlackMoon Admin Kit targets **WCAG 2.1 Level AA** compliance.

## Semantic HTML & ARIA

### Landmarks

| Element | Role | Location |
|---------|------|----------|
| `<nav aria-label="Main navigation">` | Navigation | Sidebar |
| `<header>` (`.bm-header`) | Banner | Top bar |
| `<main>` | Main content | Page wrapper |
| `<footer>` | Content info | Footer |

### ARIA Attributes

- **`aria-expanded`**: Applied to sidebar submenu toggles, user menu trigger, notification trigger, settings trigger, mobile menu toggle. Synced in JS on state change.
- **`aria-current="page"`**: Set on the active sidebar link.
- **`aria-haspopup`**: Set on buttons that open menus (`#userMenuTrigger`, `#notifTrigger`, `#settingsTrigger`).
- **`aria-modal="true"`**: Applied to modal dialogs, command palette, and settings drawer.
- **`aria-label`**: All icon-only buttons have descriptive labels.
- **`aria-hidden="true"`**: Backdrop overlays and decorative elements.
- **`aria-live="polite"`**: Live region (`#bm-live`) for toast announcements to screen readers.

## Keyboard Navigation

### Focus Management

- **Focus trapping**: Modals, command palette, and settings drawer trap focus within the overlay while open.
- **Focus restoration**: When an overlay closes, focus returns to the element that triggered it.
- **`:focus-visible`**: A 2px ring outline (using `--ring` token) appears only for keyboard navigation, not mouse clicks.

### API

```js
App.trapFocus(container);    // Trap Tab/Shift+Tab cycling within container
App.releaseFocus(container); // Release trap and restore focus
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl+K` / `⌘+K` | Open command palette |
| `Escape` | Close any open modal/overlay/command palette |
| `Tab` / `Shift+Tab` | Navigate focusable elements (trapped in overlays) |

## Form Validation

- Fields use `aria-invalid="true"` when validation fails.
- Error messages linked via `aria-describedby` to the input.
- Error elements have unique `id` attributes auto-generated from field names.

## Reduced Motion

The template respects `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Users can also disable animations via the Settings panel toggle.

## Screen Reader Support

- **`.sr-only`** utility class: Hides content visually but keeps it accessible to screen readers.
- **Live region**: `<div id="bm-live" aria-live="polite" class="sr-only">` in base layout announces toast notifications.
- **Toast messages**: Automatically announced via the live region when displayed.

## RTL Support

The layout uses CSS logical properties (`margin-inline-start`, `padding-inline-start`, `border-inline-end`, `inset-inline-start`). Toggle RTL via:

- Settings panel → "RTL Direction" switch
- Programmatically: `App.Settings.set('rtl', true)`

This sets `dir="rtl"` on `<html>`, with additional overrides for chevron icons and drawer positions.
