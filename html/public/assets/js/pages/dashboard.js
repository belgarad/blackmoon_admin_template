/**
 * Dashboard page — Chart initialization
 * Dependencies: Chart.js (CDN)
 */
(function () {
  var H = ChartHelpers;
  H.applyThemeDefaults();

  function sparkOpts(color, data, type) {
    var ctx = H.canvas('spark-' + color.replace('#', ''), 44);
    // use the element's id directly — callers pass id explicitly
    return { ctx: ctx, color: color, data: data, type: type || 'line' };
  }

  function renderSparkline(id, color, data, type) {
    var ctx = H.canvas(id, 44);
    if (!ctx) return;
    var isBar = (type === 'bar');
    new Chart(ctx, {
      type: isBar ? 'bar' : 'line',
      data: {
        labels: data.map(function (_, i) { return i; }),
        datasets: [{
          data: data,
          borderColor: color,
          borderWidth: 2,
          backgroundColor: isBar ? color + '99' : H.areaGradient(ctx, color, 0.35, 0.02),
          fill: !isBar,
          pointRadius: 0,
          tension: 0.4,
          borderRadius: isBar ? 3 : 0
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { duration: 700, easing: 'easeInOutQuart' },
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } }
      }
    });
  }

  renderSparkline('spark-revenue', '#3598DC', [31,40,28,51,42,109,100,72,88,84]);
  renderSparkline('spark-users',   '#26C281', [65,59,80,81,56,95,100,120,128,130]);
  renderSparkline('spark-orders',  '#E87E04', [45,60,55,82,75,62,78,50,55,48], 'bar');
  renderSparkline('spark-conv',    '#3598DC', [3.2,3.8,4.1,3.9,4.5,4.2,4.6,4.8,4.7,5.0]);

  // Revenue area chart
  var revCtx = H.canvas('chart-revenue', 260);
  if (revCtx) {
    new Chart(revCtx, {
      type: 'line',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
          { label: 'Revenue', data: [42000,55000,49000,66000,71000,58000,84000,76000,91000,84290,88000,95000],
            borderColor: '#3598DC', borderWidth: 2, fill: true,
            backgroundColor: H.areaGradient(revCtx, '#3598DC', 0.25, 0.02),
            pointRadius: 0, tension: 0.4 },
          { label: 'Expenses', data: [30000,38000,32000,44000,49000,41000,57000,52000,63000,58000,61000,67000],
            borderColor: '#26C281', borderWidth: 2, fill: true,
            backgroundColor: H.areaGradient(revCtx, '#26C281', 0.25, 0.02),
            pointRadius: 0, tension: 0.4 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { duration: 600, easing: 'easeInOutQuart' },
        plugins: { legend: { display: false }, tooltip: { callbacks: {
          label: function (ctx) { return ctx.dataset.label + ': $' + ctx.raw.toLocaleString(); }
        }}},
        scales: {
          x: H.xScale({ ticks: { color: '#95A5A6', font: { size: 12 } } }),
          y: H.yScale({ ticks: { color: '#95A5A6', font: { size: 12 }, callback: function (v) { return '$' + (v/1000).toFixed(0) + 'k'; } } })
        }
      }
    });
  }

  // Donut chart with center label
  var donutCtx = H.canvas('chart-donut', 186);
  if (donutCtx) {
    var donutCenterPlugin = {
      id: 'donutCenter',
      beforeDraw: function (chart) {
        if (!chart.config.options.centerText) return;
        var ca = chart.chartArea;
        var cx = (ca.left + ca.right) / 2;
        var cy = (ca.top + ca.bottom) / 2;
        var ctx2 = chart.ctx;
        ctx2.save();
        ctx2.textAlign = 'center'; ctx2.textBaseline = 'middle';
        ctx2.fillStyle = H.isDark() ? '#E1E5EC' : '#2F353B';
        ctx2.font = 'bold 1.125rem sans-serif';
        ctx2.fillText(chart.config.options.centerText, cx, cy - 8);
        ctx2.fillStyle = '#95A5A6';
        ctx2.font = '0.75rem sans-serif';
        ctx2.fillText(chart.config.options.centerLabel || '', cx, cy + 10);
        ctx2.restore();
      }
    };
    Chart.register(donutCenterPlugin);
    new Chart(donutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Electronics', 'Clothing', 'Home & Garden', 'Other'],
        datasets: [{ data: [38, 25, 21, 16],
          backgroundColor: ['#3598DC','#26C281','#E87E04','#8775A7'], borderWidth: 0 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '72%',
        centerText: '$84.3k', centerLabel: 'Total',
        plugins: { legend: { display: false }, tooltip: { callbacks: {
          label: function (ctx) { return ctx.label + ': ' + ctx.raw + '%'; }
        }}}
      }
    });
  }
})();
