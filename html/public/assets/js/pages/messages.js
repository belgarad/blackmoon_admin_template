/**
 * Messages — folder navigation, message reading, compose, bulk actions
 * Dependencies: app.js (App.toast)
 */
(function () {

  var activeItem = null;

  /* ── Folder navigation ── */
  document.querySelectorAll('.msg-folder[data-folder]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.msg-folder').forEach(function (f) { f.classList.remove('active'); });
      document.querySelectorAll('.msg-folder-content').forEach(function (c) { c.classList.remove('active'); });
      btn.classList.add('active');
      var target = document.querySelector('[data-folder-content="' + btn.dataset.folder + '"]');
      if (target) target.classList.add('active');
      uncheckAll();
      showEmpty();
    });
  });

  /* ── Message click → Detail panel ── */
  document.querySelectorAll('.msg-item').forEach(function (item) {
    item.addEventListener('click', function () {
      openMessage(item);
    });
  });

  function openMessage(item) {
    if (activeItem) activeItem.classList.remove('msg-active');
    activeItem = item;
    item.classList.add('msg-active');
    item.classList.remove('unread');

    var d = item.dataset;
    document.getElementById('detailSubject').textContent = d.subject || '';
    document.getElementById('detailAvatar').textContent = d.initials || '?';
    document.getElementById('detailSenderName').textContent = d.sender || '';
    document.getElementById('detailTime').textContent = d.time || '';

    var body = (d.body || '').replace(/&#10;/g, '\n');
    document.getElementById('detailBody').innerHTML = '<p>' + body.split('\n').join('</p><p>') + '</p>';

    var badge = document.getElementById('detailBadge');
    if (d.badge) {
      badge.textContent = d.badge;
      badge.className = 'bm-badge bm-badge-sm bm-badge-' + (d.badgeColor || 'primary');
    } else {
      badge.className = 'bm-badge bm-badge-sm bm-d-none';
    }

    var starIcon = document.getElementById('detailStarIcon');
    if (d.starred === 'true') {
      starIcon.style.fontVariationSettings = "'FILL' 1";
      starIcon.style.color = 'var(--warning)';
    } else {
      starIcon.style.fontVariationSettings = '';
      starIcon.style.color = '';
    }

    var attachEl = document.getElementById('detailAttachments');
    if (d.hasAttachment === 'true') {
      attachEl.classList.remove('bm-d-none');
    } else {
      attachEl.classList.add('bm-d-none');
    }

    showDetailView();
    document.querySelector('.msg-layout').classList.add('msg-detail-open');
  }

  /* ── Panel visibility helpers ── */
  function showEmpty() {
    document.getElementById('msgDetailEmpty').style.display = '';
    document.getElementById('msgDetailView').classList.add('bm-d-none');
    document.getElementById('msgComposeView').classList.add('bm-d-none');
    if (activeItem) activeItem.classList.remove('msg-active');
    activeItem = null;
    document.querySelector('.msg-layout').classList.remove('msg-detail-open');
  }
  function showDetailView() {
    document.getElementById('msgDetailEmpty').style.display = 'none';
    document.getElementById('msgDetailView').classList.remove('bm-d-none');
    document.getElementById('msgComposeView').classList.add('bm-d-none');
  }
  function showComposeView() {
    document.getElementById('msgDetailEmpty').style.display = 'none';
    document.getElementById('msgDetailView').classList.add('bm-d-none');
    document.getElementById('msgComposeView').classList.remove('bm-d-none');
    if (activeItem) activeItem.classList.remove('msg-active');
    activeItem = null;
    document.querySelector('.msg-layout').classList.add('msg-detail-open');
  }

  /* ── Back button (mobile) ── */
  document.getElementById('msgDetailBack').addEventListener('click', function () {
    showEmpty();
  });

  /* ── Compose ── */
  document.getElementById('composeBtn').addEventListener('click', function () {
    showComposeView();
    document.getElementById('composeTo').value = '';
    document.getElementById('composeCc').value = '';
    document.getElementById('composeSubject').value = '';
    document.getElementById('composeBody').value = '';
    setTimeout(function () { document.getElementById('composeTo').focus(); }, 100);
  });

  window.closeCompose = function () {
    showEmpty();
  };

  window.saveDraft = function () {
    App.toast.success('Saved', 'Draft saved successfully.');
    showEmpty();
  };

  window.sendMessage = function () {
    var to = document.getElementById('composeTo').value;
    if (!to) { App.toast.warning('Missing', 'Please enter a recipient.'); return; }
    App.toast.success('Sent', 'Message sent to ' + to + '.');
    showEmpty();
  };

  /* ── Reply / Forward ── */
  window.replyToMessage = function () {
    if (!activeItem) return;
    var d = activeItem.dataset;
    showComposeView();
    document.getElementById('composeTo').value = d.sender || '';
    document.getElementById('composeSubject').value = 'Re: ' + (d.subject || '');
    document.getElementById('composeBody').value = '';
    setTimeout(function () { document.getElementById('composeBody').focus(); }, 100);
  };
  window.forwardMessage = function () {
    if (!activeItem) return;
    var d = activeItem.dataset;
    var body = (d.body || '').replace(/&#10;/g, '\n');
    showComposeView();
    document.getElementById('composeTo').value = '';
    document.getElementById('composeSubject').value = 'Fwd: ' + (d.subject || '');
    document.getElementById('composeBody').value = '\n\n---------- Forwarded message ----------\nFrom: ' + (d.sender || '') + '\n\n' + body;
    setTimeout(function () { document.getElementById('composeTo').focus(); }, 100);
  };

  /* ── Detail actions ── */
  window.archiveDetail = function () {
    if (!activeItem) return;
    App.toast.success('Archived', 'Message archived.');
    activeItem.style.opacity = '0';
    setTimeout(function () { activeItem.style.display = 'none'; showEmpty(); }, 200);
  };
  window.deleteDetail = function () {
    if (!activeItem) return;
    App.toast.success('Deleted', 'Message moved to trash.');
    activeItem.style.opacity = '0';
    setTimeout(function () { activeItem.style.display = 'none'; showEmpty(); }, 200);
  };
  window.toggleDetailStar = function () {
    if (!activeItem) return;
    var isStarred = activeItem.dataset.starred === 'true';
    activeItem.dataset.starred = isStarred ? 'false' : 'true';
    var starBtn = activeItem.querySelector('.msg-star');
    if (starBtn) starBtn.classList.toggle('starred');
    var icon = document.getElementById('detailStarIcon');
    if (!isStarred) {
      icon.style.fontVariationSettings = "'FILL' 1";
      icon.style.color = 'var(--warning)';
    } else {
      icon.style.fontVariationSettings = '';
      icon.style.color = '';
    }
  };

  /* ── Star toggle (list) ── */
  window.toggleStar = function (btn) {
    btn.classList.toggle('starred');
    var item = btn.closest('.msg-item');
    if (item) item.dataset.starred = btn.classList.contains('starred') ? 'true' : 'false';
  };

  /* ── Checkbox / Bulk ── */
  var checkAll = document.getElementById('msgCheckAll');
  checkAll.addEventListener('change', function () {
    var active = document.querySelector('.msg-folder-content.active');
    var checks = active.querySelectorAll('.msg-check');
    checks.forEach(function (c) { c.checked = checkAll.checked; });
    updateBulkCount();
  });

  function updateBulkCount() {
    var active = document.querySelector('.msg-folder-content.active');
    var checked = active.querySelectorAll('.msg-check:checked').length;
    var bulk = document.getElementById('msgBulkActions');
    var count = document.getElementById('msgBulkCount');
    if (checked > 0) {
      bulk.classList.add('visible');
      count.textContent = checked + ' selected';
    } else {
      bulk.classList.remove('visible');
    }
  }

  function uncheckAll() {
    checkAll.checked = false;
    document.querySelectorAll('.msg-check').forEach(function (c) { c.checked = false; });
    updateBulkCount();
  }

  window.bulkAction = function (action) {
    var active = document.querySelector('.msg-folder-content.active');
    var checked = active.querySelectorAll('.msg-check:checked');
    var n = checked.length;
    if (!n) return;
    if (action === 'archive') App.toast.success('Archived', n + ' message' + (n > 1 ? 's' : '') + ' archived.');
    if (action === 'read') App.toast.info('Updated', n + ' message' + (n > 1 ? 's' : '') + ' marked as read.');
    if (action === 'delete') App.toast.success('Deleted', n + ' message' + (n > 1 ? 's' : '') + ' moved to trash.');
    checked.forEach(function (c) {
      c.closest('.msg-item').style.opacity = '0';
      setTimeout(function () { c.closest('.msg-item').style.display = 'none'; }, 200);
    });
    setTimeout(uncheckAll, 250);
    showEmpty();
  };

  /* ── Search filter ── */
  window.filterMessages = function (q) {
    q = q.toLowerCase();
    var active = document.querySelector('.msg-folder-content.active');
    active.querySelectorAll('.msg-item').forEach(function (item) {
      var text = item.textContent.toLowerCase();
      item.style.display = (!q || text.indexOf(q) !== -1) ? '' : 'none';
    });
  };

  /* ── Draft click → opens compose ── */
  document.querySelectorAll('[data-folder-content="drafts"] .msg-item').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.stopImmediatePropagation();
      showComposeView();
      document.getElementById('composeTo').value = (item.dataset.sender || '').replace('To: ', '');
      document.getElementById('composeSubject').value = item.dataset.subject || '';
      document.getElementById('composeBody').value = (item.dataset.body || '').replace(/&#10;/g, '\n');
    });
  });

})();
