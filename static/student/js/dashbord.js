/* ===========================================================
   Payment History - minimal JS
   Only job: make the Download button actually download a file.

   Right now (no backend yet) it builds a simple receipt text
   file on the spot, using the data-* attributes on each button.

   WHEN BACKEND IS READY:
   Just give each button a real file URL instead, e.g.:
       <a href="{{ txn.receipt_url }}" download class="btn-download">Download</a>
   and you can delete this whole file - no JS needed anymore.
=========================================================== */

document.querySelectorAll(".btn-download").forEach(function (btn) {
  if (btn.disabled) return;

  btn.addEventListener("click", function () {
    const txn     = btn.dataset.txn;
    const subject = btn.dataset.subject;
    const amount  = btn.dataset.amount;
    const date    = btn.dataset.date;

    const receiptText =
`ONLINE EXAM PORTAL
--------------------------------
Payment Receipt

Transaction ID : #${txn}
Subject        : ${subject}
Amount Paid    : Rs. ${amount}
Date           : ${date}
Status         : Success
--------------------------------
Thank you for your payment.`;

    // Build a downloadable text file right in the browser (no backend call)
    const blob = new Blob([receiptText], { type: "text/plain" });
    const url  = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Receipt_${txn}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  });
});
