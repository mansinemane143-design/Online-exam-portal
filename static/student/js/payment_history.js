document.addEventListener('DOMContentLoaded', function () {

  const downloadToastEl = document.getElementById('downloadToast');
  const downloadToast = new bootstrap.Toast(downloadToastEl, { delay: 2500 });
  const downloadButtons = document.querySelectorAll('.download-btn');

  downloadButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const txnId = btn.getAttribute('data-txn');
      const subject = btn.getAttribute('data-subject');
      const amount = btn.getAttribute('data-amount');
      const date = btn.getAttribute('data-date');
      const status = btn.getAttribute('data-status');

      generateReceipt(txnId, subject, amount, date, status);
    });
  });

  /**
   * Builds a simple text receipt and triggers a real file download
   * using a Blob + temporary anchor link (no server required).
   */
  function generateReceipt(txnId, subject, amount, date, status) {
    const receiptContent =
      '========================================\n' +
      '        STUDENT FEE PAYMENT RECEIPT\n' +
      '========================================\n\n' +
      'Transaction ID : ' + txnId + '\n' +
      'Subject        : ' + subject + '\n' +
      'Amount Paid    : ' + amount + '\n' +
      'Status         : ' + status + '\n' +
      'Date           : ' + date + '\n\n' +
      '----------------------------------------\n' +
      'This is a system generated receipt.\n' +
      'Keep this receipt safely for future reference.\n' +
      '========================================\n';

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'Receipt_' + txnId + '.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    downloadToast.show();
  }

});
