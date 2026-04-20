/* ================================================================
   BLACKMOON ADMIN KIT — i18n Module
   Lightweight vanilla-JS internationalisation
   Language files: /assets/js/lang/{code}.js
   ================================================================ */
(function () {
  'use strict';

  var LANG_KEY = 'admin-lang';
  var langs = {};
  var currentLang = localStorage.getItem(LANG_KEY) || 'en';

  /* ── Register a language dictionary ── */
  function registerLang(code, dict) {
    langs[code] = dict;
  }

  /* ── Core API ── */
  function getLang() {
    return currentLang;
  }

  function setLang(code) {
    if (!langs[code]) return;
    currentLang = code;
    localStorage.setItem(LANG_KEY, code);
    applyTranslations();
    document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang: code } }));
  }

  function t(key) {
    var dict = langs[currentLang] || langs['en'];
    return dict[key] || (langs['en'] && langs['en'][key]) || key;
  }

  /* ── Apply translations to DOM ── */
  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.dataset.i18n;
      var val = t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.textContent = val;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });

    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      el.title = t(el.dataset.i18nTitle);
    });

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.langBtn === currentLang);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTranslations();
  });

  /* ── Public API ── */
  window.i18n = {
    registerLang: registerLang,
    setLang: setLang,
    getLang: getLang,
    t: t
  };
})();
