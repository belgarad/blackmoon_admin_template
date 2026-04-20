/**
 * App — General UI interactions
 * Components: Tabs, Modal, User Menu, Toast, Accordion, Drawer, Notification, Command Palette, Dropdown, Loading Bar, Date Picker, DataGrid, Dropzone, Stepper, Range Slider, OTP Input
 */
(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // LOADING BAR
  // ═══════════════════════════════════════════════════════════
  var loadingBar;
  function initLoadingBar() {
    loadingBar = document.createElement('div');
    loadingBar.id = 'bm-loading-bar';
    document.body.appendChild(loadingBar);
  }
  var LoadingBar = {
    start: function () {
      if (!loadingBar) return;
      loadingBar.classList.remove('complete');
      loadingBar.classList.add('loading');
    },
    done: function () {
      if (!loadingBar) return;
      loadingBar.classList.remove('loading');
      loadingBar.classList.add('complete');
    }
  };

  // ═══════════════════════════════════════════════════════════
  // TOAST NOTIFICATIONS
  // ═══════════════════════════════════════════════════════════
  var toastContainer;
  function ensureToastContainer() {
    if (!toastContainer) {
      toastContainer = document.getElementById('bm-toast-container');
      if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'bm-toast-container';
        document.body.appendChild(toastContainer);
      }
    }
    return toastContainer;
  }

  var TOAST_ICONS = {
    success: 'check-circle',
    warning: 'warning',
    danger: 'x-circle',
    info: 'info'
  };

  function showToast(options) {
    var type = options.type || 'info';
    var title = options.title || '';
    var message = options.message || '';
    var duration = options.duration !== undefined ? options.duration : 4000;

    ensureToastContainer();

    var toast = document.createElement('div');
    toast.className = 'bm-toast bm-toast-' + type;
    toast.innerHTML =
      '<div class="bm-toast-icon"><i class="ph ph-' + TOAST_ICONS[type] + '"></i></div>' +
      '<div class="bm-toast-content">' +
        (title ? '<div class="bm-toast-title">' + title + '</div>' : '') +
        (message ? '<div class="bm-toast-message">' + message + '</div>' : '') +
      '</div>' +
      '<button class="bm-toast-close" aria-label="Close"><i class="ph ph-x"></i></button>';

    toastContainer.appendChild(toast);

    // Announce to screen readers via live region
    var liveRegion = document.getElementById('bm-live');
    if (liveRegion) liveRegion.textContent = (title ? title + ': ' : '') + message;

    var closeBtn = toast.querySelector('.bm-toast-close');
    function dismiss() {
      toast.classList.add('removing');
      setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 220);
    }
    closeBtn.addEventListener('click', function (e) { e.stopPropagation(); dismiss(); });
    toast.addEventListener('click', dismiss);

    if (duration > 0) setTimeout(dismiss, duration);
    return toast;
  }

  // ═══════════════════════════════════════════════════════════
  // USER MENU DROPDOWN
  // ═══════════════════════════════════════════════════════════
  var userMenuOpen = false;

  function _positionPanel(panel, trigger) {
    if (!panel || !trigger) return;
    var rect = trigger.getBoundingClientRect();
    panel.style.top  = (rect.bottom + 6) + 'px';
    panel.style.right = (window.innerWidth - rect.right) + 'px';
    panel.style.left = 'auto';
  }

  function toggleUserMenu(event) {
    if (event) event.stopPropagation();
    userMenuOpen = !userMenuOpen;
    var panel    = document.getElementById('userMenuPanel');
    var backdrop = document.getElementById('userMenuBackdrop');
    var trigger  = document.getElementById('userMenuTrigger');
    if (userMenuOpen) {
      _positionPanel(panel, trigger);
      closeNotifPanel();
    }
    if (panel)    panel.style.display    = userMenuOpen ? 'block' : 'none';
    if (backdrop) backdrop.style.display = userMenuOpen ? 'block' : 'none';
    if (trigger)  trigger.setAttribute('aria-expanded', userMenuOpen);
  }

  function closeUserMenu() {
    userMenuOpen = false;
    var panel = document.getElementById('userMenuPanel');
    var backdrop = document.getElementById('userMenuBackdrop');
    var trigger = document.getElementById('userMenuTrigger');
    if (panel) panel.style.display = 'none';
    if (backdrop) backdrop.style.display = 'none';
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

  // ═══════════════════════════════════════════════════════════
  // NOTIFICATION PANEL
  // ═══════════════════════════════════════════════════════════
  var notifOpen = false;

  function toggleNotifPanel(event) {
    if (event) event.stopPropagation();
    notifOpen = !notifOpen;
    var panel    = document.getElementById('notifPanel');
    var backdrop = document.getElementById('notifBackdrop');
    var trigger  = document.getElementById('notifTrigger');
    if (notifOpen) {
      _positionPanel(panel, trigger);
      closeUserMenu();
    }
    if (panel)    panel.style.display    = notifOpen ? 'flex' : 'none';
    if (backdrop) backdrop.style.display = notifOpen ? 'block' : 'none';
    if (trigger)  trigger.setAttribute('aria-expanded', notifOpen);
  }

  function closeNotifPanel() {
    notifOpen = false;
    var panel = document.getElementById('notifPanel');
    var backdrop = document.getElementById('notifBackdrop');
    var trigger = document.getElementById('notifTrigger');
    if (panel) panel.style.display = 'none';
    if (backdrop) backdrop.style.display = 'none';
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

  // ═══════════════════════════════════════════════════════════
  // COMMAND PALETTE (⌘K / Ctrl+K)
  // ═══════════════════════════════════════════════════════════
  function openCommand() {
    var overlay = document.getElementById('commandPalette');
    if (!overlay) return;
    overlay.classList.add('open');
    trapFocus(overlay);
    var input = overlay.querySelector('.bm-command-input');
    if (input) setTimeout(function() { input.focus(); }, 50);
  }

  function closeCommand() {
    var overlay = document.getElementById('commandPalette');
    if (overlay) {
      overlay.classList.remove('open');
      releaseFocus(overlay);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // ACCORDION
  // ═══════════════════════════════════════════════════════════
  function initAccordion() {
    document.querySelectorAll('.bm-accordion-trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('.bm-accordion-item');
        if (!item) return;
        var isOpen = item.classList.contains('open');
        // Close all siblings (single-open mode) unless data-multi is set
        var accordion = item.closest('.bm-accordion');
        if (accordion && !accordion.hasAttribute('data-multi')) {
          accordion.querySelectorAll('.bm-accordion-item.open').forEach(function (sibling) {
            if (sibling !== item) sibling.classList.remove('open');
          });
        }
        item.classList.toggle('open', !isOpen);
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // DRAWER
  // ═══════════════════════════════════════════════════════════
  function openDrawer(drawerId) {
    var drawer = document.getElementById(drawerId);
    var overlay = document.querySelector('[data-drawer-overlay="' + drawerId + '"]');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer(drawerId) {
    var drawer = document.getElementById(drawerId);
    var overlay = document.querySelector('[data-drawer-overlay="' + drawerId + '"]');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Init drawers with data attributes
  function initDrawers() {
    document.querySelectorAll('[data-open-drawer]').forEach(function (btn) {
      btn.addEventListener('click', function () { openDrawer(btn.getAttribute('data-open-drawer')); });
    });
    document.querySelectorAll('[data-close-drawer]').forEach(function (btn) {
      btn.addEventListener('click', function () { closeDrawer(btn.getAttribute('data-close-drawer')); });
    });
    document.querySelectorAll('.bm-drawer-overlay').forEach(function (overlay) {
      overlay.addEventListener('click', function () {
        var drawerId = overlay.getAttribute('data-drawer-overlay');
        if (drawerId) closeDrawer(drawerId);
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // CUSTOM SELECT
  // ═══════════════════════════════════════════════════════════
  function initCustomSelects() {
    document.querySelectorAll('select.bm-select').forEach(function (select) {
      if (select._akCustomSelect) return; // already initialized
      select._akCustomSelect = true;

      // Build wrapper — inherit inline styles (width, max-width, font-size…)
      var wrapper = document.createElement('div');
      wrapper.className = 'bm-custom-select';
      Array.prototype.forEach.call(select.classList, function (className) {
        if (className === 'bm-select') return;
        if (className.indexOf('bm-w-') === 0 || className.indexOf('bm-max-w-') === 0 || className.indexOf('bm-min-w-') === 0 || className.indexOf('bm-select-') === 0) {
          wrapper.classList.add(className);
        }
      });
      // Copy relevant inline styles from the original select
      var copyStyles = ['width', 'max-width', 'min-width', 'font-size'];
      copyStyles.forEach(function (prop) {
        if (select.style[prop]) wrapper.style[prop] = select.style[prop];
      });

      // Trigger button
      var trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'bm-custom-select-trigger';

      var valueSpan = document.createElement('span');
      valueSpan.className = 'bm-custom-select-value';

      var arrow = document.createElement('i');
      arrow.className = 'bm-custom-select-arrow ph ph-caret-down';

      trigger.appendChild(valueSpan);
      trigger.appendChild(arrow);

      // Panel
      var panel = document.createElement('div');
      panel.className = 'bm-custom-select-panel';

      // Helper: sync displayed value from select.value
      function syncValue() {
        var selOpt = select.options[select.selectedIndex];
        if (selOpt) {
          valueSpan.textContent = selOpt.text;
          valueSpan.classList.toggle('placeholder', !selOpt.value);
        }
        // Highlight selected option in panel
        panel.querySelectorAll('.bm-custom-select-option').forEach(function (opt) {
          opt.classList.toggle('selected', opt.dataset.value === select.value);
        });
      }

      // Build options
      Array.from(select.options).forEach(function (opt) {
        var item = document.createElement('div');
        item.className = 'bm-custom-select-option';
        if (!opt.value) item.classList.add('placeholder-opt');
        item.dataset.value = opt.value;
        item.textContent = opt.text;
        if (opt.selected) item.classList.add('selected');
        item.addEventListener('click', function (e) {
          e.stopPropagation();
          select.value = opt.value;
          // dispatch change so external onchange handlers fire
          select.dispatchEvent(new Event('change', { bubbles: true }));
          syncValue();
          close();
        });
        panel.appendChild(item);
      });

      syncValue();

      // Toggle open/close
      function open() {
        // Close any other open custom selects
        document.querySelectorAll('.bm-custom-select.open').forEach(function (el) {
          if (el !== wrapper) el.classList.remove('open');
        });
        wrapper.classList.add('open');
      }
      function close() { wrapper.classList.remove('open'); }

      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        wrapper.classList.contains('open') ? close() : open();
      });

      // Close on outside click
      document.addEventListener('click', function (e) {
        if (!wrapper.contains(e.target)) close();
      });

      // Keyboard: Escape closes
      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
      });

      // Assemble — insert wrapper before select, move select inside (hidden by CSS)
      select.parentNode.insertBefore(wrapper, select);
      wrapper.appendChild(trigger);
      wrapper.appendChild(panel);
      wrapper.appendChild(select);
    });
  }

  // ═══════════════════════════════════════════════════════════
  // DROPDOWN MENU
  // ═══════════════════════════════════════════════════════════
  function initDropdowns() {
    document.querySelectorAll('.bm-dropdown').forEach(function (dropdown) {
      var trigger = dropdown.querySelector('[data-dropdown-trigger]');
      if (!trigger) return;
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = dropdown.classList.contains('open');
        // Close all other dropdowns
        document.querySelectorAll('.bm-dropdown.open').forEach(function (d) { d.classList.remove('open'); });
        if (!isOpen) dropdown.classList.add('open');
      });
    });
    document.addEventListener('click', function () {
      document.querySelectorAll('.bm-dropdown.open').forEach(function (d) { d.classList.remove('open'); });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // TABS
  // ═══════════════════════════════════════════════════════════
  function initTabs() {
    document.querySelectorAll('[data-tab-group]').forEach(function (group) {
      var tabs = group.querySelectorAll('[data-tab]');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var target = tab.getAttribute('data-tab');
          var groupName = group.getAttribute('data-tab-group');
          tabs.forEach(function (t) { t.classList.remove('active'); });
          tab.classList.add('active');
          document.querySelectorAll('[data-tab-panel="' + groupName + '"]').forEach(function (panel) {
            panel.style.display = panel.getAttribute('data-tab-content') === target ? 'block' : 'none';
          });
        });
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // FOCUS TRAP (used by modal, drawer, command palette)
  // ═══════════════════════════════════════════════════════════
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  var _activeTrap = null;
  var _lastFocused = null;

  function trapFocus(container) {
    _lastFocused = document.activeElement;
    _activeTrap = container;
    container.addEventListener('keydown', _trapHandler);
    var first = container.querySelectorAll(FOCUSABLE)[0];
    if (first) setTimeout(function () { first.focus(); }, 50);
  }

  function releaseFocus(container) {
    if (container) container.removeEventListener('keydown', _trapHandler);
    _activeTrap = null;
    if (_lastFocused && _lastFocused.focus) _lastFocused.focus();
    _lastFocused = null;
  }

  function _trapHandler(e) {
    if (e.key !== 'Tab') return;
    var els = _activeTrap.querySelectorAll(FOCUSABLE);
    if (!els.length) return;
    var first = els[0], last = els[els.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  // ═══════════════════════════════════════════════════════════
  // MODAL
  // ═══════════════════════════════════════════════════════════
  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      trapFocus(modal);
    }
  }

  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      releaseFocus(modal);
    }
  }

  // Close modal on backdrop click
  function initModals() {
    document.querySelectorAll('.bm-modal-backdrop').forEach(function (backdrop) {
      backdrop.addEventListener('click', function (e) {
        if (e.target === backdrop) {
          backdrop.style.display = 'none';
          document.body.style.overflow = '';
          releaseFocus(backdrop);
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', function () {
    Settings._apply();
    initLoadingBar();
    // Auto page-load progress bar
    LoadingBar.start();
    setTimeout(LoadingBar.done, 500);
    initTabs();
    initAccordion();
    initDrawers();
    initDropdowns();
    initCustomSelects();
    initModals();
    initDatepickers();
    initSteppers();
    initRangeSliders();
    initOTP();
    initCounters();
    initTooltips();
    initPopovers();
    initScrollTop();
    initRating();
    initTagsInputs();
    initClipboard();
    initImageInputs();
    initPasswordMeters();
    initCarousels();
    initLightbox();
    initAutoValidation();

    // User menu
    var userMenuTrigger = document.getElementById('userMenuTrigger');
    if (userMenuTrigger) userMenuTrigger.addEventListener('click', toggleUserMenu);
    var userMenuBg = document.getElementById('userMenuBackdrop');
    if (userMenuBg) userMenuBg.addEventListener('click', closeUserMenu);

    // Notification
    var notifTrigger = document.getElementById('notifTrigger');
    if (notifTrigger) notifTrigger.addEventListener('click', toggleNotifPanel);
    var notifBg = document.getElementById('notifBackdrop');
    if (notifBg) notifBg.addEventListener('click', closeNotifPanel);

    // Command palette
    var commandOverlay = document.getElementById('commandPalette');
    if (commandOverlay) {
      commandOverlay.addEventListener('click', function (e) {
        if (e.target === commandOverlay) closeCommand();
      });
      var commandInput = commandOverlay.querySelector('.bm-command-input');
      if (commandInput) {
        commandInput.addEventListener('keydown', function (e) {
          if (e.key === 'Escape') closeCommand();
        });
      }
    }

    // Search button opens command palette
    var searchBtn = document.getElementById('searchBtn');
    if (searchBtn) searchBtn.addEventListener('click', openCommand);

    // Settings panel trigger
    var settingsTrigger = document.getElementById('settingsTrigger');
    if (settingsTrigger) settingsTrigger.addEventListener('click', openSettingsPanel);
    var settingsOverlay = document.querySelector('[data-drawer-overlay="settingsPanel"]');
    if (settingsOverlay) settingsOverlay.addEventListener('click', closeSettingsPanel);

    // Wire loading bar on internal link navigation
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || href.indexOf('javascript') === 0 || a.target) return;
      LoadingBar.start();
    });

    // ESC closes everything + arrow key nav for command palette
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeUserMenu();
        closeNotifPanel();
        closeCommand();
        closeSettingsPanel();
        _datepickers.forEach(function (dp) { dp.close(); });
      }
      // Ctrl+K / Cmd+K → open command palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openCommand();
      }
      // Arrow key navigation inside command palette
      var palette = document.getElementById('commandPalette');
      if (palette && palette.classList.contains('open')) {
        var items = Array.from(palette.querySelectorAll('.bm-command-item'));
        if (!items.length) return;
        var selected = palette.querySelector('.bm-command-item.selected');
        var idx = items.indexOf(selected);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (selected) selected.classList.remove('selected');
          items[(idx + 1) % items.length].classList.add('selected');
          items[(idx + 1) % items.length].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (selected) selected.classList.remove('selected');
          var prev = idx <= 0 ? items.length - 1 : idx - 1;
          items[prev].classList.add('selected');
          items[prev].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter' && selected) {
          e.preventDefault();
          var dest = selected.getAttribute('href') || selected.dataset.href;
          if (dest) window.location.href = dest;
          else selected.click();
          closeCommand();
        }
      }
    });
  });

  // ═══════════════════════════════════════════════════════════
  // DATA GRID
  // ═══════════════════════════════════════════════════════════
  function KtDataGrid(el, opts) {
    var self = this;
    self.el = el;
    self.opts = Object.assign({
      pageSize: 10,
      pageSizes: [5, 10, 25, 50],
      columns: [],
      data: [],
      selectable: false
    }, opts || {});
    self.currentPage = 1;
    self.currentPageSize = self.opts.pageSize;
    self.sortCol = null;
    self.sortDir = 'asc';
    self.filterText = '';
    self.selectedRows = new Set();

    self._filteredData = function() {
      var q = self.filterText.toLowerCase();
      if (!q) return self.opts.data.slice();
      return self.opts.data.filter(function(row) {
        return self.opts.columns.some(function(col) {
          var v = row[col.key];
          return v !== undefined && String(v).toLowerCase().indexOf(q) !== -1;
        });
      });
    };

    self._sortedData = function(data) {
      if (!self.sortCol) return data;
      return data.slice().sort(function(a, b) {
        var av = a[self.sortCol], bv = b[self.sortCol];
        if (av == null) av = '';
        if (bv == null) bv = '';
        if (av < bv) return self.sortDir === 'asc' ? -1 : 1;
        if (av > bv) return self.sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    };

    self._pagedData = function(data) {
      var start = (self.currentPage - 1) * self.currentPageSize;
      return data.slice(start, start + self.currentPageSize);
    };

    self.render = function() {
      var filtered = self._filteredData();
      var sorted = self._sortedData(filtered);
      var total = sorted.length;
      var paged = self._pagedData(sorted);
      var totalPages = Math.max(1, Math.ceil(total / self.currentPageSize));
      if (self.currentPage > totalPages) self.currentPage = totalPages;
      el.innerHTML = '';

      // Toolbar
      var toolbar = document.createElement('div');
      toolbar.className = 'bm-datagrid-toolbar';

      var searchWrap = document.createElement('div');
      searchWrap.className = 'bm-datagrid-search';
      searchWrap.innerHTML = '<i class="ph ph-magnifying-glass bm-datagrid-search-icon"></i>';
      var searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.placeholder = 'Search…';
      searchInput.value = self.filterText;
      searchInput.addEventListener('input', function() {
        self.filterText = this.value;
        self.currentPage = 1;
        self.render();
      });
      searchWrap.appendChild(searchInput);
      toolbar.appendChild(searchWrap);

      var info = document.createElement('div');
      info.className = 'bm-datagrid-info';
      var start = total === 0 ? 0 : (self.currentPage - 1) * self.currentPageSize + 1;
      var end = Math.min(self.currentPage * self.currentPageSize, total);
      info.textContent = total === 0 ? 'No results' : start + '–' + end + ' of ' + total;
      toolbar.appendChild(info);
      el.appendChild(toolbar);

      // Table
      var tableWrap = document.createElement('div');
      tableWrap.style.overflowX = 'auto';
      var table = document.createElement('table');
      table.className = 'bm-datagrid-table';

      // Head
      var thead = document.createElement('thead');
      var htr = document.createElement('tr');
      if (self.opts.selectable) {
        var thCb = document.createElement('th');
        thCb.style.width = '2.5rem';
        var cbAll = document.createElement('input');
        cbAll.type = 'checkbox';
        cbAll.addEventListener('change', function() {
          if (this.checked) {
            paged.forEach(function(r, i) { self.selectedRows.add(i); });
          } else {
            self.selectedRows.clear();
          }
          self.render();
        });
        thCb.appendChild(cbAll);
        htr.appendChild(thCb);
      }
      self.opts.columns.forEach(function(col) {
        var th = document.createElement('th');
        th.textContent = col.label;
        if (col.sortable !== false) {
          th.classList.add('sortable');
          if (self.sortCol === col.key) th.classList.add('sort-' + self.sortDir);
          var sortIcon = document.createElement('i');
          sortIcon.className = 'bm-datagrid-sort-icon ph ph-' + (self.sortCol === col.key ? (self.sortDir === 'asc' ? 'arrow-up' : 'arrow-down') : 'arrows-down-up');
          th.appendChild(sortIcon);
          th.addEventListener('click', function() {
            if (self.sortCol === col.key) {
              self.sortDir = self.sortDir === 'asc' ? 'desc' : 'asc';
            } else {
              self.sortCol = col.key;
              self.sortDir = 'asc';
            }
            self.render();
          });
        }
        if (col.width) th.style.width = col.width;
        htr.appendChild(th);
      });
      thead.appendChild(htr);
      table.appendChild(thead);

      // Body
      var tbody = document.createElement('tbody');
      if (paged.length === 0) {
        var emptyTr = document.createElement('tr');
        var emptyTd = document.createElement('td');
        emptyTd.colSpan = self.opts.columns.length + (self.opts.selectable ? 1 : 0);
        emptyTd.innerHTML = '<div class="bm-datagrid-empty"><i class="ph ph-magnifying-glass-minus bm-datagrid-empty-icon"></i>No matching records found</div>';
        emptyTr.appendChild(emptyTd);
        tbody.appendChild(emptyTr);
      } else {
        paged.forEach(function(row, ri) {
          var tr = document.createElement('tr');
          if (self.selectedRows.has(ri)) tr.classList.add('selected');
          if (self.opts.selectable) {
            var tdCb = document.createElement('td');
            var rowCb = document.createElement('input');
            rowCb.type = 'checkbox';
            rowCb.checked = self.selectedRows.has(ri);
            rowCb.addEventListener('change', function() {
              if (this.checked) self.selectedRows.add(ri); else self.selectedRows.delete(ri);
              self.render();
            });
            tdCb.appendChild(rowCb);
            tr.appendChild(tdCb);
          }
          self.opts.columns.forEach(function(col) {
            var td = document.createElement('td');
            var val = row[col.key];
            if (typeof col.render === 'function') {
              var content = col.render(val, row);
              if (typeof content === 'string') td.innerHTML = content;
              else td.appendChild(content);
            } else {
              td.textContent = val !== undefined ? val : '';
            }
            tr.appendChild(td);
          });
          if (typeof self.opts.onRowClick === 'function') {
            tr.style.cursor = 'pointer';
            tr.addEventListener('click', function() { self.opts.onRowClick(row, ri); });
          }
          tbody.appendChild(tr);
        });
      }
      table.appendChild(tbody);
      tableWrap.appendChild(table);
      el.appendChild(tableWrap);

      // Footer
      var footer = document.createElement('div');
      footer.className = 'bm-datagrid-footer';

      var pageSizeWrap = document.createElement('div');
      pageSizeWrap.className = 'bm-datagrid-page-size';
      pageSizeWrap.innerHTML = '<span>Rows per page</span>';
      var psSelect = document.createElement('select');
      self.opts.pageSizes.forEach(function(s) {
        var o = document.createElement('option');
        o.value = s;
        o.textContent = s;
        if (s === self.currentPageSize) o.selected = true;
        psSelect.appendChild(o);
      });
      psSelect.addEventListener('change', function() {
        self.currentPageSize = parseInt(this.value);
        self.currentPage = 1;
        self.render();
      });
      pageSizeWrap.appendChild(psSelect);
      footer.appendChild(pageSizeWrap);

      var pages = document.createElement('div');
      pages.className = 'bm-datagrid-pages';
      function makePageBtn(label, page, disabled, active, isIcon) {
        var btn = document.createElement('button');
        btn.className = 'bm-datagrid-page-btn' + (active ? ' active' : '');
        if (isIcon) {
          btn.innerHTML = '<i class="ph ph-' + label + '"></i>';
        } else {
          btn.textContent = label;
        }
        btn.disabled = disabled;
        if (!disabled && !active) {
          btn.addEventListener('click', function() { self.currentPage = page; self.render(); });
        }
        return btn;
      }
      pages.appendChild(makePageBtn('caret-left', self.currentPage - 1, self.currentPage === 1, false, true));
      var startP = Math.max(1, self.currentPage - 2);
      var endP = Math.min(totalPages, startP + 4);
      if (startP > 1) pages.appendChild(makePageBtn('1', 1, false, false, false));
      if (startP > 2) { var ell = document.createElement('span'); ell.textContent = '…'; ell.style.padding = '0 0.25rem'; ell.style.color = 'var(--muted-foreground)'; pages.appendChild(ell); }
      for (var pp = startP; pp <= endP; pp++) pages.appendChild(makePageBtn(pp, pp, false, pp === self.currentPage, false));
      if (endP < totalPages - 1) { var ell2 = document.createElement('span'); ell2.textContent = '…'; ell2.style.padding = '0 0.25rem'; ell2.style.color = 'var(--muted-foreground)'; pages.appendChild(ell2); }
      if (endP < totalPages) pages.appendChild(makePageBtn(totalPages, totalPages, false, false, false));
      pages.appendChild(makePageBtn('caret-right', self.currentPage + 1, self.currentPage === totalPages, false, true));
      footer.appendChild(pages);
      el.appendChild(footer);
    };

    self.setData = function(data) { self.opts.data = data; self.currentPage = 1; self.render(); };
    self.getData = function() { return self.opts.data; };

    el.className = (el.className + ' bm-datagrid-wrap').trim();
    self.render();
  }

  // ═══════════════════════════════════════════════════════════
  // FILE DROPZONE
  // ═══════════════════════════════════════════════════════════
  function KtDropzone(el, opts) {
    var self = this;
    self.el = el;
    self.opts = Object.assign({
      accept: '*/*',
      multiple: true,
      maxSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 10,
      onAdd: null,
      onRemove: null
    }, opts || {});
    self.files = [];

    el.classList.add('bm-dropzone');
    el.innerHTML = [
      '<input type="file" accept="' + self.opts.accept + '"' + (self.opts.multiple ? ' multiple' : '') + '>',
      '<div class="bm-dropzone-icon"><i class="ph ph-cloud-arrow-up"></i></div>',
      '<div class="bm-dropzone-title">Drop files here or <strong style="color:var(--primary);cursor:pointer;">browse</strong></div>',
      '<div class="bm-dropzone-hint">Max file size: ' + _formatSize(self.opts.maxSize) + (self.opts.multiple ? ' · Up to ' + self.opts.maxFiles + ' files' : '') + '</div>',
      '<div class="bm-dropzone-files" data-dz-files></div>'
    ].join('');

    var input = el.querySelector('input[type="file"]');
    var fileList = el.querySelector('[data-dz-files]');

    function _formatSize(bytes) {
      if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
      if (bytes >= 1024) return (bytes / 1024).toFixed(0) + ' KB';
      return bytes + ' B';
    }

    function _ext(name) {
      var m = name.match(/\.([a-z0-9]+)$/i);
      return m ? m[1].toUpperCase() : 'FILE';
    }

    function _icon(name) {
      var ext = (name.match(/\.([a-z0-9]+)$/i) || ['',''])[1].toLowerCase();
      var map = { pdf: 'file-text', png: 'image', jpg: 'image', jpeg: 'image', gif: 'image', svg: 'image', mp4: 'video-camera', mp3: 'music-note', zip: 'archive', rar: 'archive', doc: 'file-text', docx: 'file-text', xls: 'table', xlsx: 'table', csv: 'table' };
      return map[ext] || 'paperclip';
    }

    function addFiles(fileObjs) {
      for (var i = 0; i < fileObjs.length; i++) {
        if (self.files.length >= self.opts.maxFiles) break;
        var f = fileObjs[i];
        if (f.size > self.opts.maxSize) {
          App.toast.warning('File too large', f.name + ' exceeds the ' + _formatSize(self.opts.maxSize) + ' limit.');
          continue;
        }
        self.files.push(f);
        (function(file, idx) {
          var item = document.createElement('div');
          item.className = 'bm-dropzone-file';
          item.dataset.idx = idx;
          item.innerHTML = [
            '<div class="bm-dropzone-file-icon"><i class="ph ph-' + _icon(file.name) + '"></i></div>',
            '<div class="bm-dropzone-file-info">',
              '<div class="bm-dropzone-file-name">' + file.name + '</div>',
              '<div class="bm-dropzone-file-size">' + _formatSize(file.size) + '</div>',
              '<div class="bm-dropzone-file-progress"><div class="bm-dropzone-file-progress-bar" style="width:0%"></div></div>',
            '</div>',
            '<button class="bm-dropzone-file-remove" type="button" title="Remove"><i class="ph ph-x"></i></button>'
          ].join('');
          var bar = item.querySelector('.bm-dropzone-file-progress-bar');
          var removeBtn = item.querySelector('.bm-dropzone-file-remove');
          fileList.appendChild(item);
          // Simulate upload progress
          var pct = 0;
          var iv = setInterval(function() {
            pct = Math.min(pct + Math.random() * 20, 100);
            bar.style.width = pct + '%';
            if (pct >= 100) { clearInterval(iv); bar.style.background = 'var(--success)'; }
          }, 120);
          removeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            var fidx = parseInt(item.dataset.idx);
            self.files.splice(fidx, 1);
            item.remove();
            if (typeof self.opts.onRemove === 'function') self.opts.onRemove(file);
            // Reindex remaining items
            Array.from(fileList.querySelectorAll('.bm-dropzone-file')).forEach(function(el, i) { el.dataset.idx = i; });
          });
          if (typeof self.opts.onAdd === 'function') self.opts.onAdd(file);
        })(f, self.files.length - 1);
      }
    }

    input.addEventListener('change', function() { addFiles(Array.from(this.files)); this.value = ''; });

    el.addEventListener('dragover', function(e) { e.preventDefault(); el.classList.add('dragover'); });
    el.addEventListener('dragleave', function(e) {
      if (!el.contains(e.relatedTarget)) el.classList.remove('dragover');
    });
    el.addEventListener('drop', function(e) {
      e.preventDefault();
      el.classList.remove('dragover');
      if (e.dataTransfer && e.dataTransfer.files.length) addFiles(Array.from(e.dataTransfer.files));
    });

    self.getFiles = function() { return self.files.slice(); };
    self.clear = function() { self.files = []; fileList.innerHTML = ''; };
  }

  // ═══════════════════════════════════════════════════════════
  // STEPPER / WIZARD
  // ═══════════════════════════════════════════════════════════
  function KtStepper(el, opts) {
    var self = this;
    self.el = el;
    self.opts = Object.assign({
      onStepChange: null,
      onComplete: null,
      onBeforeNext: null
    }, opts || {});

    var steps = Array.from(el.querySelectorAll('[data-stepper-step]'));
    var panels = Array.from(el.querySelectorAll('[data-stepper-panel]'));
    var lines = Array.from(el.querySelectorAll('[data-stepper-line]'));
    self.current = 0;
    self.total = steps.length;

    function updateLines() {
      lines.forEach(function(l, i) {
        l.classList.toggle('filled', i < self.current);
      });
    }

    function render() {
      steps.forEach(function(step, i) {
        step.classList.remove('active', 'completed');
        if (i === self.current) step.classList.add('active');
        else if (i < self.current) step.classList.add('completed');
        // Update bullet: show check icon for completed
        var bullet = step.querySelector('.bm-stepper-bullet');
        if (bullet) {
          if (i < self.current) {
            bullet.innerHTML = '<i class="ph ph-check"></i>';
          } else bullet.textContent = i + 1;
        }
      });
      panels.forEach(function(p, i) {
        p.classList.toggle('active', i === self.current);
      });
      updateLines();
      // Update nav buttons
      var prevBtns = el.querySelectorAll('[data-stepper-prev]');
      var nextBtns = el.querySelectorAll('[data-stepper-next]');
      var submitBtns = el.querySelectorAll('[data-stepper-submit]');
      prevBtns.forEach(function(b) { b.style.visibility = self.current === 0 ? 'hidden' : 'visible'; });
      nextBtns.forEach(function(b) { b.style.display = self.current === self.total - 1 ? 'none' : 'inline-flex'; });
      submitBtns.forEach(function(b) { b.style.display = self.current === self.total - 1 ? 'inline-flex' : 'none'; });
      if (typeof self.opts.onStepChange === 'function') self.opts.onStepChange(self.current, self.total);
    }

    el.querySelectorAll('[data-stepper-next]').forEach(function(btn) {
      btn.addEventListener('click', function() { self.next(); });
    });
    el.querySelectorAll('[data-stepper-prev]').forEach(function(btn) {
      btn.addEventListener('click', function() { self.prev(); });
    });
    el.querySelectorAll('[data-stepper-submit]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (typeof self.opts.onComplete === 'function') self.opts.onComplete();
      });
    });

    self.next = function() {
      if (self.current < self.total - 1) {
        if (typeof self.opts.onBeforeNext === 'function' && !self.opts.onBeforeNext(self.current, panels[self.current])) return;
        self.current++; render();
      }
    };
    self.prev = function() {
      if (self.current > 0) { self.current--; render(); }
    };
    self.goTo = function(i) {
      if (i >= 0 && i < self.total) { self.current = i; render(); }
    };
    self.reset = function() { self.current = 0; render(); };

    el._ktStepper = self;
    render();
  }

  function initSteppers() {
    document.querySelectorAll('[data-stepper]').forEach(function(el) {
      if (!el._ktStepper) new KtStepper(el);
    });
  }

  // ═══════════════════════════════════════════════════════════
  // RANGE SLIDER — fill track on input
  // ═══════════════════════════════════════════════════════════
  function initRangeSliders() {
    document.querySelectorAll('.bm-range').forEach(function(input) {
      if (input._ktRange) return;
      input._ktRange = true;

      function updateFill() {
        var min = parseFloat(input.min) || 0;
        var max = parseFloat(input.max) || 100;
        var val = parseFloat(input.value) || 0;
        var pct = ((val - min) / (max - min)) * 100;
        input.style.background = 'linear-gradient(to right, var(--primary) ' + pct + '%, var(--border) ' + pct + '%)';
        // Update sibling value display
        var wrap = input.closest('.bm-range-wrap');
        if (wrap) {
          var display = wrap.querySelector('.bm-range-value');
          if (display) {
            var suffix = input.dataset.suffix || '';
            var prefix = input.dataset.prefix || '';
            display.textContent = prefix + val + suffix;
          }
        }
      }
      input.addEventListener('input', updateFill);
      updateFill();
    });
  }

  // ═══════════════════════════════════════════════════════════
  // OTP INPUT — auto-advance, backspace, paste
  // ═══════════════════════════════════════════════════════════
  function initOTP() {
    document.querySelectorAll('.bm-otp').forEach(function(wrap) {
      if (wrap._ktOtp) return;
      wrap._ktOtp = true;
      var inputs = Array.from(wrap.querySelectorAll('.bm-otp-input'));

      inputs.forEach(function(input, i) {
        input.addEventListener('input', function(e) {
          var val = this.value.replace(/\D/g, '').slice(-1);
          this.value = val;
          this.classList.toggle('filled', val !== '');
          if (val && i < inputs.length - 1) inputs[i + 1].focus();
          _dispatchOTPChange(wrap, inputs);
        });

        input.addEventListener('keydown', function(e) {
          if (e.key === 'Backspace' && !this.value && i > 0) {
            inputs[i - 1].value = '';
            inputs[i - 1].classList.remove('filled');
            inputs[i - 1].focus();
            _dispatchOTPChange(wrap, inputs);
          }
          if (e.key === 'ArrowLeft' && i > 0) inputs[i - 1].focus();
          if (e.key === 'ArrowRight' && i < inputs.length - 1) inputs[i + 1].focus();
        });

        input.addEventListener('paste', function(e) {
          e.preventDefault();
          var text = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
          inputs.forEach(function(inp, j) {
            inp.value = text[j] || '';
            inp.classList.toggle('filled', !!inp.value);
          });
          var next = Math.min(text.length, inputs.length - 1);
          inputs[next].focus();
          _dispatchOTPChange(wrap, inputs);
        });

        input.addEventListener('focus', function() { this.select(); });
      });
    });
  }

  function _dispatchOTPChange(wrap, inputs) {
    var value = inputs.map(function(i) { return i.value; }).join('');
    wrap.dispatchEvent(new CustomEvent('otp:change', { detail: { value: value, complete: value.length === inputs.length }, bubbles: true }));
  }

  // ═══════════════════════════════════════════════════════════
  // DATE PICKER
  // ═══════════════════════════════════════════════════════════
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var DAYS_SHORT = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  function KtDatepicker(el, opts) {
    var self = this;
    self.el = el;
    self.opts = opts || {};
    self.value = null;
    self.viewYear = null;
    self.viewMonth = null;

    // Build wrapper
    var wrap = document.createElement('div');
    wrap.className = 'bm-datepicker';
    el.parentNode.insertBefore(wrap, el);

    // Input wrapper
    var inputWrap = document.createElement('div');
    inputWrap.className = 'bm-datepicker-input-wrap';
    el.classList.add('bm-input');
    el.readOnly = true;
    el.style.cursor = 'pointer';
    inputWrap.appendChild(el);

    var icon = document.createElement('i');
    icon.className = 'bm-datepicker-icon ph ph-calendar';
    inputWrap.appendChild(icon);
    wrap.appendChild(inputWrap);

    // Panel
    var panel = document.createElement('div');
    panel.className = 'bm-datepicker-panel';
    panel.innerHTML = [
      '<div class="bm-datepicker-header">',
        '<button class="bm-datepicker-nav" data-dp-prev><i class="ph ph-caret-left"></i></button>',
        '<span class="bm-datepicker-title" data-dp-title></span>',
        '<button class="bm-datepicker-nav" data-dp-next><i class="ph ph-caret-right"></i></button>',
      '</div>',
      '<div class="bm-datepicker-weekdays"></div>',
      '<div class="bm-datepicker-days"></div>',
      '<div class="bm-datepicker-footer">',
        '<button class="bm-btn bm-btn-ghost bm-btn-sm" data-dp-today>Today</button>',
        '<button class="bm-btn bm-btn-ghost bm-btn-sm" data-dp-clear>Clear</button>',
      '</div>'
    ].join('');
    wrap.appendChild(panel);

    // Render weekday headers
    var wdEl = panel.querySelector('.bm-datepicker-weekdays');
    DAYS_SHORT.forEach(function(d) {
      var wd = document.createElement('div');
      wd.className = 'bm-datepicker-weekday';
      wd.textContent = d;
      wdEl.appendChild(wd);
    });

    // Init view to today
    var today = new Date();
    self.viewYear = today.getFullYear();
    self.viewMonth = today.getMonth();

    self._render = function() {
      var title = panel.querySelector('[data-dp-title]');
      title.textContent = MONTHS[self.viewMonth] + ' ' + self.viewYear;

      var grid = panel.querySelector('.bm-datepicker-days');
      grid.innerHTML = '';

      var firstDay = new Date(self.viewYear, self.viewMonth, 1).getDay();
      var daysInMonth = new Date(self.viewYear, self.viewMonth + 1, 0).getDate();
      var daysInPrev = new Date(self.viewYear, self.viewMonth, 0).getDate();

      // Prev month tail
      for (var i = firstDay - 1; i >= 0; i--) {
        var btn = document.createElement('button');
        btn.className = 'bm-datepicker-day other-month';
        btn.textContent = daysInPrev - i;
        btn.type = 'button';
        grid.appendChild(btn);
      }

      var todayStr = today.getFullYear() + '-' + pad(today.getMonth()+1) + '-' + pad(today.getDate());

      // Current month days
      for (var d = 1; d <= daysInMonth; d++) {
        var dateStr = self.viewYear + '-' + pad(self.viewMonth+1) + '-' + pad(d);
        var btn = document.createElement('button');
        btn.className = 'bm-datepicker-day';
        btn.textContent = d;
        btn.type = 'button';
        btn.dataset.date = dateStr;
        if (dateStr === todayStr) btn.classList.add('today');
        if (self.value && dateStr === self.value) btn.classList.add('selected');
        // min/max
        if (self.opts.minDate && dateStr < self.opts.minDate) btn.classList.add('disabled');
        if (self.opts.maxDate && dateStr > self.opts.maxDate) btn.classList.add('disabled');
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          var d = this.dataset.date;
          if (!d || this.classList.contains('disabled')) return;
          self._select(d);
        });
        grid.appendChild(btn);
      }

      // Next month fill
      var total = firstDay + daysInMonth;
      var remaining = total % 7 === 0 ? 0 : 7 - (total % 7);
      for (var n = 1; n <= remaining; n++) {
        var btn = document.createElement('button');
        btn.className = 'bm-datepicker-day other-month';
        btn.textContent = n;
        btn.type = 'button';
        grid.appendChild(btn);
      }
    };

    function pad(n) { return n < 10 ? '0' + n : '' + n; }

    self._select = function(dateStr) {
      self.value = dateStr;
      // Format display value
      var parts = dateStr.split('-');
      var fmt = self.opts.format || 'DD/MM/YYYY';
      var display = fmt
        .replace('YYYY', parts[0])
        .replace('MM', parts[1])
        .replace('DD', parts[2]);
      el.value = display;
      el.dataset.value = dateStr;
      self.close();
      // Dispatch change event
      el.dispatchEvent(new Event('change', { bubbles: true }));
      if (typeof self.opts.onChange === 'function') self.opts.onChange(dateStr, display);
    };

    self.open = function() {
      self._render();
      panel.classList.add('open');
    };

    self.close = function() {
      panel.classList.remove('open');
    };

    self.toggle = function() {
      panel.classList.contains('open') ? self.close() : self.open();
    };

    // Events
    el.addEventListener('click', function(e) {
      e.stopPropagation();
      self.toggle();
    });

    panel.querySelector('[data-dp-prev]').addEventListener('click', function(e) {
      e.stopPropagation();
      self.viewMonth--;
      if (self.viewMonth < 0) { self.viewMonth = 11; self.viewYear--; }
      self._render();
    });

    panel.querySelector('[data-dp-next]').addEventListener('click', function(e) {
      e.stopPropagation();
      self.viewMonth++;
      if (self.viewMonth > 11) { self.viewMonth = 0; self.viewYear++; }
      self._render();
    });

    panel.querySelector('[data-dp-today]').addEventListener('click', function(e) {
      e.stopPropagation();
      self.viewYear = today.getFullYear();
      self.viewMonth = today.getMonth();
      var d = today;
      self._select(d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate()));
    });

    panel.querySelector('[data-dp-clear]').addEventListener('click', function(e) {
      e.stopPropagation();
      self.value = null;
      el.value = '';
      el.dataset.value = '';
      self.close();
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });

    document.addEventListener('click', function() { self.close(); });
    panel.addEventListener('click', function(e) { e.stopPropagation(); });
  }

  var _datepickers = [];

  function initDatepickers() {
    document.querySelectorAll('[data-datepicker]').forEach(function(el) {
      if (el._ktDatepicker) return;
      var opts = {};
      if (el.dataset.format) opts.format = el.dataset.format;
      if (el.dataset.minDate) opts.minDate = el.dataset.minDate;
      if (el.dataset.maxDate) opts.maxDate = el.dataset.maxDate;
      var dp = new KtDatepicker(el, opts);
      el._ktDatepicker = dp;
      _datepickers.push(dp);
    });
  }

  // ═══════════════════════════════════════════════════════════
  // SETTINGS PROVIDER
  // ═══════════════════════════════════════════════════════════
  var SETTINGS_KEY = 'admin-settings';
  var _defaultSettings = { density: 'normal', sidebarMode: 'fixed', contentWidth: 'default', animations: true, rtl: false };
  var _settingsAnimStyle = null;

  var Settings = {
    _data: null,
    _load: function () {
      try {
        var s = JSON.parse(localStorage.getItem(SETTINGS_KEY));
        this._data = Object.assign({}, _defaultSettings, s || {});
      } catch (e) {
        this._data = Object.assign({}, _defaultSettings);
      }
    },
    get: function (key) {
      if (!this._data) this._load();
      return key ? this._data[key] : Object.assign({}, this._data);
    },
    set: function (key, val) {
      if (!this._data) this._load();
      this._data[key] = val;
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(this._data));
      this._apply();
    },
    _apply: function () {
      if (!this._data) this._load();
      var d = this._data;
      var body = document.body;

      // Density
      body.classList.remove('bm-density-compact', 'bm-density-comfortable');
      if (d.density !== 'normal') body.classList.add('bm-density-' + d.density);

      // Sidebar mode
      if (d.sidebarMode === 'collapsed') body.classList.add('bm-sidebar-collapse');
      else body.classList.remove('bm-sidebar-collapse');

      // Content width
      document.body.classList.toggle('bm-layout-full', d.contentWidth === 'full');

      // Animations – inject/remove a blanket override rule
      if (!d.animations) {
        if (!_settingsAnimStyle) {
          _settingsAnimStyle = document.createElement('style');
          _settingsAnimStyle.id = 'bm-no-animations';
          document.head.appendChild(_settingsAnimStyle);
        }
        _settingsAnimStyle.textContent = '*, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }';
      } else {
        if (_settingsAnimStyle) _settingsAnimStyle.textContent = '';
      }

      // RTL direction
      document.documentElement.dir = d.rtl ? 'rtl' : 'ltr';

      _syncSettingsUI();
    }
  };

  function _applyLayoutIcons(width) {
    var isFull = width === 'full';
    document.querySelectorAll('[data-layout-icon]').forEach(function (el) {
      el.textContent = isFull ? 'close_fullscreen' : 'open_in_full';
    });
    document.querySelectorAll('[data-layout-label]').forEach(function (el) {
      el.textContent = isFull ? 'Widescreen' : 'Box Layout';
    });
  }

  var _layoutToggleTimer = null;
  var LayoutManager = {
    toggle: function () {
      if (_layoutToggleTimer) return;
      var current = Settings.get('contentWidth');
      var next = current === 'full' ? 'default' : 'full';
      Settings.set('contentWidth', next);
      _applyLayoutIcons(next);
      _layoutToggleTimer = setTimeout(function () { _layoutToggleTimer = null; }, 300);
    },
    get: function () { return Settings.get('contentWidth'); }
  };

  function _syncSettingsUI() {
    var s = Settings.get();
    document.querySelectorAll('[data-settings-density]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.settingsDensity === s.density);
    });
    document.querySelectorAll('[data-settings-sidebar]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.settingsSidebar === s.sidebarMode);
    });
    document.querySelectorAll('[data-settings-width]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.settingsWidth === s.contentWidth);
    });
    var animSwitch = document.getElementById('settingsAnimSwitch');
    if (animSwitch) {
      animSwitch.classList.toggle('active', s.animations);
      animSwitch.setAttribute('aria-checked', String(!!s.animations));
    }
    var rtlSwitch = document.getElementById('settingsRTLSwitch');
    if (rtlSwitch) {
      rtlSwitch.classList.toggle('active', s.rtl);
      rtlSwitch.setAttribute('aria-checked', String(!!s.rtl));
    }
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.langBtn === (window.i18n ? window.i18n.getLang() : 'en'));
    });
    _applyLayoutIcons(s.contentWidth);
  }

  function openSettingsPanel() {
    var overlay = document.querySelector('[data-drawer-overlay="settingsPanel"]');
    var drawer  = document.getElementById('settingsPanel');
    var trigger = document.getElementById('settingsTrigger');
    if (overlay) overlay.classList.add('open');
    if (drawer)  { drawer.classList.add('open'); trapFocus(drawer); }
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    _syncSettingsUI();
    document.body.style.overflow = 'hidden';
  }

  function closeSettingsPanel() {
    var overlay = document.querySelector('[data-drawer-overlay="settingsPanel"]');
    var drawer  = document.getElementById('settingsPanel');
    var trigger = document.getElementById('settingsTrigger');
    if (overlay) overlay.classList.remove('open');
    if (drawer)  { drawer.classList.remove('open'); releaseFocus(drawer); }
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // ═══════════════════════════════════════════════════════════
  // SKELETON LOADING
  // ═══════════════════════════════════════════════════════════
  var _skeletonMap = {};
  var skeleton = {
    show: function(selector, opts) {
      var container = typeof selector === 'string' ? document.querySelector(selector) : selector;
      if (!container) return;
      var o = opts || {};
      var count = o.lines || 3;
      var type  = o.type  || 'text'; // text | card | avatar
      var wrapper = document.createElement('div');
      wrapper.className = 'bm-skeleton-wrapper';
      wrapper.setAttribute('aria-busy', 'true');
      wrapper.setAttribute('role', 'status');
      wrapper.innerHTML = '<span class="sr-only">Loading…</span>';
      for (var i = 0; i < count; i++) {
        var s = document.createElement('div');
        s.className = type === 'card' ? 'bm-skeleton-card' : type === 'avatar' ? 'bm-skeleton-avatar' : 'bm-skeleton-text';
        wrapper.appendChild(s);
      }
      var key = selector.toString();
      _skeletonMap[key] = { wrapper: wrapper, origDisplay: container.style.display, children: [] };
      Array.from(container.children).forEach(function(ch) {
        _skeletonMap[key].children.push({ el: ch, display: ch.style.display });
        ch.style.display = 'none';
      });
      container.appendChild(wrapper);
    },
    hide: function(selector) {
      var container = typeof selector === 'string' ? document.querySelector(selector) : selector;
      if (!container) return;
      var key = selector.toString();
      var data = _skeletonMap[key];
      if (!data) return;
      if (data.wrapper.parentNode) data.wrapper.parentNode.removeChild(data.wrapper);
      data.children.forEach(function(ch) { ch.el.style.display = ch.display; });
      delete _skeletonMap[key];
    }
  };

  // ═══════════════════════════════════════════════════════════
  // ANIMATED COUNTER
  // ═══════════════════════════════════════════════════════════
  function initCounters() {
    document.querySelectorAll('[data-counter]').forEach(function (el) {
      if (el._ktCounter) return;
      el._ktCounter = true;

      var target   = parseFloat(el.dataset.counter) || 0;
      var prefix   = el.dataset.counterPrefix  || '';
      var suffix   = el.dataset.counterSuffix  || '';
      var duration = parseInt(el.dataset.counterDuration, 10) || 1600;
      var decimals = (String(target).split('.')[1] || '').length;

      function run() {
        var startTime = null;
        function step(ts) {
          if (!startTime) startTime = ts;
          var progress = Math.min((ts - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          var current = target * eased;
          el.textContent = prefix + (decimals ? current.toFixed(decimals) : Math.floor(current).toLocaleString()) + suffix;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = prefix + (decimals ? target.toFixed(decimals) : target.toLocaleString()) + suffix;
          }
        }
        requestAnimationFrame(step);
      }

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) { obs.unobserve(el); run(); }
          });
        }, { threshold: 0.3 }).observe(el);
      } else {
        run();
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // TOOLTIP (JS-positioned)
  // ═══════════════════════════════════════════════════════════
  function initTooltips() {
    document.querySelectorAll('[data-bm-tooltip]').forEach(function (el) {
      if (el._bmTooltip) return;
      el._bmTooltip = true;
      var tip;
      el.addEventListener('mouseenter', function () {
        tip = document.createElement('div');
        tip.className = 'bm-tooltip-tip';
        tip.textContent = el.getAttribute('data-bm-tooltip');
        document.body.appendChild(tip);
        positionTooltip(el, tip, el.getAttribute('data-bm-placement') || 'top');
      });
      el.addEventListener('mouseleave', function () { if (tip) { tip.remove(); tip = null; } });
    });
  }
  function positionTooltip(anchor, tip, placement) {
    var r = anchor.getBoundingClientRect();
    var tw = tip.offsetWidth, th = tip.offsetHeight;
    var gap = 8;
    var top, left;
    if (placement === 'bottom') { top = r.bottom + gap; left = r.left + r.width / 2 - tw / 2; }
    else if (placement === 'left')  { top = r.top + r.height / 2 - th / 2; left = r.left - tw - gap; }
    else if (placement === 'right') { top = r.top + r.height / 2 - th / 2; left = r.right + gap; }
    else { top = r.top - th - gap; left = r.left + r.width / 2 - tw / 2; }
    tip.style.top  = Math.max(4, top)  + 'px';
    tip.style.left = Math.max(4, left) + 'px';
  }

  // ═══════════════════════════════════════════════════════════
  // POPOVER
  // ═══════════════════════════════════════════════════════════
  var _activePopover = null;
  function initPopovers() {
    document.querySelectorAll('[data-bm-popover]').forEach(function (trigger) {
      if (trigger._bmPopover) return;
      trigger._bmPopover = true;
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        if (_activePopover && _activePopover._trigger === trigger) {
          destroyActivePopover(); return;
        }
        destroyActivePopover();
        var title = trigger.getAttribute('data-bm-popover-title') || '';
        var content = trigger.getAttribute('data-bm-popover') || '';
        var placement = trigger.getAttribute('data-bm-placement') || 'bottom';
        var pop = document.createElement('div');
        pop.className = 'bm-popover';
        pop.setAttribute('data-placement', placement);
        pop.innerHTML =
          (title ? '<div class="bm-popover-title">' + escapeHtml(title) + '</div>' : '') +
          '<div class="bm-popover-body">' + content + '</div>' +
          '<div class="bm-popover-arrow"></div>';
        trigger.parentElement.style.position = 'relative';
        trigger.parentElement.appendChild(pop);
        pop._trigger = trigger;
        _activePopover = pop;
      });
    });
    document.addEventListener('click', function () { destroyActivePopover(); });
  }
  function destroyActivePopover() {
    if (_activePopover) { _activePopover.remove(); _activePopover = null; }
  }
  function escapeHtml(s) {
    var d = document.createElement('div');
    d.appendChild(document.createTextNode(s));
    return d.innerHTML;
  }

  // ═══════════════════════════════════════════════════════════
  // SCROLL TO TOP
  // ═══════════════════════════════════════════════════════════
  function initScrollTop() {
    var btn = document.getElementById('bm-scroll-top');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'bm-scroll-top';
      btn.className = 'bm-scroll-top';
      btn.setAttribute('aria-label', 'Scroll to top');
      btn.innerHTML = '<i class="ph ph-arrow-up"></i>';
      document.body.appendChild(btn);
    }
    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // OVERLAY / BLOCK UI
  // ═══════════════════════════════════════════════════════════
  function showOverlay(target, text) {
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    el.classList.add('bm-overlay-container');
    var overlay = el.querySelector('.bm-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'bm-overlay';
      overlay.innerHTML =
        '<div class="bm-overlay-spinner">' +
          '<div class="bm-overlay-spinner-ring"></div>' +
          (text ? '<div class="bm-overlay-text">' + escapeHtml(text) + '</div>' : '') +
        '</div>';
      el.appendChild(overlay);
    }
    requestAnimationFrame(function () { overlay.classList.add('active'); });
  }
  function hideOverlay(target) {
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    var overlay = el.querySelector('.bm-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(function () { overlay.remove(); }, 200);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // CAROUSEL / SLIDER
  // ═══════════════════════════════════════════════════════════
  function KtCarousel(el, opts) {
    if (typeof el === 'string') el = document.querySelector(el);
    if (!el) return;
    var o = Object.assign({ autoplay: false, interval: 4000, loop: true }, opts || {});
    var track = el.querySelector('.bm-carousel-track');
    var slides = el.querySelectorAll('.bm-carousel-slide');
    var dotsContainer = el.querySelector('.bm-carousel-dots');
    var prevBtn = el.querySelector('.bm-carousel-nav-prev');
    var nextBtn = el.querySelector('.bm-carousel-nav-next');
    var thumbContainer = el.parentElement && el.parentElement.classList.contains('bm-carousel-wrap')
      ? el.parentElement.querySelector('.bm-carousel-thumbs') : null;
    var current = 0;
    var total = slides.length;
    var timer;
    // Build dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (var i = 0; i < total; i++) {
        var dot = document.createElement('button');
        dot.className = 'bm-carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dotsContainer.appendChild(dot);
        (function (idx) { dot.addEventListener('click', function () { goTo(idx); }); })(i);
      }
    }
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); });
    if (thumbContainer) {
      thumbContainer.querySelectorAll('.bm-carousel-thumb').forEach(function (th, idx) {
        th.addEventListener('click', function () { goTo(idx); });
      });
    }
    function goTo(idx) {
      if (o.loop) { idx = ((idx % total) + total) % total; }
      else { idx = Math.max(0, Math.min(total - 1, idx)); }
      current = idx;
      track.style.transform = 'translateX(-' + (100 * current) + '%)';
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.bm-carousel-dot').forEach(function (d, i) {
          d.classList.toggle('active', i === current);
        });
      }
      if (thumbContainer) {
        thumbContainer.querySelectorAll('.bm-carousel-thumb').forEach(function (th, i) {
          th.classList.toggle('active', i === current);
        });
      }
      if (o.autoplay) resetTimer();
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(function () { next(); }, o.interval);
    }
    if (o.autoplay) resetTimer();
    return { goTo: goTo, next: next, prev: prev, stop: function () { clearInterval(timer); } };
  }
  function initCarousels() {
    document.querySelectorAll('[data-bm-carousel]').forEach(function (el) {
      if (!el._bmCarousel) {
        el._bmCarousel = new KtCarousel(el, {
          autoplay: el.getAttribute('data-autoplay') === 'true',
          interval: parseInt(el.getAttribute('data-interval') || '4000', 10)
        });
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // RATING
  // ═══════════════════════════════════════════════════════════
  function initRating() {
    document.querySelectorAll('.bm-rating:not([data-readonly])').forEach(function (widget) {
      if (widget._bmRating) return;
      widget._bmRating = true;
      var stars = widget.querySelectorAll('.bm-rating-star');
      var input = widget.nextElementSibling && widget.nextElementSibling.type === 'hidden'
        ? widget.nextElementSibling : null;
      var current = parseInt(widget.getAttribute('data-value') || '0', 10);
      function paint(upTo, cls) {
        stars.forEach(function (s, i) { s.classList.toggle(cls, i < upTo); });
      }
      paint(current, 'filled');
      stars.forEach(function (star, idx) {
        star.addEventListener('mouseenter', function () { paint(idx + 1, 'filled'); });
        star.addEventListener('mouseleave', function () { paint(current, 'filled'); });
        star.addEventListener('click', function () {
          current = idx + 1;
          widget.setAttribute('data-value', current);
          if (input) input.value = current;
          widget.dispatchEvent(new CustomEvent('bm:rating', { detail: { value: current }, bubbles: true }));
        });
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // TAGS INPUT
  // ═══════════════════════════════════════════════════════════
  function KtTagsInput(el, opts) {
    if (typeof el === 'string') el = document.querySelector(el);
    if (!el) return;
    var o = Object.assign({ suggestions: [], max: 0, placeholder: 'Add tag...' }, opts || {});
    var tags = [];
    var hidden = el;
    // Build UI
    var wrap = document.createElement('div');
    wrap.className = 'bm-tags-wrap';
    var container = document.createElement('div');
    container.className = 'bm-tags';
    container.setAttribute('role', 'group');
    var inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.className = 'bm-tags-input-field';
    inputField.placeholder = o.placeholder;
    container.appendChild(inputField);
    // Dropdown
    var dropdown = document.createElement('div');
    dropdown.className = 'bm-tags-dropdown';
    dropdown.style.display = 'none';
    wrap.appendChild(container);
    wrap.appendChild(dropdown);
    hidden.style.display = 'none';
    hidden.parentNode.insertBefore(wrap, hidden.nextSibling);
    // Pre-fill from value
    if (hidden.value) { hidden.value.split(',').forEach(function (t) { addTag(t.trim()); }); }
    function addTag(text) {
      text = text.trim();
      if (!text || tags.indexOf(text) !== -1) return;
      if (o.max && tags.length >= o.max) return;
      tags.push(text);
      var item = document.createElement('span');
      item.className = 'bm-tag-item';
      item.innerHTML = escapeHtml(text) +
        '<button class="bm-tag-remove" type="button" aria-label="Remove"><i class="ph ph-x"></i></button>';
      item.querySelector('.bm-tag-remove').addEventListener('click', function () { removeTag(text, item); });
      container.insertBefore(item, inputField);
      syncInput();
      dropdown.style.display = 'none';
    }
    function removeTag(text, item) {
      tags = tags.filter(function (t) { return t !== text; });
      item.remove(); syncInput();
    }
    function syncInput() { hidden.value = tags.join(','); }
    inputField.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ',') && inputField.value.trim()) {
        e.preventDefault(); addTag(inputField.value); inputField.value = '';
      } else if (e.key === 'Backspace' && !inputField.value && tags.length) {
        var last = container.querySelectorAll('.bm-tag-item');
        var lastTag = last[last.length - 1];
        if (lastTag) { removeTag(tags[tags.length - 1], lastTag); }
      }
    });
    inputField.addEventListener('input', function () {
      var q = inputField.value.toLowerCase();
      if (!q || !o.suggestions.length) { dropdown.style.display = 'none'; return; }
      var matches = o.suggestions.filter(function (s) { return s.toLowerCase().indexOf(q) !== -1 && tags.indexOf(s) === -1; });
      if (!matches.length) { dropdown.style.display = 'none'; return; }
      dropdown.innerHTML = '';
      matches.slice(0, 8).forEach(function (s) {
        var item = document.createElement('div');
        item.className = 'bm-tags-dropdown-item';
        item.textContent = s;
        item.addEventListener('mousedown', function (e) { e.preventDefault(); addTag(s); inputField.value = ''; dropdown.style.display = 'none'; });
        dropdown.appendChild(item);
      });
      dropdown.style.display = 'block';
    });
    inputField.addEventListener('blur', function () { setTimeout(function () { dropdown.style.display = 'none'; }, 150); });
    container.addEventListener('click', function () { inputField.focus(); });
    return { addTag: addTag, removeTag: function(t) { var items = container.querySelectorAll('.bm-tag-item'); items.forEach(function(it) { if (it.textContent.trim().startsWith(t)) { removeTag(t, it); }}); }, getTags: function() { return tags.slice(); } };
  }
  function initTagsInputs() {
    document.querySelectorAll('[data-bm-tags]').forEach(function (el) {
      if (!el._bmTags) {
        var sugg = el.getAttribute('data-suggestions');
        el._bmTags = new KtTagsInput(el, {
          suggestions: sugg ? sugg.split(',').map(function(s){return s.trim();}) : [],
          max: parseInt(el.getAttribute('data-max') || '0', 10),
          placeholder: el.getAttribute('placeholder') || 'Add tag...'
        });
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // CLIPBOARD
  // ═══════════════════════════════════════════════════════════
  function initClipboard() {
    document.querySelectorAll('[data-clipboard-target],[data-clipboard-text]').forEach(function (btn) {
      if (btn._bmClipboard) return;
      btn._bmClipboard = true;
      btn.addEventListener('click', function () {
        var text = '';
        var targetSel = btn.getAttribute('data-clipboard-target');
        if (targetSel) {
          var target = document.querySelector(targetSel);
          text = target ? (target.value !== undefined ? target.value : target.textContent) : '';
        } else {
          text = btn.getAttribute('data-clipboard-text') || '';
        }
        navigator.clipboard.writeText(text).then(function () {
          var orig = btn.innerHTML;
          btn.innerHTML = '<i class="ph ph-check"></i>';
          setTimeout(function () { btn.innerHTML = orig; }, 1500);
          showToast({ type: 'success', title: 'Copied!', message: 'Content copied to clipboard.' });
        }).catch(function () {
          showToast({ type: 'danger', title: 'Failed', message: 'Could not copy to clipboard.' });
        });
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // IMAGE INPUT (preview)
  // ═══════════════════════════════════════════════════════════
  function initImageInputs() {
    document.querySelectorAll('.bm-image-input').forEach(function (widget) {
      if (widget._bmImageInput) return;
      widget._bmImageInput = true;
      var fileInput = widget.querySelector('input[type="file"]');
      var preview = widget.querySelector('.bm-image-input-preview img');
      var placeholder = widget.querySelector('.bm-image-input-placeholder');
      var removeBtn = widget.querySelector('.bm-image-input-btn-remove');
      if (!fileInput) return;
      fileInput.addEventListener('change', function () {
        var file = fileInput.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
          showToast({ type: 'warning', title: 'Invalid file', message: 'Please select an image file.' });
          return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
          if (preview) { preview.src = e.target.result; preview.classList.add('loaded'); }
          if (placeholder) placeholder.style.display = 'none';
          widget.classList.add('has-image');
        };
        reader.readAsDataURL(file);
      });
      if (removeBtn) {
        removeBtn.addEventListener('click', function (e) {
          e.preventDefault();
          fileInput.value = '';
          if (preview) { preview.src = ''; preview.classList.remove('loaded'); }
          if (placeholder) placeholder.style.display = '';
          widget.classList.remove('has-image');
        });
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // PASSWORD METER
  // ═══════════════════════════════════════════════════════════
  function initPasswordMeters() {
    document.querySelectorAll('[data-bm-password-meter]').forEach(function (input) {
      if (input._bmPwMeter) return;
      input._bmPwMeter = true;
      var meterId = input.getAttribute('data-bm-password-meter');
      var meter = meterId ? document.getElementById(meterId) : input.closest('.bm-password-wrap') && input.closest('.bm-password-wrap').querySelector('.bm-password-meter');
      // Password toggle
      var toggleBtn = input.closest('.bm-password-wrap') && input.closest('.bm-password-wrap').querySelector('.bm-password-toggle');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
          var isText = input.type === 'text';
          input.type = isText ? 'password' : 'text';
          var icon = toggleBtn.querySelector('.ph');
          if (icon) {
            icon.className = 'ph ph-' + (isText ? 'eye' : 'eye-slash');
          }
        });
      }
      if (!meter) return;
      var labels = ['', 'Too weak', 'Weak', 'Fair', 'Strong'];
      input.addEventListener('input', function () {
        var score = calcPwStrength(input.value);
        meter.setAttribute('data-strength', input.value ? score : '');
        var textEl = meter.querySelector('.bm-password-meter-text');
        if (textEl) textEl.textContent = input.value ? labels[score] : '';
      });
    });
  }
  function calcPwStrength(pw) {
    if (!pw) return 0;
    var score = 0;
    if (pw.length >= 8)  score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(4, Math.max(1, Math.round(score * 4 / 5)));
  }

  // ═══════════════════════════════════════════════════════════
  // LIGHTBOX
  // ═══════════════════════════════════════════════════════════
  function initLightbox() {
    var groups = {};
    document.querySelectorAll('[data-bm-lightbox]').forEach(function (img) {
      if (img._bmLightbox) return;
      img._bmLightbox = true;
      var group = img.getAttribute('data-bm-lightbox') || 'default';
      if (!groups[group]) groups[group] = [];
      groups[group].push(img);
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () { openLightbox(group, groups[group].indexOf(img)); });
    });
  }
  function openLightbox(group, startIdx) {
    var items = document._bmLightboxGroups && document._bmLightboxGroups[group];
    // Re-query on demand
    var imgs = Array.from(document.querySelectorAll('[data-bm-lightbox="' + group + '"]'));
    var current = startIdx;
    var backdrop = document.createElement('div');
    backdrop.className = 'bm-lightbox-backdrop';
    var content = document.createElement('div');
    content.className = 'bm-lightbox-content';
    var mediaEl = document.createElement('img');
    content.appendChild(mediaEl);
    var closeBtn = document.createElement('button');
    closeBtn.className = 'bm-lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.innerHTML = '<i class="ph ph-x"></i>';
    var prevBtn = document.createElement('button');
    prevBtn.className = 'bm-lightbox-nav bm-lightbox-prev';
    prevBtn.setAttribute('aria-label', 'Previous');
    prevBtn.innerHTML = '<i class="ph ph-caret-left"></i>';
    var nextBtn = document.createElement('button');
    nextBtn.className = 'bm-lightbox-nav bm-lightbox-next';
    nextBtn.setAttribute('aria-label', 'Next');
    nextBtn.innerHTML = '<i class="ph ph-caret-right"></i>';
    var caption = document.createElement('div');
    caption.className = 'bm-lightbox-caption';
    var counter = document.createElement('div');
    counter.className = 'bm-lightbox-counter';
    if (imgs.length <= 1) { prevBtn.style.display = 'none'; nextBtn.style.display = 'none'; }
    backdrop.appendChild(content);
    backdrop.appendChild(closeBtn);
    backdrop.appendChild(prevBtn);
    backdrop.appendChild(nextBtn);
    backdrop.appendChild(caption);
    backdrop.appendChild(counter);
    document.body.appendChild(backdrop);
    document.body.style.overflow = 'hidden';
    function show(idx) {
      current = ((idx % imgs.length) + imgs.length) % imgs.length;
      var src = imgs[current].getAttribute('data-bm-src') || imgs[current].src;
      mediaEl.src = src;
      caption.textContent = imgs[current].getAttribute('data-caption') || imgs[current].alt || '';
      counter.textContent = (current + 1) + ' / ' + imgs.length;
    }
    function close() {
      backdrop.remove();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e) {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') show(current + 1);
      else if (e.key === 'ArrowLeft')  show(current - 1);
    }
    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', function () { show(current - 1); });
    nextBtn.addEventListener('click', function () { show(current + 1); });
    backdrop.addEventListener('click', function (e) { if (e.target === backdrop) close(); });
    document.addEventListener('keydown', onKey);
    show(current);
  }

  // ═══════════════════════════════════════════════════════════
  // CONFIRM DIALOG
  // ═══════════════════════════════════════════════════════════
  function showConfirm(opts) {
    var o = Object.assign({
      title: 'Are you sure?',
      text: '',
      type: 'warning',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      onConfirm: null,
      onCancel: null
    }, opts || {});
    var icons = { success: 'check-circle', warning: 'warning', danger: 'trash', info: 'info' };
    var overlay = document.createElement('div');
    overlay.className = 'bm-confirm-overlay';
    overlay.innerHTML =
      '<div class="bm-confirm-box">' +
        '<div class="bm-confirm-icon bm-confirm-icon-' + o.type + '">' +
          '<i class="ph ph-' + (icons[o.type] || 'question') + '"></i>' +
        '</div>' +
        '<div class="bm-confirm-title">' + escapeHtml(o.title) + '</div>' +
        (o.text ? '<div class="bm-confirm-text">' + escapeHtml(o.text) + '</div>' : '') +
        '<div class="bm-confirm-actions">' +
          '<button class="bm-btn bm-btn-secondary bm-btn-sm js-cancel">' + escapeHtml(o.cancelText) + '</button>' +
          '<button class="bm-btn bm-btn-' + o.type + ' bm-btn-sm js-confirm">' + escapeHtml(o.confirmText) + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    function remove() { overlay.remove(); }
    overlay.querySelector('.js-confirm').addEventListener('click', function () {
      remove(); if (typeof o.onConfirm === 'function') o.onConfirm();
    });
    overlay.querySelector('.js-cancel').addEventListener('click', function () {
      remove(); if (typeof o.onCancel === 'function') o.onCancel();
    });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) { remove(); if (typeof o.onCancel === 'function') o.onCancel(); } });
    return overlay;
  }

  // ═══════════════════════════════════════════════════════════
  // FORM VALIDATION
  // ═══════════════════════════════════════════════════════════
  function setFieldState(el, field, errorEl, msg) {
    if (msg) {
      field.classList.add('invalid'); field.classList.remove('valid');
      el.setAttribute('aria-invalid', 'true');
      if (errorEl) {
        errorEl.textContent = msg;
        if (!errorEl.id) errorEl.id = 'err-' + (el.name || el.id || Math.random().toString(36).substr(2, 6));
        el.setAttribute('aria-describedby', errorEl.id);
      }
    } else {
      field.classList.remove('invalid'); field.classList.add('valid');
      el.removeAttribute('aria-invalid');
      if (errorEl) { errorEl.textContent = ''; el.removeAttribute('aria-describedby'); }
    }
  }

  function validateForm(form, rules) {
    if (typeof form === 'string') form = document.querySelector(form);
    if (!form) return false;
    var valid = true;
    Object.keys(rules).forEach(function (name) {
      var el = form.querySelector('[name="' + name + '"]');
      if (!el) return;
      var field = el.closest('.bm-field') || el.parentElement;
      var errorEl = field.querySelector('.bm-field-error');
      var rule = rules[name];
      var value = el.type === 'checkbox' ? (el.checked ? 'on' : '') : el.value.trim();
      var msg = '';
      if (rule.required && !value) { msg = rule.requiredMsg || 'This field is required.'; }
      else if (rule.minLength && value.length < rule.minLength) { msg = rule.minLengthMsg || ('Minimum ' + rule.minLength + ' characters.'); }
      else if (rule.maxLength && value.length > rule.maxLength) { msg = rule.maxLengthMsg || ('Maximum ' + rule.maxLength + ' characters.'); }
      else if (rule.pattern && !new RegExp(rule.pattern).test(value)) { msg = rule.patternMsg || 'Invalid format.'; }
      else if (rule.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { msg = rule.emailMsg || 'Enter a valid email address.'; }
      else if (rule.match) { var other = form.querySelector('[name="' + rule.match + '"]'); if (other && value !== other.value.trim()) { msg = rule.matchMsg || 'Fields do not match.'; } }
      else if (typeof rule.custom === 'function') { msg = rule.custom(value, form) || ''; }
      if (msg) valid = false;
      setFieldState(el, field, errorEl, msg);
    });
    return valid;
  }

  /* data-validate auto-init: builds rules from HTML attributes */
  function buildRulesFromDOM(form) {
    var rules = {};
    form.querySelectorAll('[name]').forEach(function (el) {
      var r = {};
      if (el.hasAttribute('required')) { r.required = true; }
      if (el.type === 'email') { r.email = true; }
      if (el.getAttribute('minlength')) { r.minLength = parseInt(el.getAttribute('minlength'), 10); }
      if (el.getAttribute('maxlength')) { r.maxLength = parseInt(el.getAttribute('maxlength'), 10); }
      if (el.getAttribute('pattern')) { r.pattern = el.getAttribute('pattern'); r.patternMsg = el.getAttribute('title') || 'Invalid format.'; }
      if (el.dataset.ruleMatch) { r.match = el.dataset.ruleMatch; r.matchMsg = el.dataset.matchMsg || 'Fields do not match.'; }
      if (Object.keys(r).length) rules[el.name] = r;
    });
    return rules;
  }

  function initAutoValidation() {
    document.querySelectorAll('form[data-validate]').forEach(function (form) {
      if (form._bmValidateInit) return;
      form._bmValidateInit = true;
      form.setAttribute('novalidate', '');
      form.addEventListener('submit', function (e) {
        var rules = buildRulesFromDOM(form);
        var valid = validateForm(form, rules);
        if (!valid) { e.preventDefault(); e.stopImmediatePropagation(); }
      });
      /* live clear: remove error state on input */
      form.addEventListener('input', function (e) {
        var el = e.target;
        if (!el.name) return;
        var field = el.closest('.bm-field');
        if (field && field.classList.contains('invalid')) {
          var errorEl = field.querySelector('.bm-field-error');
          setFieldState(el, field, errorEl, '');
          field.classList.remove('valid'); /* neutral until next submit */
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // PUBLIC API
  // ═══════════════════════════════════════════════════════════
  window.App = {
    openModal: openModal,
    closeModal: closeModal,
    trapFocus: trapFocus,
    releaseFocus: releaseFocus,
    toggleUserMenu: toggleUserMenu,
    closeUserMenu: closeUserMenu,
    toggleNotifPanel: toggleNotifPanel,
    closeNotifPanel: closeNotifPanel,
    openCommand: openCommand,
    closeCommand: closeCommand,
    openDrawer: openDrawer,
    closeDrawer: closeDrawer,
    showToast: showToast,
    LoadingBar: LoadingBar,
    initDatepickers: initDatepickers,
    datepicker: function(el, opts) { return new KtDatepicker(el, opts); },
    DataGrid: KtDataGrid,
    Dropzone: KtDropzone,
    Stepper: KtStepper,
    initOTP: initOTP,
    initRangeSliders: initRangeSliders,
    initSteppers: initSteppers,
    Settings: Settings,
    initCounters: initCounters,
    skeleton: skeleton,
    openSettingsPanel: openSettingsPanel,
    closeSettingsPanel: closeSettingsPanel,
    LayoutManager: LayoutManager,
    initCustomSelects: initCustomSelects,
    toast: {
      success: function (title, msg) { showToast({ type: 'success', title: title, message: msg }); },
      warning: function (title, msg) { showToast({ type: 'warning', title: title, message: msg }); },
      danger: function (title, msg) { showToast({ type: 'danger', title: title, message: msg }); },
      info: function (title, msg) { showToast({ type: 'info', title: title, message: msg }); }
    },
    Carousel: KtCarousel,
    TagsInput: KtTagsInput,
    overlay: { show: showOverlay, hide: hideOverlay },
    confirm: showConfirm,
    validate: validateForm,
    buildRulesFromDOM: buildRulesFromDOM,
    initAutoValidation: initAutoValidation,
    initTooltips: initTooltips,
    initPopovers: initPopovers,
    initCarousels: initCarousels,
    initScrollTop: initScrollTop,
    initRating: initRating,
    initTagsInputs: initTagsInputs,
    initClipboard: initClipboard,
    initImageInputs: initImageInputs,
    initPasswordMeters: initPasswordMeters,
    initLightbox: initLightbox
  };
})();
