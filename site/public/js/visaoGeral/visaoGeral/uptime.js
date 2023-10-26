document.addEventListener('DOMContentLoaded', function() {
    var uptimeCanvas = document.getElementById('uptime-canvas').getContext('2d');

    var hoursOfDay = ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'];

    var padraoData = [70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70];

    var cpuData = [30, 30, 45, 70, 60, 23, 28, 25, 63, 69, 71, 74, 95, 92, 98, 81, 83, 86, 78, 79, 68, 61, 50, 57];

    var ramData = [40, 50, 65, 75, 78, 81, 80, 79, 72, 83, 90, 91, 96, 94, 88, 82, 73, 75, 69, 63, 59, 55, 49, 47];

    var hdData = [70, 60, 55, 65, 50, 80, 83, 87, 69, 63, 68, 74, 79, 81, 82, 78, 75, 71, 64, 57, 49, 43, 60, 76];

    var uptimeData = {
        labels: hoursOfDay,
        datasets: [
            {
                label: 'CPU',
                data: cpuData,
                borderColor: '#119DA4',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
            },
            {
                label: 'RAM',
                data: ramData,
                borderColor: 'blue',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
            },
            {
                label: 'HD',
                data: hdData,
                borderColor: '#12664F',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Base',
                data: padraoData,
                borderColor: 'yellow',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointStyle: false,
            }

        ]
    };

    var uptimeChart = new Chart(uptimeCanvas, {
        type: 'line',
        data: uptimeData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'white',
                        font: {
                            family: 'Montserrat',
                        },
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            var label = context.dataset.label || '';
                            console.log(label);
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
                        color: 'white',
                        font: {
                            family: 'Montserrat',
                        },
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)' 
                    }
                },
                x: {
                    ticks: {
                        color: 'white',
                        font: {
                            family: 'Montserrat',
                        },
                    },
                    grid: {
                        display: false
                    }
                }
            },
            
        },
    });
});
