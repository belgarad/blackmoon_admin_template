/* ── Two-Factor Auth Page ────────────────────────────────── */
(function() {
  'use strict';

  var cells = Array.from(document.querySelectorAll('.otp-cell'));
  var DEMO_CODE = '482916';
  var resendTimer = null;

  cells.forEach(function(cell, idx) {
    cell.addEventListener('input', function(e) {
      var v = e.target.value.replace(/\D/g, '');
      e.target.value = v;
      e.target.classList.toggle('filled', v !== '');
      if (v && idx < 5) cells[idx + 1].focus();
      checkComplete();
      document.getElementById('otpError').classList.add('bm-d-none');
    });

    cell.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace' && !e.target.value && idx > 0) {
        cells[idx - 1].value = '';
        cells[idx - 1].classList.remove('filled');
        cells[idx - 1].focus();
        checkComplete();
      }
      if (e.key === 'ArrowLeft' && idx > 0)  cells[idx - 1].focus();
      if (e.key === 'ArrowRight' && idx < 5) cells[idx + 1].focus();
    });

    cell.addEventListener('paste', function(e) {
      e.preventDefault();
      var text = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
      text.split('').forEach(function(ch, i) {
        if (cells[i]) { cells[i].value = ch; cells[i].classList.add('filled'); }
      });
      if (text.length > 0) cells[Math.min(text.length, 5)].focus();
      checkComplete();
    });
  });

  function checkComplete() {
    var code = cells.map(function(c) { return c.value; }).join('');
    document.getElementById('verifyBtn').disabled = code.length < 6;
  }

  window.verifyCode = function() {
    var code = cells.map(function(c) { return c.value; }).join('');
    var btn = document.getElementById('verifyBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="ph ph-circle-notch bm-text-md-spin"></i> Verifying...';

    setTimeout(function() {
      if (code === DEMO_CODE) {
        btn.innerHTML = '<i class="ph ph-check-circle bm-text-md"></i> Verified!';
        btn.style.background = 'var(--success)';
        setTimeout(function() { window.location.href = '../dashboard.html'; }, 1200);
      } else {
        cells.forEach(function(c) { c.classList.add('error'); });
        document.getElementById('otpError').classList.remove('bm-d-none');
        btn.innerHTML = 'Verify Code';
        btn.disabled = false;
        setTimeout(function() { cells.forEach(function(c) { c.classList.remove('error'); }); }, 700);
      }
    }, 1500);
  };

  function startCountdown(secs) {
    var resendBtn = document.getElementById('resendBtn');
    var countEl  = document.getElementById('countdown');
    resendBtn.disabled = true;
    resendBtn.style.opacity = '0.45';
    if (resendTimer) clearInterval(resendTimer);
    resendTimer = setInterval(function() {
      countEl.textContent = ' (' + secs + 's)';
      secs--;
      if (secs < 0) {
        clearInterval(resendTimer);
        countEl.textContent = '';
        resendBtn.disabled = false;
        resendBtn.style.opacity = '1';
      }
    }, 1000);
  }

  window.resendCode = function() {
    startCountdown(60);
    if (window.App) App.toast.success('Code sent', 'A new code was sent to +1 (###) ###-4829.');
  };

  window.switchMethod = function(m) {
    if (m === 'authenticator') {
      if (window.App) App.toast.info('Authenticator', 'Open your authenticator app and enter the 6-digit code.');
    } else {
      if (window.App) App.toast.info('Backup Code', 'Enter one of your saved backup codes below.');
    }
  };

  startCountdown(30);

})();
