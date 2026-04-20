/* ── Products Page ───────────────────────────────────────── */
(function() {
  'use strict';

  // Color swatches
  document.querySelectorAll('.filter-color-swatch').forEach(function(sw) {
    sw.addEventListener('click', function() {
      document.querySelectorAll('.filter-color-swatch').forEach(function(s) { s.classList.remove('active'); });
      sw.classList.add('active');
    });
  });

  window.toggleWish = function(el) {
    el.classList.toggle('active');
    var icon = el.querySelector('span');
    if (el.classList.contains('active')) {
      icon.textContent = 'favorite';
      icon.style.color = 'var(--danger)';
      App.toast.success('Saved!', 'Added to your wishlist.');
    } else {
      icon.textContent = 'favorite_border';
      icon.style.color = '';
      App.toast.info('Removed', 'Removed from wishlist.');
    }
  };

  window.addToCart = function(name) {
    App.toast.success('Added to cart', name + ' has been added to your cart.');
  };

  window.setView = function(v, btn) {
    document.getElementById('gridViewBtn').className = v === 'grid' ? 'bm-btn bm-btn-primary bm-btn-sm bm-btn-icon' : 'bm-btn bm-btn-ghost bm-btn-sm bm-btn-icon';
    document.getElementById('listViewBtn').className = v === 'list' ? 'bm-btn bm-btn-primary bm-btn-sm bm-btn-icon' : 'bm-btn bm-btn-ghost bm-btn-sm bm-btn-icon';
    document.getElementById('productGrid').style.gridTemplateColumns = v === 'list' ? '1fr' : 'repeat(3,1fr)';
  };

  window.filterProducts = function(q) {
    document.querySelectorAll('.product-card').forEach(function(card) {
      var name = card.querySelector('.product-name').textContent.toLowerCase();
      card.style.display = name.includes(q.toLowerCase()) ? '' : 'none';
    });
  };

})();
