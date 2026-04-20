(function () {
  'use strict';
  var currentBilling = 'monthly';
  window.setBilling = function(type) {
    currentBilling = type;
    var monthly = type === 'monthly';
    document.getElementById('btnMonthly').classList.toggle('active', monthly);
    document.getElementById('btnAnnual').classList.toggle('active', !monthly);
    document.querySelectorAll('.price-val').forEach(function(el) {
      el.classList.add('switching');
      setTimeout(function() {
        el.textContent = monthly ? el.getAttribute('data-monthly') : el.getAttribute('data-annual');
        el.classList.remove('switching');
      }, 200);
    });
    document.querySelectorAll('.price-period').forEach(function(el) {
      el.textContent = monthly ? '/month' : '/month billed annually';
    });
    var note = document.getElementById('proBillingNote');
    if (note) note.textContent = monthly ? 'Billed monthly' : 'Billed annually — save 20%';
  };
})();
