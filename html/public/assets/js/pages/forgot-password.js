(function () {
  'use strict';
  window.handleReset = function(e) {
    e.preventDefault();
    var form = e.target;
    var valid = App.validate(form, {
      email: { required: true, email: true, requiredMsg: 'Please enter your email.', emailMsg: 'Enter a valid email address.' }
    });
    if (!valid) return;
    var email = document.getElementById('email').value;
    var btn = document.getElementById('resetBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="ph ph-circle-notch bm-text-md-spin"></i> Sending...';
    setTimeout(function() {
      document.getElementById('sentEmail').textContent = email;
      document.getElementById('stateForm').classList.add('bm-d-none');
      document.getElementById('stateSuccess').classList.remove('bm-d-none');
    }, 1200);
  };
  window.resend = function() {
    var btn = document.querySelector('#stateSuccess button');
    btn.textContent = 'Sent!';
    btn.disabled = true;
    setTimeout(function() { btn.textContent = 'Resend email'; btn.disabled = false; }, 3000);
  };
})();
