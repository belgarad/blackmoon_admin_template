/* ── Wizard: Create Account ──────────────────────────────── */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var stepperEl = document.querySelector('[data-stepper]');
    if (!stepperEl || !stepperEl._ktStepper) return;

    var stepper = stepperEl._ktStepper;

    /* Step validation rules per panel index */
    var stepRules = {
      0: {
        wiz_first_name: { required: true, requiredMsg: 'First name is required.' },
        wiz_last_name:  { required: true, requiredMsg: 'Last name is required.' },
        wiz_email:      { required: true, email: true, requiredMsg: 'Email is required.' }
      },
      1: {
        wiz_company: { required: true, requiredMsg: 'Company name is required.' }
      }
    };

    stepper.opts.onBeforeNext = function (currentIndex, panel) {
      var rules = stepRules[currentIndex];
      if (!rules) return true;
      return App.validate(panel, rules);
    };

    stepper.opts.onComplete = function () {
      App.toast.success('Account Created', 'Your account has been set up successfully!');
    };
  });
})();
