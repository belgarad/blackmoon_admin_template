/* ── Widgets Charts Page ─────────────────────────────────── */
(function() {
  'use strict';
  var H = ChartHelpers;
  H.applyThemeDefaults();

  var C = ['#3598DC','#26C281','#E87E04','#E7505A','#8775A7','#32C5D2'];
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var shortM = ['Jan','Feb','Mar','Apr','May','Jun'];

  function mk(id, h) { return H.canvas(id, h || 240); }

  // ── Line Chart ───────────────────────────────────────────
  var lineCtx = mk('chart-line');
  if (lineCtx) {
    new Chart(lineCtx, {
      type: 'line',
      data: { labels: months, datasets: [
        { label: 'New Users', data: [320,410,380,520,610,590,680,740,830,920,980,1120],
          borderColor: C[0], borderWidth: 2.5, pointRadius: 0, tension: 0.4, fill: false },
        { label: 'Returning', data: [180,220,250,310,340,380,410,460,500,540,580,620],
          borderColor: C[1], borderWidth: 2.5, pointRadius: 0, tension: 0.4, fill: false }
      ]},
      options: { responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: true, position: 'top', align: 'end',
          labels: { boxWidth: 8, boxHeight: 8, font: { size: 12 }, color: H.txtColor() } } },
        scales: { x: H.xScale({ ticks: { color: '#95A5A6' } }), y: H.yScale({ ticks: { color: '#95A5A6' } }) } }
    });
  }

  // ── Area Chart ───────────────────────────────────────────
  var areaCtx = mk('chart-area');
  if (areaCtx) {
    new Chart(areaCtx, {
      type: 'line',
      data: { labels: months, datasets: [
        { label: 'Revenue', data: [4200,4800,5100,4900,5600,6200,6800,7100,7400,8200,8800,9400],
          borderColor: C[0], borderWidth: 2, fill: true,
          backgroundColor: H.areaGradient(areaCtx, C[0], 0.35, 0.05),
          pointRadius: 0, tension: 0.4 }
      ]},
      options: { responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: {
          label: function(ctx) { return '$' + ctx.raw.toLocaleString(); }
        }}},
        scales: {
          x: H.xScale({ ticks: { color: '#95A5A6' } }),
          y: H.yScale({ ticks: { color: '#95A5A6', callback: function(v) { return '$' + (v/1000).toFixed(0) + 'k'; } } })
        } }
    });
  }

  // ── Bar Chart ────────────────────────────────────────────
  var barCtx = mk('chart-bar');
  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: { labels: ['North America','Europe','Asia Pacific','Latin America','Middle East','Africa'],
        datasets: [{ label: 'Sales', data: [44,55,41,67,22,43], backgroundColor: C[0], borderRadius: 4 }] },
      options: { responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: {
          label: function(ctx) { return '$' + ctx.raw + 'k'; }
        }}},
        scales: {
          x: H.xScale({ ticks: { color: '#95A5A6' } }),
          y: H.yScale({ ticks: { color: '#95A5A6', callback: function(v) { return '$' + v + 'k'; } } })
        } }
    });
  }

  // ── Grouped Bar ──────────────────────────────────────────
  var grpCtx = mk('chart-grouped-bar');
  if (grpCtx) {
    new Chart(grpCtx, {
      type: 'bar',
      data: { labels: shortM, datasets: [
        { label: 'Revenue', data: [98,105,112,108,118,125], backgroundColor: C[1], borderRadius: 4 },
        { label: 'Expenses', data: [64,70,73,69,75,78], backgroundColor: C[3], borderRadius: 4 }
      ]},
      options: { responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: true, position: 'top', align: 'end',
          labels: { boxWidth: 8, boxHeight: 8, font: { size: 12 }, color: H.txtColor() } } },
        scales: {
          x: H.xScale({ ticks: { color: '#95A5A6' } }),
          y: H.yScale({ ticks: { color: '#95A5A6', callback: function(v) { return '$' + v + 'k'; } } })
        } }
    });
  }

  // ── Pie Chart ────────────────────────────────────────────
  var pieCtx = mk('chart-pie', 260);
  if (pieCtx) {
    new Chart(pieCtx, {
      type: 'pie',
      data: { labels: ['Organic Search','Direct','Social Media','Referral','Email'],
        datasets: [{ data: [35,25,20,12,8], backgroundColor: C.slice(0,5), borderWidth: 0 }] },
      options: { responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: true, position: 'bottom',
          labels: { boxWidth: 8, boxHeight: 8, font: { size: 12 }, color: H.txtColor() } } } }
    });
  }

  // ── Donut Chart ──────────────────────────────────────────
  var dnutCtx = mk('chart-donut', 260);
  if (dnutCtx) {
    new Chart(dnutCtx, {
      type: 'doughnut',
      data: { labels: ['Desktop','Mobile','Tablet','Other'],
        datasets: [{ data: [52,28,15,5], backgroundColor: [C[0],C[1],C[2],C[4]], borderWidth: 0 }] },
      options: { responsive: true, maintainAspectRatio: false, cutout: '70%',
        centerText: '14,820', centerLabel: 'Total',
        plugins: { legend: { display: true, position: 'bottom',
          labels: { boxWidth: 8, boxHeight: 8, font: { size: 12 }, color: H.txtColor() } } } }
    });
  }

  // ── Radar Chart ──────────────────────────────────────────
  var radCtx = mk('chart-radar', 280);
  if (radCtx) {
    new Chart(radCtx, {
      type: 'radar',
      data: { labels: ['Frontend','Backend','DevOps','Design','Testing','Communication'],
        datasets: [
          { label: 'Current', data: [80,92,70,85,60,75], borderColor: C[0], borderWidth: 2,
            backgroundColor: C[0] + '26', pointRadius: 3 },
          { label: 'Previous', data: [65,78,85,60,55,90], borderColor: C[4], borderWidth: 2,
            backgroundColor: C[4] + '26', pointRadius: 3 }
        ]},
      options: { responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: true, position: 'bottom',
          labels: { boxWidth: 8, boxHeight: 8, font: { size: 12 }, color: H.txtColor() } } },
        scales: { r: { ticks: { display: false }, grid: { color: H.gridColor() },
          pointLabels: { color: H.txtColor(), font: { size: 12 } } } } }
    });
  }

  // ── Polar Area (replaces radialBar) ──────────────────────
  var polCtx = mk('chart-radial', 280);
  if (polCtx) {
    new Chart(polCtx, {
      type: 'polarArea',
      data: { labels: ['Revenue','Signups','Retention'],
        datasets: [{ data: [82,65,48], backgroundColor: [C[0]+'cc',C[1]+'cc',C[2]+'cc'], borderWidth: 0 }] },
      options: { responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: true, position: 'bottom',
          labels: { boxWidth: 8, boxHeight: 8, font: { size: 12 }, color: H.txtColor() } } },
        scales: { r: { ticks: { display: false, backdropColor: 'transparent' },
          grid: { color: H.gridColor() } } } }
    });
  }

  // ── Mixed Chart (Bar + Line) ─────────────────────────────
  var mixCtx = mk('chart-mixed');
  if (mixCtx) {
    new Chart(mixCtx, {
      data: {
        labels: months,
        datasets: [
          { type: 'bar', label: 'Visitors',
            data: [4400,5200,4800,6100,5800,6800,7200,6900,7400,8100,7800,8600],
            backgroundColor: C[0], borderRadius: 3, yAxisID: 'y' },
          { type: 'line', label: 'Bounce Rate',
            data: [38,35,40,32,34,30,28,31,27,25,26,23],
            borderColor: C[3], borderWidth: 2.5, fill: false, pointRadius: 0, tension: 0.4, yAxisID: 'y1' }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: true, position: 'top', align: 'end',
          labels: { boxWidth: 8, boxHeight: 8, font: { size: 12 }, color: H.txtColor() } } },
        scales: {
          x: H.xScale({ ticks: { color: '#95A5A6' } }),
          y: H.yScale({ position: 'left', ticks: { color: '#95A5A6' }, title: { display: true, text: 'Visitors', color: '#95A5A6', font: { size: 12 } } }),
          y1: { position: 'right', border: { display: false }, grid: { drawOnChartArea: false },
            ticks: { color: '#95A5A6', font: { size: 12 }, callback: function(v) { return v + '%'; } },
            title: { display: true, text: 'Bounce Rate (%)', color: '#95A5A6', font: { size: 12 } } }
        } }
    });
  }

  // ── Stacked Area ─────────────────────────────────────────
  var stkCtx = mk('chart-stacked-area');
  if (stkCtx) {
    new Chart(stkCtx, {
      type: 'line',
      data: { labels: months, datasets: [
        { label: 'Organic', data: [2200,2400,2300,2800,3100,3400,3200,3600,3800,4100,4300,4800],
          borderColor: C[0], borderWidth: 1.5, fill: 'origin',
          backgroundColor: H.areaGradient(stkCtx, C[0], 0.45, 0.05), pointRadius: 0, tension: 0.4 },
        { label: 'Paid', data: [800,900,1000,1100,1200,1400,1300,1500,1600,1800,2000,2200],
          borderColor: C[1], borderWidth: 1.5, fill: 'origin',
          backgroundColor: H.areaGradient(stkCtx, C[1], 0.45, 0.05), pointRadius: 0, tension: 0.4 },
        { label: 'Social', data: [400,450,500,520,580,620,660,700,740,800,850,920],
          borderColor: C[2], borderWidth: 1.5, fill: 'origin',
          backgroundColor: H.areaGradient(stkCtx, C[2], 0.45, 0.05), pointRadius: 0, tension: 0.4 }
      ]},
      options: { responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: true, position: 'top', align: 'end',
          labels: { boxWidth: 8, boxHeight: 8, font: { size: 12 }, color: H.txtColor() } } },
        scales: {
          x: H.xScale({ ticks: { color: '#95A5A6' } }),
          y: H.yScale({ stacked: false,
            ticks: { color: '#95A5A6', callback: function(v) { return (v/1000).toFixed(0) + 'k'; } } })
        } }
    });
  }

})();
