(function () {
  'use strict';
  window.stepTo = function(n) {
    document.querySelectorAll('.bm-stepper-item').forEach(function(item) {
      var s = parseInt(item.dataset.step);
      item.classList.remove('active', 'completed');
      if (s < n) item.classList.add('completed');
      if (s === n) item.classList.add('active');
    });
    document.querySelectorAll('.bm-stepper-content').forEach(function(c) {
      c.classList.remove('active');
      if (parseInt(c.dataset.step) === n) c.classList.add('active');
    });
  };
})();
