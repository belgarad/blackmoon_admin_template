/* ── Register Page ───────────────────────────────────────── */
(function() {
  'use strict';

  window.togglePwd = function(inputId, iconId) {
    var input = document.getElementById(inputId);
    var icon  = document.getElementById(iconId);
    if (input.type === 'password') { input.type = 'text'; icon.textContent = 'visibility'; }
    else { input.type = 'password'; icon.textContent = 'visibility_off'; }
  };

  var strColors = ['', '#E7505A', '#E87E04', '#3598DC', '#26C281'];
  var strLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  window.updateStrength = function(pw) {
    var score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    var s = Math.min(4, Math.ceil(score * 0.8));
    if (!pw) s = 0;
    for (var i = 1; i <= 4; i++) {
      var el = document.getElementById('str' + i);
      el.style.width = (i <= s ? '100%' : '0%');
      el.style.background = strColors[s];
    }
    document.getElementById('strLabel').textContent = pw ? strLabels[s] : '';
    document.getElementById('strLabel').style.color = strColors[s];
  };

  window.handleRegister = function(e) {
    e.preventDefault();
    var form = e.target;
    var valid = App.validate(form, {
      first_name: { required: true, requiredMsg: 'First name is required.' },
      last_name:  { required: true, requiredMsg: 'Last name is required.' },
      email:      { required: true, email: true, requiredMsg: 'Email is required.' },
      password:   { required: true, minLength: 8, requiredMsg: 'Password is required.', minLengthMsg: 'At least 8 characters.' },
      confirm_password: { required: true, match: 'password', requiredMsg: 'Please confirm your password.', matchMsg: 'Passwords do not match.' },
      terms:      { required: true, requiredMsg: 'You must agree to the terms.' }
    });
    if (!valid) return;
    var btn = document.getElementById('registerBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="ph ph-circle-notch bm-text-md-spin"></i> Creating account...';
    setTimeout(function() { window.location.href = '../dashboard.html'; }, 1400);
  };

})();
