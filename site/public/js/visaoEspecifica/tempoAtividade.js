const ctx = document.getElementById('gaugeChart').getContext('2d');
const canvas = document.getElementById('gaugeChart');
canvas.height = window.innerHeight/4.5;

const data = {
    datasets: [{
        data: [],
        backgroundColor: [
            '#DC4444',
            'transparent'
        ],
        borderWidth: 0,
        borderJoinStyle: 'round',
        borderRadius: 25
    }]
};

const options = {
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

const gaugeChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options,
});
