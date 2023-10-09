document.addEventListener('DOMContentLoaded', function() {
    
    var statusCanvas = document.getElementById('status-canvas').getContext('2d');
    
    var statusData = {
        labels: ['Ok', 'Alerta', 'Critico'],
        datasets: [{
            data: [1, 1, 1],
            backgroundColor: ['#00FF00', '#FFCE56', '#FF5733'],
        }]
    };
    
    var statusChart = new Chart(statusCanvas, {
        type: 'pie',
        data: statusData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        },
    });
    
    var uptimeCanvas = document.getElementById('uptime-canvas').getContext('2d');
    
    var uptimeData = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        datasets: [{
            label: 'Uptime',
            data: [98, 97, 99, 96, 98],
            borderColor: '#BD06DD',
            backgroundColor: 'rgba(189, 6, 221, 0.2)',
            borderWidth: 2,
            fill: true,
        }]
    };
    
    var uptimeChart = new Chart(uptimeCanvas, {
        type: 'line',
        data: uptimeData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Remova a legenda
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 10,
                    },
                },
            },
        },
    });
});
