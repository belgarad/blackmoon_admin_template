/**
 * CRM page â€” Contacts table, Pipeline board, Activities, Charts
 * Dependencies: Chart.js (CDN), chart-helpers.js
 */
(function () {
  var H = ChartHelpers;
  H.applyThemeDefaults();

  // â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  var contacts = [
    { id:1,  name:'Alice Johnson',    title:'VP of Sales',         company:'Acme Corp',      email:'alice@acmecorp.com',      phone:'+1 555 012 3456', status:'active', last:'2h ago',    deals:3 },
    { id:2,  name:'Bob Martinez',     title:'Head of Engineering', company:'NexTech',         email:'bob@nextech.io',          phone:'+1 555 234 5678', status:'warm',   last:'1d ago',    deals:1 },
    { id:3,  name:'Carol Williams',   title:'Marketing Director',  company:'Blue Ocean',      email:'carol@blueocean.co',      phone:'+1 555 345 6789', status:'cold',   last:'5d ago',    deals:0 },
    { id:4,  name:'David Lee',        title:'CEO',                 company:'GridForce',       email:'david@gridforce.com',     phone:'+1 555 456 7890', status:'active', last:'30m ago',   deals:5 },
    { id:5,  name:'Eva Chen',         title:'Product Manager',     company:'Stellar Inc',     email:'eva@stellarinc.com',      phone:'+1 555 567 8901', status:'active', last:'3h ago',    deals:2 },
    { id:6,  name:'Frank Torres',     title:'CTO',                 company:'Meridian SaaS',   email:'frank@meridiansaas.com',  phone:'+1 555 678 9012', status:'warm',   last:'2d ago',    deals:1 },
    { id:7,  name:'Grace Park',       title:'Sales Manager',       company:'Vertex Labs',     email:'grace@vertexlabs.dev',    phone:'+1 555 789 0123', status:'active', last:'1h ago',    deals:4 },
    { id:8,  name:'Harry Wilson',     title:'COO',                 company:'Core Systems',    email:'harry@coresystems.net',   phone:'+1 555 890 1234', status:'cold',   last:'1w ago',    deals:0 },
    { id:9,  name:'Isla Brown',       title:'Account Executive',   company:'PeakSoft',        email:'isla@peaksoft.com',       phone:'+1 555 901 2345', status:'lost',   last:'2w ago',    deals:0 },
    { id:10, name:'James Davis',      title:'CFO',                 company:'DataBridge',      email:'james@databridge.io',     phone:'+1 555 012 3456', status:'active', last:'4h ago',    deals:2 },
    { id:11, name:'Karen Miller',     title:'Director of Sales',   company:'Fusion Cloud',    email:'karen@fusioncloud.com',   phone:'+1 555 111 2222', status:'warm',   last:'6h ago',    deals:3 },
    { id:12, name:'Liam Moore',       title:'Business Dev',        company:'OptiScale',       email:'liam@optiscale.com',      phone:'+1 555 333 4444', status:'cold',   last:'3d ago',    deals:1 },
  ];

  var avatarColors = ['bm-avatar-tone-indigo','bm-avatar-tone-cyan','bm-avatar-tone-amber','bm-avatar-tone-green','bm-avatar-tone-red','bm-avatar-tone-purple','bm-avatar-tone-sky','bm-avatar-tone-orange'];
  function avatarBg(i) { return avatarColors[i % avatarColors.length]; }

  function renderContacts(list) {
    var tbody = document.getElementById('contactTbody');
    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="9" class="bm-empty-cell">No contacts match your filters.</td></tr>';
      return;
    }
    tbody.innerHTML = list.map(function (c, i) {
      var initials = c.name.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2);
      var statusMap = { active: 'Active', warm: 'Warm', cold: 'Cold', lost: 'Lost' };
      return '<tr>' +
        '<td><input type="checkbox" class="bm-checkbox"></td>' +
        '<td><div class="contact-name">' +
          '<div class="bm-avatar bm-avatar-sm crm-contact-avatar ' + avatarBg(i) + '">' + initials + '</div>' +
          '<div class="contact-name-info"><strong>' + c.name + '</strong><span>' + c.title + '</span></div>' +
        '</div></td>' +
        '<td class="bm-text-caption">' + c.company + '</td>' +
        '<td class="bm-text-caption-mono"><a href="mailto:' + c.email + '" class="bm-link-muted">' + c.email + '</a></td>' +
        '<td class="bm-text-caption-mono">' + c.phone + '</td>' +
        '<td><span class="crm-badge ' + c.status + '">' + statusMap[c.status] + '</span></td>' +
        '<td class="bm-text-caption-muted">' + c.last + '</td>' +
        '<td class="bm-text-center-sm-bold">' + c.deals + '</td>' +
        '<td class="bm-nowrap">' +
          '<div class="bm-action-group">' +
            '<button class="bm-action-btn" title="View" onclick="App.toast.info(\'View contact\',\'' + c.name + '\')"><i class="ph ph-arrow-square-out"></i></button>' +
            '<button class="bm-action-btn" title="Edit" onclick="App.toast.info(\'Edit contact\',\'' + c.name + '\')"><i class="ph ph-pencil"></i></button>' +
            '<button class="bm-action-btn bm-action-danger" title="Delete" onclick="App.toast.danger(\'Deleted\',\'' + c.name + ' removed.\')"><i class="ph ph-trash"></i></button>' +
          '</div>' +
        '</td>' +
        '</tr>';
    }).join('');
  }

  window.filterContacts = function () {
    var query  = (document.getElementById('contactSearch').value  || '').toLowerCase();
    var status = (document.getElementById('statusFilter').value   || '');
    var filtered = contacts.filter(function (c) {
      var matchQ = !query  || (c.name + c.company + c.title + c.email).toLowerCase().indexOf(query) !== -1;
      var matchS = !status || c.status === status;
      return matchQ && matchS;
    });
    renderContacts(filtered);
  };

  window.toggleAllContacts = function (cb) {
    document.querySelectorAll('#contactTbody .bm-checkbox').forEach(function (el) { el.checked = cb.checked; });
  };

  // â”€â”€ Pipeline deals â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  var deals = {
    'To Contact': [
      { title: 'Enterprise SaaS Upgrade',  company: 'Acme Corp',     value: 48000,  priority: 'high', assignee: 'AJ' },
      { title: 'Annual Support Renewal',   company: 'NexTech',       value: 12500,  priority: 'mid',  assignee: 'BM' },
      { title: 'Consulting Package',       company: 'Blue Ocean',    value: 8200,   priority: 'low',  assignee: 'CW' },
    ],
    'Qualified': [
      { title: 'CRM Implementation',       company: 'GridForce',     value: 94000,  priority: 'high', assignee: 'DL' },
      { title: 'Data Migration Service',   company: 'Stellar Inc',   value: 22000,  priority: 'mid',  assignee: 'EC' },
      { title: 'Marketing Automation',     company: 'Meridian SaaS', value: 31500,  priority: 'mid',  assignee: 'FT' },
      { title: 'Security Audit',           company: 'Core Systems',  value: 18000,  priority: 'high', assignee: 'HW' },
    ],
    'Proposal': [
      { title: 'Cloud Infrastructure',     company: 'Vertex Labs',   value: 120000, priority: 'high', assignee: 'GP' },
      { title: 'API Integration Suite',    company: 'DataBridge',    value: 45000,  priority: 'mid',  assignee: 'JD' },
      { title: 'Analytics Dashboard',      company: 'Fusion Cloud',  value: 28000,  priority: 'low',  assignee: 'KM' },
    ],
    'Closed Won': [
      { title: 'Platform Rollout Q1',      company: 'PeakSoft',      value: 185000, priority: 'high', assignee: 'IB' },
      { title: 'Starter Plan x50',         company: 'OptiScale',     value: 15000,  priority: 'low',  assignee: 'LM' },
      { title: 'Enterprise License',       company: 'Core Systems',  value: 240000, priority: 'high', assignee: 'HW' },
    ]
  };

  var colColors = {
    'To Contact': 'bm-text-primary-plain',
    'Qualified':  'bm-text-warning-plain',
    'Proposal':   'bm-text-info-plain',
    'Closed Won': 'bm-text-success-plain'
  };

  function fmtValue(v) {
    if (v >= 1000000) return '$' + (v / 1000000).toFixed(1) + 'M';
    if (v >= 1000)    return '$' + Math.round(v / 1000) + 'K';
    return '$' + v;
  }

  function renderPipeline() {
    var board = document.getElementById('pipelineBoard');
    board.innerHTML = '';
    Object.keys(deals).forEach(function (colName) {
      var items = deals[colName];
      var total = items.reduce(function (s, d) { return s + d.value; }, 0);
      var col = document.createElement('div');
      col.className = 'pipeline-col';
      col.dataset.col = colName;
      col.innerHTML =
        '<div class="pipeline-col-header">' +
          '<span class="pipeline-col-title ' + colColors[colName] + '">' + colName + '</span>' +
          '<span class="pipeline-count">' + items.length + '</span>' +
        '</div>' +
        '<div class="pipeline-value-total">' + fmtValue(total) + '</div>';

      items.forEach(function (deal, di) {
        var card = document.createElement('div');
        card.className = 'deal-card';
        card.draggable = true;
        card.dataset.col  = colName;
        card.dataset.idx  = di;
        card.innerHTML =
          '<div class="deal-title">' + deal.title + '</div>' +
          '<div class="deal-company"><i class="ph ph-buildings bm-text-body"></i>' + deal.company + '</div>' +
          '<div class="deal-footer">' +
            '<span class="deal-value">' + fmtValue(deal.value) + '</span>' +
            '<span class="deal-priority ' + deal.priority + '">' + deal.priority.charAt(0).toUpperCase() + deal.priority.slice(1) + '</span>' +
            '<div class="bm-avatar crm-deal-avatar ' + avatarBg(di) + '">' + deal.assignee + '</div>' +
          '</div>';
        card.addEventListener('dragstart', function (e) {
          e.dataTransfer.setData('text/plain', JSON.stringify({ col: colName, idx: di }));
          card.classList.add('crm-dragging');
        });
        card.addEventListener('dragend', function () { card.classList.remove('crm-dragging'); });
        col.appendChild(card);
      });

      col.addEventListener('dragover',  function (e) { e.preventDefault(); col.classList.add('drag-over'); });
      col.addEventListener('dragleave', function (e) { if (!col.contains(e.relatedTarget)) col.classList.remove('drag-over'); });
      col.addEventListener('drop', function (e) {
        e.preventDefault();
        col.classList.remove('drag-over');
        try {
          var data = JSON.parse(e.dataTransfer.getData('text/plain'));
          if (data.col === colName) return;
          var item = deals[data.col].splice(data.idx, 1)[0];
          deals[colName].push(item);
          renderPipeline();
          App.toast.success('Deal moved', item.title + ' â†’ ' + colName);
        } catch (err) { /* ignore */ }
      });
      board.appendChild(col);
    });
  }

  // â”€â”€ Activities â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  var allActivities = [
    { type: 'contact', icon: 'ph-user-plus',        color: 'primary', text: 'New contact <strong>Alice Johnson</strong> added',                  sub: 'By David Lee',      time: '2 min ago'  },
    { type: 'deal',    icon: 'ph-arrows-left-right', color: 'warning', text: 'Deal <strong>CRM Implementation</strong> moved to Proposal',        sub: 'By Grace Park',     time: '45 min ago' },
    { type: 'deal',    icon: 'ph-check-circle',      color: 'success', text: 'Deal <strong>Platform Rollout Q1</strong> closed â€” $185,000',       sub: 'By Isla Brown',     time: '1h ago'     },
    { type: 'email',   icon: 'ph-envelope',          color: 'info',    text: 'Email sent to <strong>Bob Martinez</strong> â€” Follow-up',           sub: 'By Karen Miller',   time: '2h ago'     },
    { type: 'note',    icon: 'ph-note',              color: 'muted',   text: 'Note added to <strong>Stellar Inc</strong> account',                sub: 'By Eva Chen',       time: '3h ago'     },
    { type: 'contact', icon: 'ph-user-minus',        color: 'danger',  text: 'Contact <strong>Isla Brown</strong> marked as Lost',                sub: 'By James Davis',    time: '5h ago'     },
    { type: 'deal',    icon: 'ph-plus-circle',       color: 'primary', text: 'New deal <strong>Cloud Infrastructure</strong> created â€” $120,000', sub: 'By Grace Park',     time: '1d ago'     },
    { type: 'email',   icon: 'ph-phone-call',        color: 'success', text: 'Call logged with <strong>GridForce</strong>',                       sub: 'By Alice Johnson',  time: '1d ago'     },
    { type: 'note',    icon: 'ph-note-pencil',       color: 'warning', text: 'Contact <strong>Frank Torres</strong> info updated',                sub: 'By Bob Martinez',   time: '2d ago'     },
    { type: 'deal',    icon: 'ph-pencil-simple',     color: 'info',    text: 'Deal <strong>Security Audit</strong> value updated to $18,000',     sub: 'By David Lee',      time: '2d ago'     },
    { type: 'contact', icon: 'ph-user-circle-plus',  color: 'primary', text: 'Contact <strong>Karen Miller</strong> assigned to Alice Johnson',   sub: 'By Admin',          time: '3d ago'     },
    { type: 'email',   icon: 'ph-envelope-open',     color: 'info',    text: 'Proposal email sent to <strong>Vertex Labs</strong>',               sub: 'By Grace Park',     time: '3d ago'     },
  ];

  var iconColorClass = {
    primary: 'crm-act-icon-primary',
    warning: 'crm-act-icon-warning',
    success: 'crm-act-icon-success',
    danger:  'crm-act-icon-danger',
    info:    'crm-act-icon-info',
    muted:   'crm-act-icon-muted'
  };

  function renderActivities(list) {
    var el = document.getElementById('activitiesList');
    if (!list.length) {
      el.innerHTML = '<div class="bm-empty-cell">No activities to show.</div>';
      return;
    }
    el.innerHTML = list.map(function (a) {
      return '<div class="crm-activity-item">' +
        '<div class="crm-act-icon-wrap ' + (iconColorClass[a.color] || iconColorClass.muted) + '"><i class="ph ' + a.icon + '"></i></div>' +
        '<div class="crm-act-body">' +
          '<div class="crm-act-text">' + a.text + '</div>' +
          '<div class="crm-act-meta"><span>' + a.sub + '</span><span class="crm-act-time">' + a.time + '</span></div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  window.filterActivities = function () {
    var type = document.getElementById('activityFilter').value;
    var filtered = type ? allActivities.filter(function (a) { return a.type === type; }) : allActivities;
    renderActivities(filtered);
  };

  // â”€â”€ Tab switch â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  window.switchCrmTab = function (name, btn) {
    document.querySelectorAll('.crm-tab').forEach(function (t)   { t.classList.remove('active'); });
    document.querySelectorAll('.crm-panel').forEach(function (p) { p.classList.remove('active'); });
    btn.classList.add('active');
    document.getElementById('panel-' + name).classList.add('active');
  };

  // â”€â”€ Modals â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  window.openAddContactModal = function () {
    document.getElementById('addContactModal').classList.remove('bm-d-none');
    document.body.style.overflow = 'hidden';
  };
  window.closeAddContactModal = function () {
    document.getElementById('addContactModal').classList.add('bm-d-none');
    document.body.style.overflow = '';
  };
  window.saveContact = function () {
    var name = document.getElementById('acName').value.trim();
    if (!name) { App.toast.danger('Validation', 'Please enter a name.'); return; }
    contacts.unshift({
      id:      Date.now(),
      name:    name,
      title:   document.getElementById('acTitle').value.trim()   || 'â€”',
      company: document.getElementById('acCompany').value.trim() || 'â€”',
      email:   document.getElementById('acEmail').value.trim()   || 'â€”',
      phone:   document.getElementById('acPhone').value.trim()   || 'â€”',
      status:  document.getElementById('acStatus').value,
      last:    'just now',
      deals:   0
    });
    renderContacts(contacts);
    closeAddContactModal();
    App.toast.success('Contact added', name + ' has been added to your contacts.');
    ['acName','acTitle','acCompany','acPhone','acEmail'].forEach(function (id) { document.getElementById(id).value = ''; });
  };

  window.openAddDealModal = function () {
    document.getElementById('addDealModal').classList.remove('bm-d-none');
    document.body.style.overflow = 'hidden';
  };
  window.closeAddDealModal = function () {
    document.getElementById('addDealModal').classList.add('bm-d-none');
    document.body.style.overflow = '';
  };
  window.saveDeal = function () {
    var title = document.getElementById('adTitle').value.trim();
    if (!title) { App.toast.danger('Validation', 'Please enter a deal title.'); return; }
    var stage    = document.getElementById('adStage').value;
    var company  = document.getElementById('adCompany').value.trim() || 'â€”';
    var rawVal   = parseInt(document.getElementById('adValue').value, 10);
    var value    = isNaN(rawVal) ? 0 : rawVal;
    var priority = document.getElementById('adPriority').value;
    deals[stage].push({ title: title, company: company, value: value, priority: priority, assignee: '??' });
    renderPipeline();
    closeAddDealModal();
    App.toast.success('Deal added', title + ' added to ' + stage + '.');
    ['adTitle','adCompany','adValue'].forEach(function (id) { document.getElementById(id).value = ''; });
  };

  // â”€â”€ Charts â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function initCharts() {
    var revCtx = H.canvas('crmRevenueChart', 200);
    if (revCtx) {
      new Chart(revCtx, {
        type: 'line',
        data: {
          labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
          datasets: [
            {
              label: 'Pipeline Value',
              data: [120000, 148000, 95000, 178000, 203000, 218000],
              borderColor: 'var(--primary)',
              borderWidth: 2,
              fill: true,
              backgroundColor: H.areaGradient(revCtx, '#3598DC', 0.35, 0.05),
              pointRadius: 0,
              tension: 0.4
            },
            {
              label: 'Closed Revenue',
              data: [88000, 102000, 74000, 135000, 162000, 185000],
              borderColor: 'var(--success,#26C281)',
              borderWidth: 2,
              fill: true,
              backgroundColor: H.areaGradient(revCtx, '#26C281', 0.35, 0.05),
              pointRadius: 0,
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 600, easing: 'easeInOutQuart' },
          plugins: {
            legend: {
              display: true, position: 'top', align: 'end',
              labels: { font: { size: 12, family: 'inherit' }, boxWidth: 8, boxHeight: 8, color: H.txtColor() }
            },
            tooltip: {
              callbacks: {
                label: function (ctx) { return ctx.dataset.label + ': $' + ctx.raw.toLocaleString(); }
              }
            }
          },
          scales: {
            x: H.xScale({ ticks: { color: H.txtColor(), font: { size: 12 } } }),
            y: H.yScale({ ticks: { color: H.txtColor(), font: { size: 12 }, callback: function (v) { return '$' + Math.round(v / 1000) + 'K'; } } })
          }
        }
      });
    }

    var donutCtx = H.canvas('crmDonutChart', 180);
    if (donutCtx) {
      new Chart(donutCtx, {
        type: 'doughnut',
        data: {
          labels: ['To Contact', 'Qualified', 'Proposal', 'Closed Won'],
          datasets: [{
            data: [28, 34, 18, 14],
            backgroundColor: ['var(--primary)', '#E87E04', '#4C87B9', 'var(--success,#26C281)'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function (ctx) { return ctx.label + ': ' + ctx.raw + ' deals'; }
              }
            }
          }
        }
      });
    }
  }

  // â”€â”€ Init â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  renderContacts(contacts);
  renderPipeline();
  renderActivities(allActivities);
  initCharts();
})();
