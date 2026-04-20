(function () {
  'use strict';
  var grid = document.getElementById('cntGrid');
  document.querySelectorAll('.cnt-view-toggle').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.cnt-view-toggle').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      grid.classList.toggle('cnt-list', btn.dataset.view === 'list');
    });
  });
})();
