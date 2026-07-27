
(function () {
  'use strict'
  const form = document.querySelector('.needs-validation');

  // १. मोबाईल व्हॅलिडेशन (फक्त १० आकडे)
  document.getElementById('mobile').addEventListener('input', function(e){
    this.value = this.value.replace(/[^0-9]/g, ''); 
    if(this.value.length > 10){
      this.value = this.value.slice(0,10); 
    }
  });

  // २. वय व्हॅलिडेशन (फक्त २ आकडे)
  document.getElementById('age').addEventListener('input', function(e){
    this.value = this.value.replace(/[^0-9]/g, ''); 
    if(this.value.length > 2){
      this.value = this.value.slice(0,2); 
    }
  });

  // ३. फॉर्म सबमिट व्हॅलिडेशन
  form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      window.location.href = 'education.html';
    }
    form.classList.add('was-validated');
  }, false);
})();
