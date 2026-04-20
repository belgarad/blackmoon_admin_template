/* ── Invoices Page ───────────────────────────────────────── */
(function() {
  'use strict';

  var invoices = [
    { id:'INV-0050', client:'Acme Corp',         clientImg:'AC', issue:'Dec 28, 2024', due:'Jan 27, 2025', amount:'$4,800.00', status:'pending' },
    { id:'INV-0049', client:'NexTech Solutions',  clientImg:'NT', issue:'Dec 20, 2024', due:'Jan 19, 2025', amount:'$12,400.00',status:'paid'    },
    { id:'INV-0048', client:'Blue Ocean Labs',    clientImg:'BO', issue:'Dec 15, 2024', due:'Jan 14, 2025', amount:'$3,200.00', status:'overdue'  },
    { id:'INV-0047', client:'Stellar Media',      clientImg:'SM', issue:'Dec 10, 2024', due:'Jan 9, 2025',  amount:'$7,650.00', status:'paid'    },
    { id:'INV-0046', client:'GridForce Inc.',     clientImg:'GF', issue:'Dec 3, 2024',  due:'Jan 2, 2025',  amount:'$1,500.00', status:'draft'   },
    { id:'INV-0045', client:'Acme Corp',          clientImg:'AC', issue:'Nov 28, 2024', due:'Dec 28, 2024', amount:'$9,200.00', status:'paid'    },
    { id:'INV-0044', client:'NexTech Solutions',  clientImg:'NT', issue:'Nov 22, 2024', due:'Dec 22, 2024', amount:'$5,400.00', status:'paid'    },
    { id:'INV-0043', client:'Meridian Agency',    clientImg:'MA', issue:'Nov 15, 2024', due:'Dec 15, 2024', amount:'$2,700.00', status:'overdue' },
    { id:'INV-0042', client:'Blue Ocean Labs',    clientImg:'BO', issue:'Nov 10, 2024', due:'Dec 10, 2024', amount:'$8,800.00', status:'paid'    },
    { id:'INV-0041', client:'Stellar Media',      clientImg:'SM', issue:'Nov 5, 2024',  due:'Dec 5, 2024',  amount:'$3,100.00', status:'paid'    },
  ];

  window.renderInvoices = function(list) {
    var tbody = document.getElementById('invoiceBody');
    tbody.innerHTML = list.map(function(inv) {
      var badgeMap = { paid:'bm-badge-success', pending:'bm-badge-warning', overdue:'bm-badge-danger', draft:'bm-badge-info' };
      var badgeClass = badgeMap[inv.status] || 'bm-badge-info';
      return '<tr class="bm-row-divider">' +
        '<td class="bm-p-4-5"><input type="checkbox"></td>' +
        '<td class="bm-p-md-td-bold">' + inv.id + '</td>' +
        '<td class="bm-p-4-3">' +
          '<div class="bm-flex-center-gap">' +
            '<div class="bm-avatar bm-avatar-xs bm-text-xs">' + inv.clientImg + '</div>' +
            '<span class="bm-text-body-medium">' + inv.client + '</span>' +
          '</div>' +
        '</td>' +
        '<td class="bm-p-md-row-bottom">' + inv.issue + '</td>' +
        '<td class="bm-p-md-row-bottom">' + inv.due + '</td>' +
        '<td class="bm-p-base-td-right">' + inv.amount + '</td>' +
        '<td class="bm-p-md-center"><span class="bm-badge ' + badgeClass + '">' + inv.status + '</span></td>' +
        '<td class="bm-td-right">' +
          '<div class="bm-action-group">' +
            '<button class="bm-action-btn" title="View" onclick="App.toast.info(\'Invoice\',\'Viewing ' + inv.id + '.\')"><i class="ph ph-eye"></i></button>' +
            '<button class="bm-action-btn" title="Download PDF" onclick="App.toast.success(\'Downloading\',\'' + inv.id + '.pdf downloading…\')"><i class="ph ph-download-simple"></i></button>' +
            '<button class="bm-action-btn" title="Send" onclick="App.toast.success(\'Sent\',\'Invoice emailed to client.\')"><i class="ph ph-paper-plane-tilt"></i></button>' +
          '</div>' +
        '</td>' +
      '</tr>';
    }).join('');
  };

  window.filterInvoices = function(q) {
    var status = document.getElementById('statusFilter').value;
    q = (q || document.querySelector('input[placeholder="Search invoices…"]').value || '').toLowerCase();
    var filtered = invoices.filter(function(inv) {
      var matchQ = !q || inv.id.toLowerCase().includes(q) || inv.client.toLowerCase().includes(q);
      var matchS = !status || inv.status === status;
      return matchQ && matchS;
    });
    renderInvoices(filtered);
  };

  window.toggleAll = function(cb) {
    document.querySelectorAll('#invoiceBody input[type=checkbox]').forEach(function(el) { el.checked = cb.checked; });
  };

  renderInvoices(invoices);

})();
