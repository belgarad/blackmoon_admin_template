/* ── Dashboard Finance Page ──────────────────────────────── */
(function() {
  'use strict';
  var H = ChartHelpers;
  H.applyThemeDefaults();

  // Counter animation
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

  // Revenue vs Expenses — grouped bar
  var revCtx = H.canvas('chart-revenue-expense', 240);
  if (revCtx) {
    new Chart(revCtx, {
      type: 'bar',
      data: {
        labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
          { label: 'Revenue',  data: [98000,105000,112000,108000,118000,124800],
            backgroundColor: '#26C281', borderRadius: 4 },
          { label: 'Expenses', data: [64000,70000,73000,69000,75000,78200],
            backgroundColor: '#E7505A', borderRadius: 4 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { duration: 600, easing: 'easeInOutQuart' },
        plugins: { legend: { display: false }, tooltip: { callbacks: {
          label: function(ctx) { return ctx.dataset.label + ': $' + ctx.raw.toLocaleString(); }
        }}},
        scales: {
          x: H.xScale({ ticks: { color: '#95A5A6', font: { size: 12 } } }),
          y: H.yScale({ ticks: { color: '#95A5A6', font: { size: 12 }, callback: function(v) { return '$' + (v/1000).toFixed(0) + 'k'; } } })
        }
      }
    });
  }

  // Expense Breakdown — donut
  var expCtx = H.canvas('chart-expense-breakdown', 200);
  if (expCtx) {
    new Chart(expCtx, {
      type: 'doughnut',
      data: {
        labels: ['Salaries', 'Operations', 'Marketing', 'Software', 'Other'],
        datasets: [{ data: [42,24,18,11,5],
          backgroundColor: ['#3598DC','#26C281','#E87E04','#E7505A','#8775A7'], borderWidth: 0 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '72%',
        centerText: '$78.2k', centerLabel: 'Total',
        plugins: { legend: { display: false }, tooltip: { callbacks: {
          label: function(ctx) { return ctx.label + ': ' + ctx.raw + '%'; }
        }}}
      }
    });
  }

  // Cash Flow — column chart
  var cashCtx = H.canvas('chart-cashflow', 260);
  if (cashCtx) {
    new Chart(cashCtx, {
      type: 'bar',
      data: {
        labels: ['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr'],
        datasets: [{ label: 'Net Cash Flow',
          data: [18200,22400,15800,28600,24100,31200,19800,26400,22700,33100,28400,46600],
          backgroundColor: '#3598DC', borderRadius: 4 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { duration: 600, easing: 'easeInOutQuart' },
        plugins: { legend: { display: false }, tooltip: { callbacks: {
          label: function(v) { return 'Net Cash Flow: $' + v.raw.toLocaleString(); }
        }}},
        scales: {
          x: H.xScale({ ticks: { color: '#95A5A6', font: { size: 12 } } }),
          y: H.yScale({ ticks: { color: '#95A5A6', font: { size: 12 }, callback: function(v) { return '$' + (v/1000).toFixed(0) + 'k'; } } })
        }
      }
    });
  }
})();
