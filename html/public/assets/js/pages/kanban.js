/**
 * Kanban Board — drag-and-drop task management
 * Dependencies: app.js (App.toast)
 */
(function () {

  // ── Board data ─────────────────────────────────────────────
  var avatarColors = { JD: '#4B77BE', AJ: '#4C87B9', EC: '#1BBC9B', GP: '#E87E04', BM: '#8775A7', DL: '#E7505A', FT: '#1BA39C', KM: '#F2784B' };
  var priorityMeta = {
    urgent: { color: '#E7505A', label: 'Urgent' },
    high: { color: '#F2784B', label: 'High' },
    medium: { color: '#E87E04', label: 'Medium' },
    low: { color: '#1BBC9B', label: 'Low' }
  };
  var labelColors = {
    Frontend: { bg: '#E9EDEF', fg: '#8E44AD' },
    Backend: { bg: '#5C9BD1', fg: '#4B77BE' },
    Design: { bg: '#E9EDEF', fg: '#E08283' },
    Bug: { bg: '#E9EDEF', fg: '#D91E18' },
    Feature: { bg: '#E9EDEF', fg: '#1BA39C' },
    Research: { bg: '#F4D03F', fg: '#E87E04' },
    Docs: { bg: '#E9EDEF', fg: '#4C87B9' },
    Security: { bg: '#E9EDEF', fg: '#D05454' },
    Testing: { bg: '#FAFAFA', fg: '#555555' },
    Infra: { bg: '#E9EDEF', fg: '#C49F47' },
    API: { bg: '#E9EDEF', fg: '#8E44AD' },
    Performance: { bg: '#E9EDEF', fg: '#1BA39C' },
  };

  var columns = ['Backlog', 'In Progress', 'Review', 'Done'];
  var colColors = { 'Backlog': '#4B77BE', 'In Progress': '#E87E04', 'Review': '#4C87B9', 'Done': '#1BBC9B' };

  var cards = {
    'Backlog': [
      { id: 1, title: 'Redesign onboarding flow', desc: 'Update welcome wizard with new brand guidelines and A/B test variants.', labels: ['Design', 'Frontend'], priority: 'high', assignees: ['JD', 'AJ'], comments: 4, attachments: 2 },
      { id: 2, title: 'Customer interview research', desc: 'Schedule 10 customer interviews for Q2 product discovery.', labels: ['Research'], priority: 'medium', assignees: ['EC'], comments: 1, attachments: 0 },
      { id: 3, title: 'Setup CI/CD pipeline', desc: 'Configure GitHub Actions for automated testing and staging deploys.', labels: ['Infra', 'Backend'], priority: 'urgent', assignees: ['JD', 'GP'], comments: 7, attachments: 1 },
      { id: 4, title: 'Write API documentation', desc: 'Document v2 REST endpoints including auth, pagination, and errors.', labels: ['Docs', 'API'], priority: 'low', assignees: ['BM'], comments: 0, attachments: 3 },
    ],
    'In Progress': [
      { id: 5, title: 'Implement dark mode tokens', desc: 'Add CSS custom property tokens for dark theme across all components.', labels: ['Frontend', 'Design'], priority: 'high', assignees: ['AJ', 'EC'], comments: 5, attachments: 1 },
      { id: 6, title: 'Optimize database queries', desc: 'Reduce P95 query time on listings endpoint from 320ms to under 80ms.', labels: ['Performance', 'Backend'], priority: 'urgent', assignees: ['JD'], comments: 3, attachments: 0 },
      { id: 7, title: 'User permissions refactor', desc: 'Move role-based access control to a centralized policy module.', labels: ['Security', 'Backend'], priority: 'high', assignees: ['DL', 'GP'], comments: 8, attachments: 2 },
    ],
    'Review': [
      { id: 8, title: 'Checkout flow improvements', desc: 'Reduce steps from 5 to 3 and add Apple Pay + Google Pay support.', labels: ['Frontend', 'Feature'], priority: 'high', assignees: ['AJ', 'FT'], comments: 11, attachments: 4 },
      { id: 9, title: 'Email notification templates', desc: 'Redesign transactional email templates to match new brand kit.', labels: ['Design'], priority: 'medium', assignees: ['KM'], comments: 2, attachments: 1 },
    ],
    'Done': [
      { id: 10, title: 'Add SSO with Google', desc: 'Integrate Google OAuth 2.0 for workspace accounts.', labels: ['Feature', 'Security'], priority: 'high', assignees: ['JD', 'DL'], comments: 6, attachments: 2 },
      { id: 11, title: 'Mobile responsive tables', desc: 'Make all admin tables scroll horizontally on small viewports.', labels: ['Frontend'], priority: 'medium', assignees: ['AJ'], comments: 3, attachments: 0 },
      { id: 12, title: 'Migrate to TypeScript', desc: 'Convert core services to TypeScript strict mode.', labels: ['Backend'], priority: 'high', assignees: ['BM', 'GP'], comments: 9, attachments: 5 },
    ]
  };

  var filterQ = '';
  var filterAssignee = 'all';
  var filterPriority = 'all';
  var editingCol = null;
  var nextId = 20;

  // ── Render ─────────────────────────────────────────────────
  function labelTag(l) {
    var m = labelColors[l] || { bg: 'var(--accent)', fg: 'var(--muted-foreground)' };
    return '<span class="kb-label" style="background:' + m.bg + ';color:' + m.fg + ';">' + l + '</span>';
  }

  function renderCard(card) {
    var pMeta = priorityMeta[card.priority] || priorityMeta.medium;
    var labelsHtml = card.labels.map(labelTag).join('');
    var assigneesHtml = card.assignees.map(function (a) {
      return '<div class="bm-avatar" style="background:' + (avatarColors[a] || '#4B77BE') + ';color:#fff;">' + a + '</div>';
    }).join('');
    return '<div class="kb-card" data-id="' + card.id + '" draggable="true" style="--card-accent:' + pMeta.color + ';">' +
      '<div class="kb-card-labels">' + labelsHtml + '</div>' +
      '<div class="kb-card-title">' + card.title + '</div>' +
      (card.desc ? '<div class="kb-card-desc">' + card.desc + '</div>' : '') +
      '<div class="kb-card-footer">' +
      '<div class="kb-priority" style="color:' + pMeta.color + ';"><div class="kb-priority-dot" style="background:' + pMeta.color + ';"></div>' + pMeta.label + '</div>' +
      '<div class="kb-assignees">' + assigneesHtml + '</div>' +
      '</div>' +
      '<div class="kb-meta">' +
      (card.comments ? '<span class="kb-meta-item"><i class="ph ph-chat-circle bm-text-body"></i>' + card.comments + '</span>' : '') +
      (card.attachments ? '<span class="kb-meta-item"><i class="ph ph-paperclip bm-text-body"></i>' + card.attachments + '</span>' : '') +
      '</div>' +
      '</div>';
  }

  function matchesFilters(card) {
    if (filterQ && (card.title + card.desc).toLowerCase().indexOf(filterQ) === -1) return false;
    if (filterAssignee !== 'all' && card.assignees.indexOf(filterAssignee) === -1) return false;
    if (filterPriority !== 'all' && card.priority !== filterPriority) return false;
    return true;
  }

  function renderBoard() {
    var board = document.getElementById('kanbanBoard');
    board.innerHTML = '';
    columns.forEach(function (colName) {
      var colCards = (cards[colName] || []).filter(function (c) { return matchesFilters(c); });
      var col = document.createElement('div');
      col.className = 'kb-col';
      col.dataset.col = colName;

      col.innerHTML =
        '<div class="kb-col-header" style="--col-color:' + colColors[colName] + ';">' +
        '<span class="kb-col-title">' + colName + '</span>' +
        '<span class="kb-col-count">' + (cards[colName] || []).length + '</span>' +
        '</div>' +
        '<div class="kb-cards" data-col="' + colName + '">' +
        colCards.map(renderCard).join('') +
        '</div>' +
        '<button class="kb-add" onclick="openAddCardModal(\'' + colName + '\')">' +
        '<i class="ph ph-plus bm-text-md"></i> Add card' +
        '</button>';

      board.appendChild(col);
    });

    // Attach drag events
    board.querySelectorAll('.kb-card').forEach(function (cardEl) {
      cardEl.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text/plain', cardEl.dataset.id);
        cardEl.classList.add('dragging');
      });
      cardEl.addEventListener('dragend', function () { cardEl.classList.remove('dragging'); });
      cardEl.addEventListener('click', function (e) {
        if (!e.defaultPrevented) {
          var id = parseInt(cardEl.dataset.id);
          var found = null;
          columns.forEach(function (col) { (cards[col] || []).forEach(function (c) { if (c.id === id) found = c; }); });
          if (found) App.toast.info(found.title, found.desc || 'No description');
        }
      });
    });

    board.querySelectorAll('.kb-cards').forEach(function (zone) {
      zone.addEventListener('dragover', function (e) { e.preventDefault(); zone.classList.add('drag-over'); });
      zone.addEventListener('dragleave', function (e) { if (!zone.contains(e.relatedTarget)) zone.classList.remove('drag-over'); });
      zone.addEventListener('drop', function (e) {
        e.preventDefault();
        zone.classList.remove('drag-over');
        var idStr = e.dataTransfer.getData('text/plain');
        var id = parseInt(idStr);
        var targetCol = zone.dataset.col;
        var fromCol = null, fromIdx = -1;
        columns.forEach(function (col) { (cards[col] || []).forEach(function (c, i) { if (c.id === id) { fromCol = col; fromIdx = i; } }); });
        if (!fromCol || fromCol === targetCol) return;
        var moved = cards[fromCol].splice(fromIdx, 1)[0];
        cards[targetCol].push(moved);
        renderBoard();
        App.toast.success('Moved', '"' + moved.title + '" → ' + targetCol);
      });
    });
  }

  // ── Filters ───────────────────────────────────────────────
  window.filterCards = function (q) { filterQ = q.toLowerCase(); renderBoard(); };
  window.setAssigneeFilter = function (btn, user) {
    filterAssignee = user;
    document.querySelectorAll('.af-btn').forEach(function (b) { b.classList.remove('af-btn-active'); });
    btn.classList.add('af-btn-active');
    renderBoard();
  };
  window.setPriFilter = function (val) { filterPriority = val; renderBoard(); };

  // ── Modal ─────────────────────────────────────────────────
  window.openAddCardModal = function (colName) {
    editingCol = colName;
    document.getElementById('cardModal').classList.remove('bm-d-none');
    document.getElementById('cmTitle').value = '';
    document.getElementById('cmDesc').value = '';
    document.getElementById('cmLabels').value = '';
    if (colName) document.getElementById('cmCol').value = colName;
  };

  window.saveCard = function () {
    var title = document.getElementById('cmTitle').value.trim();
    if (!title) { App.toast.danger('Required', 'Card title is required.'); return; }
    var col = document.getElementById('cmCol').value;
    var priority = document.getElementById('cmPriority').value;
    var labelsRaw = document.getElementById('cmLabels').value.split(',').map(function (l) { return l.trim(); }).filter(Boolean);
    var card = { id: nextId++, title: title, desc: document.getElementById('cmDesc').value.trim(), labels: labelsRaw, priority: priority, assignees: ['JD'], comments: 0, attachments: 0 };
    if (!cards[col]) cards[col] = [];
    cards[col].unshift(card);
    renderBoard();
    document.getElementById('cardModal').classList.add('bm-d-none');
    App.toast.success('Card added', '"' + title + '" added to ' + col);
  };

  renderBoard();
})();
