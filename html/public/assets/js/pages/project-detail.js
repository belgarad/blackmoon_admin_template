(function () {
  'use strict';
  window.switchTab = function(btn, panelId) {
    document.querySelectorAll('.proj-tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelectorAll('.proj-panel').forEach(function(p) { p.classList.remove('active'); });
    btn.classList.add('active');
    document.getElementById('panel-' + panelId).classList.add('active');
  };
})();
