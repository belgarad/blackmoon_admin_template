(function () {
  'use strict';
  document.querySelectorAll('[data-usrtab]').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.profile-tab').forEach(function(t) { t.classList.remove('active'); });
      document.querySelectorAll('.usr-tab-content').forEach(function(c) { c.classList.remove('active'); });
      tab.classList.add('active');
      document.getElementById('usrtab-' + tab.dataset.usrtab).classList.add('active');
    });
  });
})();
