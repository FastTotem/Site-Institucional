document.addEventListener('DOMContentLoaded', function() {

    var borderColorOk = 'rgba(0, 255, 0, 1)';
    var borderColorAlerta = 'rgba(255, 215, 0, 1)'; 
    var borderColorCritico = 'rgba(255, 99, 71, 1)';

var efficiencyCanvas = document.getElementById('efficiency-canvas').getContext('2d');

var efficiencyData = {
    labels: ['Totem 1', 'Totem 2', 'Totem 3', 'Totem 4', 'Totem 5', 'Totem 6', 'Totem 7', 'Totem 8', 'Totem 9', 'Totem 10'],
    datasets: [
        {
            data: [8, 6.5, 9, 7.5, 2, 4, 5, 9, 1, 3.5],
            backgroundColor: 'rgba(0, 255, 0, 0.7)',
            borderColor: borderColorOk,
            borderWidth: 2,
            label: 'Uptime',
        },
        {
            data: [2, 3.5, 1, 2.5, 8, 6, 5, 1, 9, 6.5],
            backgroundColor: 'rgba(255, 99, 71, 0.7)',
            borderColor: borderColorCritico,
            borderWidth: 2,
            label: 'Downtime',
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
                stacked: false,
                beginAtZero: true,
                ticks: {
                    color: 'white',
                    font: {
                        family: 'Montserrat',
                    },
                },
                title: {
                    display: false,
                    text: 'Horas (h)'
                }
                
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10,
                    color: 'white',
                    font: {
                        family: 'Montserrat',
                    },
                },
                title: {
                    display: false,
                    text: 'Horas (h)' 
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        var label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += context.formattedValue + 'h';
                        return label;
                    }
                }
            }
        }
    }
});

});