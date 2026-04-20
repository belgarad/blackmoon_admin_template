/**
 * Analytics page — Charts & interactions
 * Dependencies: Chart.js (CDN), chartjs-chart-matrix (CDN), chart-helpers.js
 */
(function () {
  var H = ChartHelpers;
  H.applyThemeDefaults();

  // ── Period toggle ──────────────────────────────────────────
  window.setPeriod = function (btn, p) {
    document.querySelectorAll('#periodGroup button').forEach(function (b) {
      b.className = b === btn ? 'bm-btn bm-btn-primary bm-btn-sm' : 'bm-btn bm-btn-ghost bm-btn-sm';
    });
    App.toast.info('Period changed', 'Showing data for ' + p);
  };

  // ── KPI sparklines ───────────────────────────────────────
  function renderSparkline(id, color, data) {
    var ctx = H.canvas(id, 50);
    if (!ctx) return;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(function (_, i) { return i; }),
        datasets: [{ data: data, borderColor: color, borderWidth: 2,
          fill: true, backgroundColor: H.areaGradient(ctx, color, 0.3, 0.02),
          pointRadius: 0, tension: 0.4 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } }
      }
    });
  }

  renderSparkline('kpi-views',    '#4B77BE', [2100,2800,2400,3100,2900,3400,3200,3800,3600,4100,3900,4400,4200,4800]);
  renderSparkline('kpi-visitors', '#1BBC9B', [800,1100,950,1200,1100,1400,1250,1600,1500,1750,1650,1900,1800,2050]);
  renderSparkline('kpi-session',  '#E87E04', [4.8,4.6,4.9,4.4,4.7,4.3,4.6,4.2,4.5,4.1,4.4,4.2,4.5,4.3]);
  renderSparkline('kpi-conv',     '#32C5D2', [3.1,3.3,3.2,3.5,3.4,3.6,3.5,3.7,3.6,3.8,3.7,3.9,3.8,4.0]);

  // ── Traffic area chart ───────────────────────────────────
  (function () {
    var labels = ['Apr 2','Apr 3','Apr 4','Apr 5','Apr 6','Apr 7','Apr 8','Apr 9','Apr 10','Apr 11',
      'Apr 12','Apr 13','Apr 14','Apr 15','Apr 16','Apr 17','Apr 18','Apr 19','Apr 20','Apr 21',
      'Apr 22','Apr 23','Apr 24','Apr 25','Apr 26','Apr 27','Apr 28','Apr 29','Apr 30','May 1'];
    var ctx = H.canvas('chart-traffic', 280);
    if (!ctx) return;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          { label: 'Sessions',
            data: [2240,2560,2180,3100,4200,3850,2900,2700,3200,3400,3150,2850,3600,3900,4100,3700,3300,3800,4300,4600,4200,3900,4500,4800,5100,4700,4300,4900,5300,5600],
            borderColor: '#4B77BE', borderWidth: 2, fill: true,
            backgroundColor: H.areaGradient(ctx, '#4B77BE', 0.3, 0.03),
            pointRadius: 0, tension: 0.4 },
          { label: 'Unique Visitors',
            data: [1400,1620,1380,1900,2600,2400,1800,1680,2000,2100,1950,1780,2250,2400,2550,2300,2060,2360,2680,2870,2620,2430,2820,3000,3180,2930,2680,3060,3300,3500],
            borderColor: '#1BBC9B', borderWidth: 2, fill: true,
            backgroundColor: H.areaGradient(ctx, '#1BBC9B', 0.3, 0.03),
            pointRadius: 0, tension: 0.4 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { display: false } },
        scales: {
          x: H.xScale({ ticks: { color: H.txtColor(), font: { size: 11 }, maxTicksLimit: 7, maxRotation: 0 } }),
          y: H.yScale({ ticks: { color: H.txtColor(), font: { size: 11 } } })
        }
      }
    });
  })();

  // ── Devices donut ────────────────────────────────────────
  var devCtx = H.canvas('chart-devices', 220);
  if (devCtx) {
    new Chart(devCtx, {
      type: 'doughnut',
      data: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        datasets: [{ data: [58.4,31.2,10.4],
          backgroundColor: ['#4B77BE','#1BBC9B','#E87E04'], borderWidth: 0 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '72%',
        centerText: '100%', centerLabel: 'Total',
        plugins: { legend: { display: false } }
      }
    });
  }

  // ── Monthly conversions bar ──────────────────────────────
  var convCtx = H.canvas('chart-conversions', 240);
  if (convCtx) {
    new Chart(convCtx, {
      type: 'bar',
      data: {
        labels: ['Nov','Dec','Jan','Feb','Mar','Apr'],
        datasets: [{ label: 'Conversions', data: [840,960,1120,1050,1340,1280],
          backgroundColor: '#4B77BE', borderRadius: 6 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: H.xScale({ ticks: { color: H.txtColor(), font: { size: 12 } } }),
          y: H.yScale({ ticks: { color: H.txtColor(), font: { size: 12 } } })
        }
      }
    });
  }

  // ── Conversion funnel — horizontal bar ──────────────────
  var funnelCtx = H.canvas('chart-funnel', 240);
  if (funnelCtx) {
    new Chart(funnelCtx, {
      type: 'bar',
      data: {
        labels: ['Visitors','Engaged','Signed Up','Activated','Converted'],
        datasets: [{ label: 'Users', data: [34891,22480,12640,6820,3370],
          backgroundColor: '#32C5D2', borderRadius: 5 }]
      },
      options: {
        indexAxis: 'y',
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: {
          label: function(ctx) { return ' ' + ctx.raw.toLocaleString(); }
        }}},
        scales: {
          x: H.xScale({ ticks: { display: false }, grid: { display: false } }),
          y: H.yScale({ ticks: { color: H.txtColor(), font: { size: 12 } }, grid: { display: false } })
        }
      }
    });
  }

  // ── Activity heatmap (chartjs-chart-matrix) ──────────────
  (function () {
    if (typeof Chart === 'undefined' || !Chart.controllers || !Chart.controllers.matrix) return;
    var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var data = [];
    for (var d = 0; d < 7; d++) {
      var isSun = (d === 0), isSat = (d === 6);
      for (var h = 0; h < 24; h++) {
        var base2 = (isSat || isSun) ? 20 : 50;
        var peak = (h >= 9 && h <= 17) ? 150 : 30;
        data.push({ x: h + ':00', y: days[d], v: Math.round(Math.random() * peak + base2) });
      }
    }
    var ctx = H.canvas('chart-heatmap', 220);
    if (!ctx) return;
    new Chart(ctx, {
      type: 'matrix',
      data: {
        datasets: [{
          label: 'Activity',
          data: data,
          backgroundColor: function(c) {
            var v = c.dataset.data[c.dataIndex].v;
            var alpha = v / 200;
            return 'rgba(75,119,190,' + alpha.toFixed(2) + ')';
          },
          width: function(c) { return (c.chart.chartArea || {}).width / 24 - 2; },
          height: function(c) { return (c.chart.chartArea || {}).height / 7 - 2; }
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: {
          title: function() { return ''; },
          label: function(ctx) { var d = ctx.dataset.data[ctx.dataIndex]; return d.y + ' ' + d.x + ': ' + d.v; }
        }}},
        scales: {
          x: { type: 'category', ticks: { color: H.txtColor(), font: { size: 10 }, maxRotation: 0 }, grid: { display: false }, border: { display: false } },
          y: { type: 'category', ticks: { color: H.txtColor(), font: { size: 10 } }, grid: { display: false }, border: { display: false } }
        }
      }
    });
  })();
})();
