/* ── Settings Page ─────────────────────────────────────────── */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    /* Profile – Save Changes */
    var profileTab = document.querySelector('[data-tab-content="profile"]');
    if (profileTab) {
      var saveBtn = profileTab.querySelector('.bm-btn-primary');
      if (saveBtn) {
        saveBtn.addEventListener('click', function () {
          var valid = App.validate(profileTab, {
            first_name: { required: true, requiredMsg: 'First name is required.' },
            last_name:  { required: true, requiredMsg: 'Last name is required.' },
            email:      { required: true, email: true }
          });
          if (valid) App.toast.success('Profile Updated', 'Your profile has been saved.');
        });
      }
    }

    /* Password – Update Password */
    var passTab = document.querySelector('[data-tab-content="password"]');
    if (passTab) {
      var updateBtn = passTab.querySelector('.bm-btn-primary');
      if (updateBtn) {
        updateBtn.addEventListener('click', function () {
          var valid = App.validate(passTab, {
            current_password:     { required: true, requiredMsg: 'Current password is required.' },
            new_password:         { required: true, minLength: 8, requiredMsg: 'New password is required.' },
            confirm_new_password: { required: true, match: 'new_password', matchMsg: 'Passwords do not match.' }
          });
          if (valid) App.toast.success('Password Changed', 'Your password has been updated.');
        });
      }
    }
  });
})();
