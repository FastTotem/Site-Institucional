var ctxCPU = document.getElementById("lineChartCPU").getContext("2d");

var labelsCPU = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
var dataCPU = {
    labels: labelsCPU,
    datasets: [
        {
            data: [65, 59, 80, 87, 56, 41, 33],
            borderColor: "#BD06DD",
            tension: 0.4,
            fill: true,
            backgroundColor: (context) => {
                const background = ["#BD06DD", "#bd06dd2d"];

                if (!context.chart.chartArea) {
                    return;
                }

                const { ctx, data, chartArea: { top, bottom } } = context.chart;
                const gradientBackground = ctx.createLinearGradient(0, top, 0, bottom);
                gradientBackground.addColorStop(0, background[0]);
                gradientBackground.addColorStop(0.9, background[1]);

                return gradientBackground;
            },
        },
    ],
};

var cpuChart = new Chart(ctxCPU, {
    type: "line",
    data: dataCPU,
    options: {
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
                        label += context.formattedValue + '% de uso de CPU';
                        return label;
                    }
                }
            }
        },
        tooltips: {
            enabled: true,
            callbacks: {
                label: function (tooltipItem) {
                    return tooltipItem.parsed + " horas";
                }
            }
        },        
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    color: 'white',
                },
                ticks: {
                    color: 'white',
                    font: {
                        family: 'Montserrat',
                    },
                },
                grid: {
                    color: '#FFFFFF20',
                },
                border: {
                    color: '#FFFFFF20'
                }
            },
            y: {
                min: 0,
                max: 100,
                display: true,
                title: {
                    display: true,
                    color: 'white'
                },
                ticks: {
                    color: 'white',
                    font: {
                        family: 'Montserrat',
                    },
                },
                grid: {
                    color: '#FFFFFF20',
                },
                border: {
                    color: '#FFFFFF20'
                }
            },
        },
    },
});