(function () {
  'use strict';
  window.filterTimeline = function(type) {
    document.querySelectorAll('[data-tl-filter]').forEach(function(btn) {
      var active = btn.getAttribute('data-tl-filter') === type;
      btn.className = 'bm-btn bm-btn-sm ' + (active ? 'bm-btn-primary' : 'bm-btn-outline');
    });
    document.querySelectorAll('#iconTimeline .bm-timeline-item').forEach(function(item) {
      var match = type === 'all' || item.getAttribute('data-tl-type') === type;
      item.setAttribute('data-hidden', match ? 'false' : 'true');
    });
  };
})();
