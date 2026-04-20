/* ── Activity Feed Page ──────────────────────────────────── */
(function() {
  'use strict';

  // Filter chips — toggle active & filter timeline items
  document.querySelectorAll('#filterChips .bm-chip').forEach(function(chip) {
    chip.addEventListener('click', function() {
      document.querySelectorAll('#filterChips .bm-chip').forEach(function(c) { c.classList.remove('active'); });
      chip.classList.add('active');
      var filter = chip.dataset.filter;
      document.querySelectorAll('.bm-timeline-item').forEach(function(item) {
        if (filter === 'all' || item.dataset.type === filter) {
          item.classList.remove('bm-d-none');
        } else {
          item.classList.add('bm-d-none');
        }
      });
    });
  });

})();
