/**
 * Calendar App — mini calendar, main grid, events, upcoming list
 * Dependencies: app.js (App.toast)
 */
(function () {

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var today = new Date();
  var curYear = today.getFullYear();
  var curMonth = today.getMonth();
  var viewY = curYear, viewM = curMonth;
  var miniY = curYear, miniM = curMonth;

  // ── Events data ────────────────────────────────────────────
  var events = {};
  function eKey(y, m, d) { return y + '-' + m + '-' + d; }
  function addEv(y, m, d, title, cls) {
    var k = eKey(y, m, d);
    if (!events[k]) events[k] = [];
    events[k].push({ title: title, cls: cls });
  }

  // Pre-seed events around April 2026
  var y = 2026, mo = 3;
  addEv(y, mo, 1, 'Sprint Review', 'ev-blue');
  addEv(y, mo, 2, 'Q2 Kickoff', 'ev-teal');
  addEv(y, mo, 2, 'Design Review', 'ev-purple');
  addEv(y, mo, 7, 'Product Demo', 'ev-blue');
  addEv(y, mo, 8, 'API Migration DL', 'ev-green');
  addEv(y, mo, 9, 'Dentist Appt', 'ev-orange');
  addEv(y, mo, 10, 'Team Lunch', 'ev-teal');
  addEv(y, mo, 13, 'Board Meeting', 'ev-red');
  addEv(y, mo, 14, 'UX Workshop', 'ev-purple');
  addEv(y, mo, 15, 'Release v2.4', 'ev-green');
  addEv(y, mo, 16, 'Investor Update', 'ev-blue');
  addEv(y, mo, 17, 'Team Offsite', 'ev-teal');
  addEv(y, mo, 20, 'Sales Pipeline Review', 'ev-blue');
  addEv(y, mo, 21, 'Sprint Planning', 'ev-blue');
  addEv(y, mo, 22, 'Feature Freeze', 'ev-green');
  addEv(y, mo, 24, 'Performance Reviews', 'ev-orange');
  addEv(y, mo, 28, '1:1 with CTO', 'ev-blue');
  addEv(y, mo, 29, 'Release v2.5 DL', 'ev-green');
  addEv(y, mo, 30, 'Monthly All-Hands', 'ev-teal');
  addEv(2026, 2, 28, 'Q1 Close', 'ev-green');
  addEv(2026, 4, 4, 'Product Planning', 'ev-blue');

  // ── Calendar rendering ─────────────────────────────────────
  function renderMini() {
    document.getElementById('miniTitle').textContent = MONTHS[miniM] + ' ' + miniY;
    var firstDay = new Date(miniY, miniM, 1).getDay();
    var daysInMonth = new Date(miniY, miniM + 1, 0).getDate();
    var daysInPrev = new Date(miniY, miniM, 0).getDate();
    var html = '<div class="cal-mini-days">' +
      ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(function (d) { return '<div class="cal-mini-wd">' + d + '</div>'; }).join('') +
      Array.from({ length: firstDay }, function (_, i) { return '<div class="cal-mini-day other-month">' + (daysInPrev - firstDay + 1 + i) + '</div>'; }).join('') +
      Array.from({ length: daysInMonth }, function (_, i) {
        var d = i + 1;
        var cls = 'cal-mini-day';
        if (d === today.getDate() && miniM === today.getMonth() && miniY === today.getFullYear()) cls += ' today';
        if (events[eKey(miniY, miniM, d)]) cls += ' has-event';
        return '<div class="' + cls + '" onclick="jumpTo(' + miniY + ',' + miniM + ',' + d + ')">' + d + '</div>';
      }).join('') +
      Array.from({ length: (7 - (firstDay + daysInMonth) % 7) % 7 }, function (_, i) { return '<div class="cal-mini-day other-month">' + (i + 1) + '</div>'; }).join('') +
      '</div>';
    document.getElementById('miniGrid').innerHTML = html;
  }

  function renderUpcoming() {
    var list = [];
    for (var k in events) {
      var parts = k.split('-').map(Number);
      var evDate = new Date(parts[0], parts[1], parts[2]);
      if (evDate >= today) {
        events[k].forEach(function (ev) { list.push({ date: evDate, title: ev.title, cls: ev.cls, key: k }); });
      }
    }
    list.sort(function (a, b) { return a.date - b.date; });
    list = list.slice(0, 8);
    var clsToColor = { 'ev-blue': '#4B77BE', 'ev-green': 'var(--success)', 'ev-orange': '#F2784B', 'ev-red': 'var(--danger)', 'ev-teal': '#1BA39C', 'ev-purple': '#8775A7' };
    document.getElementById('upcomingList').innerHTML = list.map(function (item) {
      var d = item.date;
      var label = d.getDate() + ' ' + MONTHS[d.getMonth()].slice(0, 3);
      var color = clsToColor[item.cls] || 'var(--primary)';
      return '<div class="upcoming-item">' +
        '<div class="upcoming-wrap" style="background:' + color + ';width:3px;border-radius:2px;flex-shrink:0;"></div>' +
        '<div class="upcoming-info"><strong>' + item.title + '</strong><span>' + label + '</span></div>' +
        '</div>';
    }).join('') || '<div class="bm-p-sm-caption-muted">No upcoming events</div>';
  }

  function renderMain() {
    document.getElementById('mainTitle').textContent = MONTHS[viewM] + ' ' + viewY;
    var firstDay = new Date(viewY, viewM, 1).getDay();
    var daysInMonth = new Date(viewY, viewM + 1, 0).getDate();
    var daysInPrev = new Date(viewY, viewM, 0).getDate();
    var grid = document.getElementById('mainGrid');

    var cells = [];
    for (var i = 0; i < firstDay; i++) {
      cells.push({ day: daysInPrev - firstDay + 1 + i, other: true });
    }
    for (var d = 1; d <= daysInMonth; d++) {
      var isToday = d === today.getDate() && viewM === today.getMonth() && viewY === today.getFullYear();
      cells.push({ day: d, today: isToday });
    }
    var remaining = (7 - cells.length % 7) % 7;
    for (var i2 = 1; i2 <= remaining; i2++) cells.push({ day: i2, other: true });

    grid.innerHTML = cells.map(function (cell) {
      var cls = 'cal-cell' + (cell.other ? ' other' : '') + (cell.today ? ' today' : '');
      var evHtml = '';
      if (!cell.other) {
        var evs = events[eKey(viewY, viewM, cell.day)] || [];
        var shown = evs.slice(0, 3).map(function (ev) {
          return '<div class="cal-event ' + ev.cls + '" onclick="App.toast.info(\'Event\',\'' + ev.title + '\')" title="' + ev.title + '">' + ev.title + '</div>';
        }).join('');
        var more = evs.length > 3 ? '<div class="cal-more">+' + (evs.length - 3) + ' more</div>' : '';
        evHtml = shown + more;
      }
      return '<div class="' + cls + '"><div class="cal-day-num">' + cell.day + '</div>' + evHtml + '</div>';
    }).join('');
  }

  window.miniNav = function (dir) { miniM += dir; if (miniM > 11) { miniM = 0; miniY++; } if (miniM < 0) { miniM = 11; miniY--; } renderMini(); };
  window.mainNav = function (dir) { viewM += dir; if (viewM > 11) { viewM = 0; viewY++; } if (viewM < 0) { viewM = 11; viewY--; } renderMain(); };
  window.goToday = function () { viewY = today.getFullYear(); viewM = today.getMonth(); renderMain(); };
  window.jumpTo = function (y, m, d) { viewY = y; viewM = m; renderMain(); App.toast.info('Jumped to', MONTHS[m] + ' ' + d + ', ' + y); };
  window.setView = function (v, btn) {
    document.querySelectorAll('.cal-view-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    if (v !== 'month') App.toast.info('View changed', v.charAt(0).toUpperCase() + v.slice(1) + ' view — demo shows month layout');
  };

  window.openEventModal = function (d) {
    document.getElementById('eventModal').classList.remove('bm-d-none');
    document.getElementById('eventModalTitle').textContent = 'New Event';
    document.getElementById('evTitle').value = '';
    document.getElementById('evDesc').value = '';
    var now = new Date();
    var pad = function (n) { return String(n).padStart(2, '0'); };
    document.getElementById('evDate').value = viewY + '-' + pad(viewM + 1) + '-' + pad(d || now.getDate());
  };

  window.saveEvent = function () {
    var title = document.getElementById('evTitle').value.trim();
    if (!title) { App.toast.danger('Required', 'Please enter an event title.'); return; }
    var dateParts = document.getElementById('evDate').value.split('-').map(Number);
    if (!dateParts[0]) { App.toast.danger('Required', 'Please select a date.'); return; }
    var cls = document.getElementById('evCategory').value;
    addEv(dateParts[0], dateParts[1] - 1, dateParts[2], title, cls);
    renderMain();
    renderMini();
    renderUpcoming();
    document.getElementById('eventModal').classList.add('bm-d-none');
    App.toast.success('Event saved', title + ' added to calendar.');
  };

  // Init
  renderMini();
  renderMain();
  renderUpcoming();
})();
