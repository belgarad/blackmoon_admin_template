(function () {
  'use strict';
  window.filterProjects = function(query) {
    var q = query.toLowerCase();
    document.querySelectorAll('.proj-card').forEach(function(card) {
      var title = card.querySelector('.proj-card-title').textContent.toLowerCase();
      var desc = card.querySelector('.proj-card-desc').textContent.toLowerCase();
      card.style.display = (title.includes(q) || desc.includes(q)) ? '' : 'none';
    });
  };

  window.filterByStatus = function(status) {
    document.querySelectorAll('.proj-card').forEach(function(card) {
      if (!status) { card.style.display = ''; return; }
      card.style.display = card.dataset.status === status ? '' : 'none';
    });
  };
})();
