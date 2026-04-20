(function () {
  'use strict';
  window.toggleFileView = function() {
    var grid = document.getElementById('fileGrid');
    var icon = document.getElementById('viewToggleIcon');
    if (grid.classList.contains('fm-file-list-view')) {
      grid.classList.remove('fm-file-list-view');
      icon.textContent = 'grid_view';
    } else {
      grid.classList.add('fm-file-list-view');
      icon.textContent = 'view_list';
    }
  };

  window.filterFiles = function(query) {
    var q = query.toLowerCase();
    document.querySelectorAll('.fm-file-card').forEach(function(card) {
      var name = card.querySelector('.fm-file-name').textContent.toLowerCase();
      card.style.display = name.includes(q) ? '' : 'none';
    });
  };

  window.filterByType = function(type) {
    document.querySelectorAll('.fm-file-card').forEach(function(card) {
      if (!type) { card.style.display = ''; return; }
      card.style.display = card.dataset.type === type ? '' : 'none';
    });
  };

  window.sortFiles = function(by) {
    App.toast.info('Sort', 'Sorting by ' + by);
  };
})();
