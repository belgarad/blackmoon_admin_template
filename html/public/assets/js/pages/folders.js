(function () {
  'use strict';
  window.filterFolders = function(query) {
    var q = query.toLowerCase();
    document.querySelectorAll('.fm-folder-card-lg').forEach(function(card) {
      var name = card.querySelector('.fm-folder-name').textContent.toLowerCase();
      card.style.display = name.includes(q) ? '' : 'none';
    });
  };

  window.sortFolders = function(by) {
    App.toast.info('Sort', 'Sorting folders by ' + by);
  };
})();
