document.addEventListener('DOMContentLoaded', function() {

    var statusCanvas = document.getElementById('status-canvas').getContext('2d');
    
    var borderColorOk = 'rgba(0, 255, 0, 1)';
    var borderColorAlerta = 'rgba(255, 215, 0, 1)'; 
    var borderColorCritico = 'rgba(255, 99, 71, 1)';
    
    var statusData = {
        labels: ['Critico', 'Alerta', 'Ok'],
        datasets: [{
            data: [1, 2, 5],
            backgroundColor: [ 'rgba(255, 99, 71, 0.7)', 'rgba(255, 215, 0, 0.7)' ,'rgba(0, 255, 0, 0.7)'],
            borderColor: [borderColorCritico, borderColorAlerta, borderColorOk], 
            borderWidth: 2, 
        }]
    };
    
    var statusChart = new Chart(statusCanvas, {
        type: 'doughnut',
        data: statusData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            cutoutPercentage: 0,
        },
    });    

});