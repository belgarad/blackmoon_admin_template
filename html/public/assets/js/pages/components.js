/* ── Components Page ─────────────────────────────────────── */
(function() {
  'use strict';

  // ── DataGrid demo ──────────────────────────────────────────
  var data = [
    { name: 'Alice Johnson',  role: 'Admin',    status: 'Active',   joined: '2023-01-15', revenue: '$12,400' },
    { name: 'Bob Martinez',   role: 'Editor',   status: 'Active',   joined: '2023-03-22', revenue: '$8,750'  },
    { name: 'Carol Williams', role: 'Viewer',   status: 'Inactive', joined: '2022-11-08', revenue: '$3,200'  },
    { name: 'David Lee',      role: 'Admin',    status: 'Active',   joined: '2024-02-01', revenue: '$19,600' },
    { name: 'Eva Chen',       role: 'Editor',   status: 'Active',   joined: '2023-07-11', revenue: '$9,100'  },
    { name: 'Frank Torres',   role: 'Viewer',   status: 'Pending',  joined: '2024-05-30', revenue: '$0'      },
    { name: 'Grace Park',     role: 'Editor',   status: 'Active',   joined: '2023-09-04', revenue: '$7,300'  },
    { name: 'Harry Wilson',   role: 'Admin',    status: 'Active',   joined: '2022-08-17', revenue: '$22,800' },
    { name: 'Isla Brown',     role: 'Viewer',   status: 'Inactive', joined: '2023-12-20', revenue: '$1,500'  },
    { name: 'James Davis',    role: 'Editor',   status: 'Active',   joined: '2024-01-09', revenue: '$11,200' },
    { name: 'Karen Miller',   role: 'Admin',    status: 'Active',   joined: '2022-06-03', revenue: '$31,000' },
    { name: 'Liam Moore',     role: 'Viewer',   status: 'Pending',  joined: '2024-06-14', revenue: '$0'      }
  ];

  var statusColors = { Active: 'var(--success)', Inactive: 'var(--danger)', Pending: 'var(--warning)' };
  var roleColors   = { Admin: 'var(--primary)', Editor: 'var(--info)', Viewer: 'var(--muted-foreground)' };

  new App.DataGrid(document.getElementById('demoGrid'), {
    pageSize: 5,
    selectable: true,
    data: data,
    columns: [
      { key: 'name',    label: 'Name' },
      { key: 'role',    label: 'Role',    render: function(v) { return '<span style="font-size:0.75rem;font-weight:600;padding:0.125rem 0.5rem;border-radius:999px;background:color-mix(in srgb,' + roleColors[v] + ' 12%,transparent);color:' + roleColors[v] + ';">' + v + '</span>'; } },
      { key: 'status',  label: 'Status',  render: function(v) { return '<span style="font-size:0.75rem;font-weight:600;padding:0.125rem 0.5rem;border-radius:999px;background:color-mix(in srgb,' + statusColors[v] + ' 15%,transparent);color:' + statusColors[v] + ';">' + v + '</span>'; } },
      { key: 'joined',  label: 'Joined' },
      { key: 'revenue', label: 'Revenue' }
    ]
  });

  // ── Dropzone demo ──────────────────────────────────────────
  new App.Dropzone(document.getElementById('demoDropzone'), {
    accept: 'image/*,.pdf,.docx,.xlsx',
    multiple: true,
    maxSize: 5 * 1024 * 1024,
    maxFiles: 5,
    onAdd: function(f) { App.toast.success('File added', f.name); },
    onRemove: function(f) { App.toast.info('File removed', f.name); }
  });

  // ── Stepper demo ───────────────────────────────────────────
  new App.Stepper(document.getElementById('demoStepper'), {
    onStepChange: function(step, total) {
      var steps = document.querySelectorAll('#demoStepper [data-stepper-step]');
      steps.forEach(function(s, i) {
        var bullet = s.querySelector('.bm-stepper-bullet');
        var label  = s.querySelector('span');
        if (i < step) {
          bullet.style.background = 'var(--success)';
          bullet.style.color = '#fff';
          label && (label.style.color = 'var(--foreground)');
        } else if (i === step) {
          bullet.style.background = 'var(--primary)';
          bullet.style.color = '#fff';
          label && (label.style.color = 'var(--foreground)');
        } else {
          bullet.style.background = 'var(--muted)';
          bullet.style.color = 'var(--muted-foreground)';
          label && (label.style.color = 'var(--muted-foreground)');
        }
      });
    },
    onComplete: function() {
      App.toast.success('Wizard complete', 'All steps finished successfully!');
      this.reset && this.reset();
    }
  });

  // ── Range Sliders demo ─────────────────────────────────────
  App.initRangeSliders();

  // ── OTP demo ───────────────────────────────────────────────
  App.initOTP();

  // ── Carousels demo ─────────────────────────────────────────
  App.initCarousels && App.initCarousels();

  // ── Lightbox demo ──────────────────────────────────────────
  App.initLightbox && App.initLightbox();

  // ── Form Validation demo ───────────────────────────────────
  function _setField(id, errId, msg) {
    var inp = document.getElementById(id);
    var err = document.getElementById(errId);
    if (msg) {
      inp.style.borderColor = 'var(--danger)';
      err.textContent = msg;
      err.classList.remove('bm-d-none');
      return false;
    } else {
      inp.style.borderColor = '';
      err.classList.add('bm-d-none');
      return true;
    }
  }

  window.handleDemoFormSubmit = function(e) {
    e.preventDefault();
    var ok = true;
    var name  = document.getElementById('inpName').value.trim();
    var email = document.getElementById('inpEmail').value.trim();
    var pwd   = document.getElementById('inpPwd').value;
    var url   = document.getElementById('inpUrl').value.trim();
    var terms = document.getElementById('inpTerms').checked;

    ok = _setField('inpName',  'errName',  !name  ? 'Full name is required.' : null) && ok;
    ok = _setField('inpEmail', 'errEmail', !email ? 'Email is required.' : (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Enter a valid email address.' : null)) && ok;
    ok = _setField('inpPwd',   'errPwd',   !pwd   ? 'Password is required.' : (pwd.length < 8 ? 'Password must be at least 8 characters.' : null)) && ok;
    if (url) ok = _setField('inpUrl', 'errUrl', (!/^https?:\/\/.+/.test(url)) ? 'Enter a valid URL starting with http:// or https://.' : null) && ok;
    else _setField('inpUrl', 'errUrl', null);

    var termsErr = document.getElementById('errTerms');
    var termsCb  = document.getElementById('inpTerms');
    if (!terms) {
      termsCb.style.outline = '2px solid var(--danger)';
      termsErr.textContent = 'You must agree to the terms to continue.';
      termsErr.classList.remove('bm-d-none');
      ok = false;
    } else {
      termsCb.style.outline = '';
      termsErr.classList.add('bm-d-none');
    }

    if (ok) {
      App.toast.success('Form submitted', 'All fields are valid!');
      document.getElementById('demoValidationForm').reset();
      ['inpName','inpEmail','inpPwd','inpUrl'].forEach(function(id) {
        document.getElementById(id).style.borderColor = '';
      });
    }
    return false;
  };

  window.resetDemoForm = function() {
    document.getElementById('demoValidationForm').reset();
    ['inpName','inpEmail','inpPwd','inpUrl'].forEach(function(id) {
      document.getElementById(id).style.borderColor = '';
    });
    ['errName','errEmail','errPwd','errUrl','errTerms'].forEach(function(id) {
      document.getElementById(id).classList.add('bm-d-none');
    });
    document.getElementById('inpTerms').style.outline = '';
  };

})();
