/**
 * Chart Helpers — shared dark-mode–aware defaults for Chart.js
 * Used by: analytics, crm, dashboard-finance, dashboard-marketing, widgets-charts
 */
var ChartHelpers = (function () {
  function isDark() { return document.documentElement.classList.contains('dark'); }
  function txtColor() { return isDark() ? '#ACB5C3' : '#67809F'; }
  function gridColor() { return isDark() ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'; }
  function borderColor() { return isDark() ? '#525E64' : '#E5E5E5'; }

  /** Create a linear gradient fill for area charts (call AFTER chart canvas is sized). */
  function areaGradient(ctx, color, opacityFrom, opacityTo) {
    opacityFrom = opacityFrom !== undefined ? opacityFrom : 0.35;
    opacityTo   = opacityTo   !== undefined ? opacityTo   : 0.02;
    return function (context) {
      var chart = context.chart;
      var chartArea = chart.chartArea;
      if (!chartArea) return 'transparent';
      var gradient = chart.ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      gradient.addColorStop(0, color + Math.round(opacityFrom * 255).toString(16).padStart(2, '0'));
      gradient.addColorStop(1, color + Math.round(opacityTo   * 255).toString(16).padStart(2, '0'));
      return gradient;
    };
  }

  /**
   * Create (or get) a <canvas> inside a container div.
   * @param {string} id  — id of the wrapper div
   * @param {number} height — desired canvas height in px (optional)
   * @returns {CanvasRenderingContext2D|null}
   */
  function canvas(id, height) {
    var wrap = document.getElementById(id);
    if (!wrap) return null;
    var cvs = document.createElement('canvas');
    if (height) { cvs.style.height = height + 'px'; cvs.style.width = '100%'; }
    wrap.appendChild(cvs);
    return cvs.getContext('2d');
  }

  /** Apply global Chart.js defaults for the current theme. */
  function applyThemeDefaults() {
    if (typeof Chart === 'undefined') return;
    var dark = isDark();
    Chart.defaults.color = dark ? '#ACB5C3' : '#67809F';
    Chart.defaults.borderColor = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
    Chart.defaults.font.family = 'inherit';
    Chart.defaults.plugins.legend.labels.color = dark ? '#ACB5C3' : '#67809F';
    Chart.defaults.plugins.tooltip.backgroundColor = dark ? '#2B3A4A' : '#fff';
    Chart.defaults.plugins.tooltip.titleColor = dark ? '#E8EDF3' : '#2F353B';
    Chart.defaults.plugins.tooltip.bodyColor = dark ? '#ACB5C3' : '#67809F';
    Chart.defaults.plugins.tooltip.borderColor = dark ? '#525E64' : '#E5E5E5';
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.tooltip.cornerRadius = 6;
  }

  /** Shared x-axis scale options. */
  function xScale(extra) {
    return Object.assign({
      grid: { display: false },
      border: { display: false },
      ticks: { color: txtColor(), font: { size: 12 } }
    }, extra);
  }

  /** Shared y-axis scale options. */
  function yScale(extra) {
    return Object.assign({
      grid: { color: gridColor(), borderDash: [4, 4] },
      border: { display: false },
      ticks: { color: txtColor(), font: { size: 12 } }
    }, extra);
  }

  /** Shared chart.js options baseline. */
  function baseOpts() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 600, easing: 'easeInOutQuart' },
      plugins: { legend: { display: false }, tooltip: {} },
      scales: { x: xScale(), y: yScale() }
    };
  }

  // Apply defaults once on load
  applyThemeDefaults();

  return {
    isDark: isDark,
    txtColor: txtColor,
    gridColor: gridColor,
    borderColor: borderColor,
    areaGradient: areaGradient,
    canvas: canvas,
    applyThemeDefaults: applyThemeDefaults,
    xScale: xScale,
    yScale: yScale,
    baseOpts: baseOpts
  };
})();
