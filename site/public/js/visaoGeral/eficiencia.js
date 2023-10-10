document.addEventListener('DOMContentLoaded', function() {

    var borderColorOk = 'rgba(0, 255, 0, 1)';
    var borderColorAlerta = 'rgba(255, 215, 0, 1)'; 
    var borderColorCritico = 'rgba(255, 99, 71, 1)';

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
        }
    }
});

});