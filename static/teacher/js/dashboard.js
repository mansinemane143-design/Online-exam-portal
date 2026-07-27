
  // Exam Performance Overview - Bar Chart
  const examCtx = document.getElementById('examChart').getContext('2d');
  new Chart(examCtx, {
    type: 'bar',
    data: {
      labels: ['Math', 'Science', 'English', 'Computer', 'History'],
      datasets: [
        {
          label: 'Pass',
          data: [82, 68, 63, 88, 58],
          backgroundColor: '#1fbf75',
          borderRadius: 5,
          barThickness: 22
        },
        {
          label: 'Fail',
          data: [18, 22, 27, 12, 24],
          backgroundColor: '#f0506e',
          borderRadius: 5,
          barThickness: 22
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#8a90a8', font: { size: 11, weight: '600' } } },
        y: {
          beginAtZero: true,
          max: 100,
          grid: { color: '#eef0f7' },
          ticks: { color: '#8a90a8', stepSize: 25, font: { size: 11 } }
        }
      }
    }
  });

  // User Distribution - Donut Chart
  const donutCtx = document.getElementById('userDonut').getContext('2d');
  new Chart(donutCtx, {
    type: 'doughnut',
    data: {
      labels: ['Students', 'Teachers'],
      datasets: [{
        data: [94, 6],
        backgroundColor: ['#1b2250', '#9b8cf5'],
        borderWidth: 0,
        cutout: '72%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: true } }
    }
  });
