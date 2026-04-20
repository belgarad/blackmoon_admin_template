(function () {
  'use strict';
  window.togglePwd = function(inputId, iconId) {
    var input = document.getElementById(inputId);
    var icon  = document.getElementById(iconId);
    if (input.type === 'password') {
      input.type = 'text';
      icon.textContent = 'visibility';
    } else {
      input.type = 'password';
      icon.textContent = 'visibility_off';
    }
  };

  window.handleSignIn = function(e) {
    e.preventDefault();
    var form = e.target;
    var valid = App.validate(form, {
      email:    { required: true, email: true, requiredMsg: 'Email is required.' },
      password: { required: true, minLength: 6, requiredMsg: 'Password is required.', minLengthMsg: 'At least 6 characters.' }
    });
    if (!valid) return;
    var btn = document.getElementById('signInBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="ph ph-circle-notch bm-text-md-spin"></i> Signing in';
    setTimeout(function() { window.location.href = '../dashboard.html'; }, 1200);
  };

  var spinStyle = document.createElement('style');
  spinStyle.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(spinStyle);
})();
