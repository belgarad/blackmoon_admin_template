(function () {
  'use strict';
  var H = ChartHelpers;
  H.applyThemeDefaults();

  function renderSparkline(id, color, data) {
    var ctx = H.canvas(id, 40);
    if (!ctx) return;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(function(_, i) { return i; }),
        datasets: [{ data: data, borderColor: color, borderWidth: 1.5,
          fill: true, backgroundColor: H.areaGradient(ctx, color, 0.3, 0.05),
          pointRadius: 0, tension: 0.4 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } }
      }
    });
  }

  renderSparkline('spark-dau',     '#3598DC', [42,48,40,55,52,60,58,65,62,70,68,75]);
  renderSparkline('spark-views',   '#26C281', [220,280,250,310,340,380,360,410,400,450,430,480]);
  renderSparkline('spark-bounce',  '#E7505A', [40,38,42,36,38,35,37,34,36,33,35,32]);
  renderSparkline('spark-signups', '#8775A7', [18,22,20,28,25,32,30,38,35,42,40,48]);
  App.initCounters && App.initCounters();
})();
