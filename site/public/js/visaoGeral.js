document.addEventListener('DOMContentLoaded', function() {
    
    var statusCanvas = document.getElementById('status-canvas').getContext('2d');
    
    var borderColorOk = 'rgba(0, 255, 0, 1)';
    var borderColorAlerta = 'rgba(255, 215, 0, 1)'; 
    var borderColorCritico = 'rgba(255, 99, 71, 1)';
    
    var statusData = {
        labels: ['Ok', 'Alerta', 'Critico'],
        datasets: [{
            data: [1, 1, 1],
            backgroundColor: ['rgba(0, 255, 0, 0.7)', 'rgba(255, 215, 0, 0.7)', 'rgba(255, 99, 71, 0.7)'],
            borderColor: [borderColorOk, borderColorAlerta, borderColorCritico], 
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
    
    
    var uptimeCanvas = document.getElementById('uptime-canvas').getContext('2d');
    
    var uptimeData = {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        datasets: [{
            label: 'Uptime',
            data: [98, 70, 99, 76, 47, 95, 62],
            borderColor: '#BD06DD',
            backgroundColor: 'rgba(189, 6, 221, 0.2)',
            borderWidth: 2,
            tension: .4,
            fill: true,
            backgroundColor: (context) => {
                const background = [
                    "#BD06DD",
                    "#bd06dd2d"
                ]
    
                if (!context.chart.chartArea) {
                    return;
                }
    
                const { ctx, data, chartArea: { top, bottom } } = context.chart;
                const gradientBackground = ctx.createLinearGradient(0, top, 0, bottom);
                gradientBackground.addColorStop(0, background[0]);
                gradientBackground.addColorStop(.9, background[1]);
    
                return gradientBackground;
            },
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
                    display: false 
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

    var efficiencyCanvas = document.getElementById('efficiency-canvas').getContext('2d');

var efficiencyData = {
    labels: ['Totem 1', 'Totem 2', 'Totem 3', 'Totem 4'],
    datasets: [
        {
            data: [80, 65, 90, 75],
            backgroundColor: 'rgba(0, 255, 0, 0.7)',
            borderColor: borderColorOk,
            borderWidth: 2,
            label: 'Funcionando',
        },
        {
            data: [20, 35, 10, 25],
            backgroundColor: 'rgba(255, 99, 71, 0.7)',
            borderColor: borderColorCritico,
            borderWidth: 2,
            label: 'Parado',
        }
    ]
};

var efficiencyChart = new Chart(efficiencyCanvas, {
    type: 'bar',
    data: efficiencyData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: false
            },
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 10,
                },
                title: {
                    display: true,
                    text: 'Porcentagem (%)'
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltips: {
                callbacks: {
                    label: function (context) {
                        return context.formattedValue + '%';
                    }
                }
            }
        }
    }
});
});
