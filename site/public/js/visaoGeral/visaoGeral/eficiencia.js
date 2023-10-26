document.addEventListener('DOMContentLoaded', function() {

    var borderColorOk = 'rgb(44, 161, 100)';
    var borderColorAlerta = 'rgba(255, 215, 0, 1)'; 
    var borderColorCritico = 'rgba(255, 99, 71, 1)';

var efficiencyCanvas = document.getElementById('efficiency-canvas').getContext('2d');

var efficiencyData = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10'],
    datasets: [
        {
            data: [18, 13, 9, 7.5, 3, 10, 5, 10, 2, 9.5],
            backgroundColor: 'rgb(44, 161, 100)',
            borderColor: borderColorOk,
            borderWidth: 2,
            label: 'Uptime',
        },
        {
            data: [4, 11, 15, 16.5, 21, 14, 19, 14, 15, 14.5],
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
                    stepSize: 5,
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