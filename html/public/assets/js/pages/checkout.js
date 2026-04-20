/* ── Checkout Page ───────────────────────────────────────── */
(function() {
  'use strict';

  var currentStep = 1;

  window.goStep = function(n) {
    for (var i = 1; i <= 4; i++) {
      var nav = document.getElementById('sNav' + i);
      var num = document.getElementById('sNum' + i);
      var panel = document.getElementById('panel' + i);
      nav.classList.remove('active', 'done');
      panel.classList.remove('active');
      if (i < n) {
        nav.classList.add('done');
        num.innerHTML = '<i class="ph ph-check bm-text-md"></i>';
      } else if (i === n) {
        nav.classList.add('active');
        num.textContent = i;
        panel.classList.add('active');
      } else {
        num.textContent = i;
      }
    }
    currentStep = n;
    document.getElementById('content').scrollTop = 0;
  };

  window.selectShip = function(el) {
    document.querySelectorAll('.co-panel#panel1 .pay-opt').forEach(function(o) { o.classList.remove('selected'); });
    el.classList.add('selected');
  };

  window.selectPay = function(el) {
    document.querySelectorAll('.co-panel#panel2 .pay-opt').forEach(function(o) { o.classList.remove('selected'); });
    el.classList.add('selected');
  };

  window.placeOrder = function() {
    var btn = document.getElementById('placeBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="ph ph-circle-notch bm-text-md-spin"></i> Processing…';
    setTimeout(function() {
      goStep(4);
      App.toast.success('Order confirmed!', 'Order #ORD-28471 placed successfully.');
    }, 2200);
  };

})();
