document.addEventListener('DOMContentLoaded', function () {

  const payButton = document.getElementById('payButton');
  const paymentToastEl = document.getElementById('paymentToast');
  const successToastEl = document.getElementById('successToast');
  const options = document.querySelectorAll('.payment-icon-btn');
  const selectedLabel = document.getElementById('selectedMethodLabel');

  const paymentToast = new bootstrap.Toast(paymentToastEl, { delay: 3000 });
  const successToast = new bootstrap.Toast(successToastEl, { delay: 3500 });

  options.forEach(function (opt) {
    opt.addEventListener('click', function () {
      options.forEach(function (o) { o.classList.remove('selected'); });
      opt.classList.add('selected');
      selectedLabel.innerHTML = 'Selected: <span>' + opt.getAttribute('data-name') + '</span>';
    });
  });

  payButton.addEventListener('click', function () {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');

    if (!selectedMethod) {
      paymentToast.show();
      return;
    }

    processPayment(selectedMethod.value);
  });

  function processPayment(method) {
    const originalText = payButton.innerHTML;
    payButton.disabled = true;
    payButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing...';

    setTimeout(function () {
      payButton.disabled = false;
      payButton.innerHTML = originalText;
      successToast.show();
      console.log('Payment completed successfully using: ' + method);
    }, 1800);
  }

});
