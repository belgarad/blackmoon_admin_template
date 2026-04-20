/* ── Dashboard Marketing Page ────────────────────────────── */
(function() {
  'use strict';
  var H = ChartHelpers;
  H.applyThemeDefaults();

  // Animate counters
  document.querySelectorAll('[data-counter]').forEach(function(el) {
    var target = parseInt(el.dataset.counter, 10);
    var prefix = el.dataset.counterPrefix || '';
    var duration = 900;
    var start = performance.now();
    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var val = Math.floor(eased * target);
      el.textContent = prefix + val.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target.toLocaleString();
    }
    requestAnimationFrame(step);
  });

  // Engagement Trend — multi-series area chart
  var ctx = H.canvas('chart-engagement-trend', 280);
  if (ctx) {
    var labels = Array.from({length:30}, function(_,i) {
      var d = new Date(2026,2,1); d.setDate(d.getDate()+i);
      return (d.getMonth()+1)+'/'+d.getDate();
    });
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          { label: 'Impressions',
            data: [38200,41500,39800,44600,42100,47300,45800,49200,46700,51400,48900,53200,50600,55100,52400,57800,54300,59200,56800,61400,58700,63500,60200,65800,62400,67100,64300,69500,66800,71200],
            borderColor: '#3598DC', borderWidth: 2, fill: true,
            backgroundColor: H.areaGradient(ctx, '#3598DC', 0.2, 0.01),
            pointRadius: 0, tension: 0.4, yAxisID: 'y' },
          { label: 'Clicks',
            data: [1528,1660,1592,1784,1684,1892,1832,1968,1868,2056,1956,2128,2024,2204,2096,2312,2172,2368,2272,2456,2348,2540,2408,2632,2496,2684,2572,2780,2672,2848],
            borderColor: '#26C281', borderWidth: 2, fill: true,
            backgroundColor: H.areaGradient(ctx, '#26C281', 0.2, 0.01),
            pointRadius: 0, tension: 0.4, yAxisID: 'y1' },
          { label: 'Conversions',
            data: [84,92,88,98,93,104,101,108,103,113,108,117,112,121,116,127,120,130,125,135,129,140,133,144,137,148,141,153,146,157],
            borderColor: '#E87E04', borderWidth: 2, fill: false,
            pointRadius: 0, tension: 0.4, yAxisID: 'y1' }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { duration: 600, easing: 'easeInOutQuart' },
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: true, position: 'top', align: 'end',
            labels: { font: { size: 12, family: 'inherit' }, boxWidth: 8, boxHeight: 8,
              color: H.txtColor() } }
        },
        scales: {
          x: H.xScale({ ticks: { color: '#95A5A6', font: { size: 11 },
            maxTicksLimit: 10, maxRotation: 0 } }),
          y: H.yScale({ position: 'left',
            ticks: { color: '#95A5A6', font: { size: 11 },
              callback: function(v) { return (v/1000).toFixed(0)+'k'; } } }),
          y1: { position: 'right', border: { display: false },
            grid: { drawOnChartArea: false },
            ticks: { color: '#95A5A6', font: { size: 11 } } }
        }
      }
    });
  }
})();
