document.addEventListener('DOMContentLoaded', function() {
    var uptimeCanvas = document.getElementById('uptime-canvas').getContext('2d');

    var hoursOfDay = ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'];

    var cpuData = [90, 80, 95, 70, 60, 85, 75, 70, 75, 80, 85, 90, 95, 80, 75, 70, 65, 60, 55, 60, 65, 70, 75, 80];

    var ramData = [80, 70, 85, 75, 65, 90, 80, 75, 70, 85, 90, 70, 85, 80, 75, 70, 80, 75, 70, 85, 80, 75, 70, 80];

    var hdData = [70, 60, 75, 65, 55, 80, 70, 75, 60, 75, 70, 75, 65, 60, 75, 70, 75, 60, 75, 70, 75, 65, 60, 75];

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
                        color: 'white'
                    }
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
                        color: 'white' 
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)' 
                    }
                },
                x: {
                    ticks: {
                        color: 'white' 
                    },
                    grid: {
                        display: false 
                    }
                }
            },
            
        },
    });
});
