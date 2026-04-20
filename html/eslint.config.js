import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        console: 'readonly',
        navigator: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        HTMLElement: 'readonly',
        Element: 'readonly',
        Event: 'readonly',
        KeyboardEvent: 'readonly',
        MutationObserver: 'readonly',
        IntersectionObserver: 'readonly',
        ResizeObserver: 'readonly',
        FileReader: 'readonly',
        FormData: 'readonly',
        URLSearchParams: 'readonly',
        fetch: 'readonly',
        alert: 'readonly',
        confirm: 'readonly',
        getComputedStyle: 'readonly',
        matchMedia: 'readonly',
        history: 'readonly',
        location: 'readonly',
        CustomEvent: 'readonly',
        App: 'readonly',
        SidebarManager: 'readonly',
        ThemeManager: 'readonly',
        i18n: 'readonly',
        ChartHelpers: 'readonly',
        Chart: 'readonly',
        flatpickr: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': 'off',
      'no-redeclare': 'warn',
      'no-useless-assignment': 'warn'
    }
  },
  {
    ignores: ['dist/**', 'node_modules/**']
  }
];
