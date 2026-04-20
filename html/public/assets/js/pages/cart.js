/* ── Cart Page ───────────────────────────────────────────── */
(function() {
  'use strict';

  window.changeQty = function(btn, delta) {
    var input = btn.parentElement.querySelector('.qty-val');
    var val = parseInt(input.value) + delta;
    if (val >= 1) { input.value = val; recalc(); }
  };

  window.removeItem = function(btn) {
    var item = btn.closest('.cart-item');
    item.style.opacity = '0';
    item.style.transition = 'opacity 200ms';
    setTimeout(function() { item.remove(); App.toast.info('Removed', 'Item removed from cart.'); }, 200);
  };

  window.recalc = function() {
    App.toast.info('Cart updated', 'Totals have been recalculated.');
  };

})();
