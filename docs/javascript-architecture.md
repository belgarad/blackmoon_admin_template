# JavaScript Architecture

## Module Structure

BlackMoon Admin Kit uses vanilla JavaScript with IIFE modules. There are **4 core scripts** loaded on every page and **~39 per-page scripts** loaded conditionally.

### Core Scripts

| File | Global | Purpose |
|------|--------|---------|
| `app.js` | `window.App` | UI components, modals, toasts, datepicker, datagrid, validation, settings |
| `sidebar.js` | `window.SidebarManager` | Sidebar collapse/expand, mobile drawer, submenu toggle |
| `theme.js` | `window.ThemeManager` | Light/light-grey/dark theme switching |
| `i18n.js` | `window.i18n` | Internationalization (en, tr, de) |

### Page Scripts

Located in `public/assets/js/pages/`. Each page script is a self-contained IIFE that runs on `DOMContentLoaded`. Loaded via the `{% block scripts %}` block or the `pageJS` Nunjucks variable.

```
pages/
├── dashboard.js
├── analytics.js
├── calendar-app.js
├── chat.js
├── crm.js
├── settings.js
├── wizard-create-account.js
├── forms-advanced.js
└── ... (~39 files total)
```

## App API Reference

### Modals

```js
App.openModal('myModalId');
App.closeModal('myModalId');
```

### Toasts

```js
App.showToast({ type: 'success', title: 'Saved', message: 'Changes saved.', duration: 4000 });
App.toast.success('Title', 'Message');
App.toast.warning('Title', 'Message');
App.toast.danger('Title', 'Message');
App.toast.info('Title', 'Message');
```

### Form Validation

```js
// Manual validation with rules object
var valid = App.validate(formElement, {
  email:    { required: true, email: true },
  password: { required: true, minLength: 8 },
  confirm:  { required: true, match: 'password' }
});

// Build rules from HTML5 attributes (required, type=email, minlength, data-rule-match)
var rules = App.buildRulesFromDOM(formElement);
var valid = App.validate(formElement, rules);
```

**Auto-init**: Add `data-validate` to a `<form>` to auto-attach validation on submit.

### Skeleton Loading

```js
App.skeleton.show('#container', { lines: 4, type: 'text' }); // text | card | avatar
App.skeleton.hide('#container');
```

### Focus Management

```js
App.trapFocus(containerEl);    // Trap Tab cycling within container
App.releaseFocus(containerEl); // Release trap, restore previous focus
```

### Settings

```js
App.Settings.get('density');           // 'normal' | 'compact' | 'comfortable'
App.Settings.get('sidebarMode');       // 'fixed' | 'collapsed'
App.Settings.get('contentWidth');      // 'default' | 'full'
App.Settings.get('animations');        // true | false
App.Settings.get('rtl');               // true | false
App.Settings.set('rtl', true);         // Apply and persist
```

### Other Components

| API | Description |
|-----|-------------|
| `App.openCommand()` / `App.closeCommand()` | Command palette |
| `App.openDrawer(id)` / `App.closeDrawer(id)` | Generic drawers |
| `App.LoadingBar.start()` / `.finish()` | Top loading bar |
| `new App.DataGrid(el, config)` | Data grid component |
| `new App.Stepper(el, options)` | Step wizard with `onBeforeNext` validation |
| `App.datepicker(el, opts)` | Date picker |
| `App.initOTP()` | OTP input auto-advance |
| `App.initCounters()` | Animated number counters |
| `App.initCustomSelects()` | Custom select dropdowns |
| `App.LayoutManager.toggle()` | Toggle box/widescreen layout |

## Creating a Page Script

```js
// public/assets/js/pages/my-page.js
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    // Page-specific logic here
    var form = document.getElementById('myForm');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var rules = App.buildRulesFromDOM(form);
      if (App.validate(form, rules)) {
        App.toast.success('Success', 'Form submitted!');
      }
    });
  });
})();
```

Then in the page HTML:

```html
{% block scripts %}
<script src="{{ basePath }}assets/js/pages/my-page.js"></script>
{% endblock %}
```

Or use the `pageJS` variable: `{% set pageJS = "my-page" %}`.

## Event Delegation

The template uses event delegation for dynamic content. Core patterns:

- `document.addEventListener('click', ...)` in `initGlobalListeners()` for close-on-outside-click
- `document.addEventListener('keydown', ...)` for Escape key handling
- Data attributes (`data-tab`, `data-accordion`, `data-modal`, `data-validate`) for declarative initialization
