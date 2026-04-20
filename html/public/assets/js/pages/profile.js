(function () {
  'use strict';
  document.querySelectorAll('[data-profile-tab]').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.profile-tab').forEach(function(t) { t.classList.remove('active'); });
      document.querySelectorAll('.profile-tab-content').forEach(function(c) { c.classList.remove('active'); });
      tab.classList.add('active');
      document.getElementById('tab-' + tab.dataset.profileTab).classList.add('active');
    });
  });
})();
