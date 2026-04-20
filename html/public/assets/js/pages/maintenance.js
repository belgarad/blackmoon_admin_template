(function () {
  'use strict';
  var endTime = Date.now() + (2 * 3600 + 47 * 60 + 33) * 1000;
  function updateCountdown() {
    var diff = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    var h = Math.floor(diff / 3600);
    var m = Math.floor((diff % 3600) / 60);
    var s = diff % 60;
    document.getElementById('cdH').textContent = String(h).padStart(2, '0');
    document.getElementById('cdM').textContent = String(m).padStart(2, '0');
    document.getElementById('cdS').textContent = String(s).padStart(2, '0');
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();

  window.notifyMe = function() {
    var inp = document.querySelector('input[type=email]');
    if (inp.value && inp.value.includes('@')) {
      if (window.App) App.toast.success('Subscribed!', "We'll email " + inp.value + " when the service is restored.");
      inp.value = '';
    } else {
      inp.focus();
    }
  };
})();
