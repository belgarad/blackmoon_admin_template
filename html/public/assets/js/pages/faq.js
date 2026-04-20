/* ── FAQ Page ────────────────────────────────────────────── */
(function() {
  'use strict';

  window.filterFaq = function(cat) {
    document.querySelectorAll('[data-faq-cat]').forEach(function(btn) {
      var active = btn.getAttribute('data-faq-cat') === cat;
      btn.className = 'bm-btn bm-btn-sm ' + (active ? 'bm-btn-primary' : 'bm-btn-outline');
    });
    document.querySelectorAll('[data-faq-section]').forEach(function(section) {
      section.style.display = (cat === 'all' || section.getAttribute('data-faq-section') === cat) ? '' : 'none';
    });
    document.querySelectorAll('.bm-accordion-item').forEach(function(i) { i.style.display = ''; });
    document.getElementById('faqSearch').value = '';
    document.getElementById('faqNoResults').classList.add('bm-d-none');
  };

  window.searchFaq = function(q) {
    q = q.trim().toLowerCase();
    var matched = 0;
    document.querySelectorAll('[data-faq-section]').forEach(function(s) { s.style.display = ''; });
    document.querySelectorAll('[data-faq-cat]').forEach(function(btn) { btn.className = 'bm-btn bm-btn-sm bm-btn-outline'; });
    var allBtn = document.querySelector('[data-faq-cat="all"]');
    if (allBtn) allBtn.className = 'bm-btn bm-btn-sm bm-btn-primary';
    document.querySelectorAll('.bm-accordion-item').forEach(function(item) {
      var triggerText = (item.querySelector('.bm-accordion-trigger') || {}).textContent || '';
      var bodyText = (item.querySelector('.bm-accordion-body') || {}).textContent || '';
      var show = !q || triggerText.toLowerCase().includes(q) || bodyText.toLowerCase().includes(q);
      item.style.display = show ? '' : 'none';
      if (show) matched++;
    });
    document.querySelectorAll('[data-faq-section]').forEach(function(section) {
      var hasVisible = Array.from(section.querySelectorAll('.bm-accordion-item')).some(function(i) { return i.style.display !== 'none'; });
      section.style.display = hasVisible ? '' : 'none';
    });
    var noRes = document.getElementById('faqNoResults');
    if (noRes) { if (!q || matched > 0) { noRes.classList.add('bm-d-none'); } else { noRes.classList.remove('bm-d-none'); } }
  };

  window.setFaqSearch = function(q) {
    document.getElementById('faqSearch').value = q;
    searchFaq(q);
    document.getElementById('faqSearch').focus();
  };

  window.openFaqItem = function(id) {
    filterFaq('all');
    var item = document.getElementById(id);
    if (item) {
      item.classList.add('open');
      setTimeout(function() { item.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 80);
    }
    return false;
  };

})();
