(function () {
  'use strict';
  window.addInvRow = function() {
    var tbody = document.querySelector('#invItemsTable tbody');
    var tr = document.createElement('tr');
    tr.innerHTML = '<td><input class="bm-input bm-input-sm" placeholder="Item description"></td>' +
      '<td><input class="bm-input bm-input-sm" type="number" value="1" min="1"></td>' +
      '<td><input class="bm-input bm-input-sm" type="number" value="0.00" step="0.01"></td>' +
      '<td><input class="bm-input bm-input-sm" type="number" value="18" min="0"></td>' +
      '<td class="bm-font-semibold">$0.00</td>' +
      '<td><button class="bm-btn-icon-xs" title="Remove" onclick="this.closest(\'tr\').remove()"><i class="ph ph-x bm-text-danger"></i></button></td>';
    tbody.appendChild(tr);
  };
})();
