document.addEventListener("DOMContentLoaded", function() {
    var ctx = document.getElementById('myChart').getContext('2d');
      var data = {
      labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
      datasets: [{
        label: 'Nombre d\'employés',
        data: [12, 19, 3, 5, 2, 3, 7,31,40,21,15,34],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 3
      }]
    };
  
    var config = {
      type: 'bar', 
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
      var myChart = new Chart(ctx, config);
  });
  