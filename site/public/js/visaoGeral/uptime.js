document.addEventListener('DOMContentLoaded', function() {

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
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            var label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.formattedValue + '%';
                            return label;
                        }
                    }
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