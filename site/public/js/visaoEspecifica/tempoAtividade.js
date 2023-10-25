var ctx = document.getElementById('gaugeChart').getContext('2d');
var canvas = document.getElementById('gaugeChart');
canvas.height = window.innerHeight/4.5;

var data = {
    datasets: [{
        data: [70, 30],
        backgroundColor: [
            '#DC4444',
            'transparent'
        ],
        borderWidth: 0,
        borderJoinStyle: 'round',
        borderRadius: 25
    }]
};

var options = {
    circumference: Math.PI * 76,
    rotation: 240,
    cutout: "85%",
    legend: {
        display: false,
    },
    tooltips: {
        enabled: true,
    },
    responsive: false,
    plugins: {
        tooltip: {
            callbacks: {
                label: function (context) {
                    var label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += context.formattedValue + '% de uso do tempo aceitável';
                    return label;
                }
            }
        }
    }
};

var gaugeChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options,
});
