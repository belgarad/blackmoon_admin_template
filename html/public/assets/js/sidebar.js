/**
 * Sidebar Manager — Collapse/Expand + Mobile Drawer
 */
(function () {
  'use strict';

  var SIDEBAR_KEY = 'admin-sidebar-collapsed';
  var sidebarOpen = false;
  var collapsed = localStorage.getItem(SIDEBAR_KEY) === 'true';
  var body = document.body;

  function isMobile() {
    return window.innerWidth < 1024;
  }

  function openDrawer() {
    sidebarOpen = true;
    var sidebar = document.getElementById('sidebar');
    var backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.add('bm-drawer-open');
    if (backdrop) backdrop.style.display = 'block';
  }

  function closeDrawer() {
    sidebarOpen = false;
    var sidebar = document.getElementById('sidebar');
    var backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.remove('bm-drawer-open');
    if (backdrop) backdrop.style.display = 'none';
  }

  function toggleDrawer() {
    sidebarOpen ? closeDrawer() : openDrawer();
  }

  function toggleCollapse() {
    collapsed = !collapsed;
    localStorage.setItem(SIDEBAR_KEY, collapsed);
    body.classList.toggle('bm-sidebar-collapse', collapsed);
    var icon = document.getElementById('collapseIcon');
    if (icon) icon.classList.toggle('rotated', collapsed);
    var toggle = document.getElementById('sidebarToggle');
    if (toggle) {
      toggle.setAttribute('aria-expanded', !collapsed);
      toggle.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
    }
  }

  // Set active menu item based on current page
  function setActiveMenu() {
    // Template already rendered correct active/open classes — skip JS detection
    if (document.querySelector('.bm-menu-link.active, .bm-menu-sub-link.active')) return;

    // Fallback for non-templated pages: use exact pathname match
    var current = window.location.pathname;

    document.querySelectorAll('.bm-menu-link, .bm-menu-sub-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      // link.pathname is the browser-resolved absolute path — exact comparison
      if (link.pathname === current) {
        link.classList.add('active');
        if (link.classList.contains('bm-menu-sub-link')) {
          var parent = link.closest('.bm-has-sub');
          if (parent) parent.classList.add('open');
        }
      }
    });
  }

  // Toggle submenus
  function initSubmenus() {
    document.querySelectorAll('.bm-has-sub > .bm-menu-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var item = link.closest('.bm-has-sub');
        item.classList.toggle('open');
        link.setAttribute('aria-expanded', item.classList.contains('open'));
      });
    });
  }

  // Close drawer on resize to desktop
  window.addEventListener('resize', function () {
    if (!isMobile() && sidebarOpen) closeDrawer();
  });

  // Init
  document.addEventListener('DOMContentLoaded', function () {
    // Restore collapsed state
    if (collapsed) {
      body.classList.add('bm-sidebar-collapse');
      var icon = document.getElementById('collapseIcon');
      if (icon) icon.classList.add('rotated');
    }
    setActiveMenu();
    initSubmenus();

    // Mobile toggle button
    var mobileToggle = document.getElementById('mobileToggle');
    if (mobileToggle) mobileToggle.addEventListener('click', toggleDrawer);

    // Sidebar backdrop
    var backdrop = document.getElementById('sidebarBackdrop');
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    // Collapse toggle
    var collapseToggle = document.getElementById('sidebarToggle');
    if (collapseToggle) collapseToggle.addEventListener('click', toggleCollapse);

    // Close sidebar on menu click (mobile)
    document.querySelectorAll('.bm-menu-link, .bm-menu-sub-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (isMobile() && link.getAttribute('href') !== '#') closeDrawer();
      });
    });

    // ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
  });

  window.SidebarManager = {
    open: openDrawer,
    close: closeDrawer,
    toggle: toggleDrawer,
    toggleCollapse: toggleCollapse
  };
})();
