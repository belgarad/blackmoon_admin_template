/**
 * Theme Manager — Light / Light Grey / Dark cycle with localStorage + system detection
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'admin-theme';
  const THEMES = ['light', 'light-grey', 'dark'];

  var ICONS  = { 'light': 'ph-sun',           'light-grey': 'ph-sun-horizon',    'dark': 'ph-moon' };
  var LABELS = { 'light': 'Light Mode',        'light-grey': 'Light Grey Mode',   'dark': 'Dark Mode' };
  var LABEL_KEYS = { 'light': 'label.lightMode', 'light-grey': 'label.lightGreyMode', 'dark': 'label.darkMode' };

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function loadTheme() {
    var saved = localStorage.getItem(STORAGE_KEY);
    return THEMES.indexOf(saved) !== -1 ? saved : 'light-grey';
  }

  function applyTheme(theme) {
    // Remove all theme classes, then add the active one (except 'light' which is :root default)
    document.documentElement.classList.remove('dark', 'light-grey');
    if (theme === 'dark')       document.documentElement.classList.add('dark');
    if (theme === 'light-grey') document.documentElement.classList.add('light-grey');

    // Update icon elements — swap Phosphor icon class (ph-moon / ph-sun / ph-sun-dim)
    var iconClass = ICONS[theme] || 'ph-sun';
    document.querySelectorAll('[data-theme-icon]').forEach(function (el) {
      el.className = el.className.replace(/\bph-[\w-]+\b/g, iconClass);
    });
    // Update label elements
    document.querySelectorAll('[data-theme-label]').forEach(function (el) {
      var key = LABEL_KEYS[theme] || 'label.lightMode';
      el.textContent = (window.i18n && window.i18n.t) ? window.i18n.t(key) : (LABELS[theme] || 'Light Mode');
    });
  }

  function toggleTheme() {
    var current = loadTheme();
    var idx     = THEMES.indexOf(current);
    var next    = THEMES[(idx + 1) % THEMES.length];
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  // Apply on load
  applyTheme(loadTheme());

  // Listen for system changes (only when no preference saved)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Re-apply theme labels when language changes
  document.addEventListener('i18n:changed', function () {
    var theme = loadTheme();
    document.querySelectorAll('[data-theme-label]').forEach(function (el) {
      var key = LABEL_KEYS[theme] || 'label.lightMode';
      el.textContent = (window.i18n && window.i18n.t) ? window.i18n.t(key) : (LABELS[theme] || 'Light Mode');
    });
  });

  // Expose globally
  window.ThemeManager = { toggle: toggleTheme };
})();
