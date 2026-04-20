/* ── Forms Advanced Page ─────────────────────────────────── */
(function() {
  'use strict';

  // Overlay demo
  window.blockDemo = function() { App.overlay.show('#overlayDemoCard', 'Please wait...'); };
  window.unblockDemo = function() { App.overlay.hide('#overlayDemoCard'); };

  // Confirm demos
  window.showDeleteConfirm = function() {
    App.confirm({
      title: 'Delete this item?',
      text: 'This action cannot be undone. All associated data will be permanently removed.',
      type: 'danger',
      confirmText: 'Yes, delete it',
      onConfirm: function() { App.toast.success('Deleted!', 'The item has been permanently deleted.'); }
    });
  };

  window.showWarningConfirm = function() {
    App.confirm({
      title: 'Perform this action?',
      text: 'This will affect all users in your organization. Proceed with caution.',
      type: 'warning',
      confirmText: 'Proceed',
      onConfirm: function() { App.toast.warning('Action taken', 'The operation completed.'); }
    });
  };

  window.showInfoConfirm = function() {
    App.confirm({
      title: 'Update available',
      text: 'A new version is available. Would you like to update now?',
      type: 'info',
      confirmText: 'Update now',
      cancelText: 'Later',
      onConfirm: function() { App.toast.info('Updating...', 'The system will restart shortly.'); }
    });
  };

  // Form validation – uses App.validate with rules built from HTML attributes
  var advForm = document.getElementById('advValidationForm');
  if (advForm) {
    advForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var rules = App.buildRulesFromDOM(advForm);
      if (App.validate(advForm, rules)) {
        App.toast.success('Form submitted', 'All fields are valid!');
      }
    });
    advForm.addEventListener('input', function(e) {
      var el = e.target;
      if (!el.name) return;
      var field = el.closest('.bm-field');
      if (field && field.classList.contains('invalid')) {
        var errorEl = field.querySelector('.bm-field-error');
        if (errorEl) errorEl.textContent = '';
        field.classList.remove('invalid', 'valid');
        el.removeAttribute('aria-invalid');
      }
    });
  }

  // Datepicker init
  App.initDatepickers && App.initDatepickers();

})();
