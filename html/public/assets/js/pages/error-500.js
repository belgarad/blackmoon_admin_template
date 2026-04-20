(function () {
  'use strict';
  var chars = 'ABCDEF0123456789';
  var id = '';
  for (var i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  document.getElementById('errId').textContent = id;
})();
