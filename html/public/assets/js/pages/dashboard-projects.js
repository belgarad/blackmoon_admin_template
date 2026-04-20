/* ── Dashboard Projects Page ─────────────────────────────── */
(function() {
  'use strict';
  var H = ChartHelpers;
  H.applyThemeDefaults();

  // Project Completion — area chart
  var compCtx = H.canvas('chart-project-completion', 260);
  if (compCtx) {
    new Chart(compCtx, {
      type: 'line',
      data: {
        labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
          { label: 'Completed', data: [18,28,38,52,64,78],
            borderColor: '#26C281', borderWidth: 2, fill: true,
            backgroundColor: H.areaGradient(compCtx, '#26C281', 0.25, 0.02),
            pointRadius: 0, tension: 0.4 },
          { label: 'Remaining', data: [82,72,62,48,36,22],
            borderColor: '#E87E04', borderWidth: 2, fill: true,
            backgroundColor: H.areaGradient(compCtx, '#E87E04', 0.25, 0.02),
            pointRadius: 0, tension: 0.4 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { duration: 600, easing: 'easeInOutQuart' },
        plugins: { legend: { display: false }, tooltip: { callbacks: {
          label: function(ctx) { return ctx.dataset.label + ': ' + ctx.raw + ' tasks'; }
        }}},
        scales: {
          x: H.xScale({ ticks: { color: '#95A5A6', font: { size: 12 } } }),
          y: H.yScale({ ticks: { color: '#95A5A6', font: { size: 12 } } })
        }
      }
    });
  }

  // Task Status — donut chart
  var taskCtx = H.canvas('chart-task-status', 186);
  if (taskCtx) {
    new Chart(taskCtx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'In Progress', 'Pending', 'Overdue'],
        datasets: [{ data: [64,22,10,4],
          backgroundColor: ['#26C281','#3598DC','#E87E04','#E7505A'], borderWidth: 0 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '72%',
        centerText: '145', centerLabel: 'Total',
        plugins: { legend: { display: false }, tooltip: { callbacks: {
          label: function(ctx) { return ctx.label + ': ' + ctx.raw + '%'; }
        }}}
      }
    });
  }
})();
