const ctxRAM = document.getElementById("barChartRAM").getContext("2d");

const labelsRAM = days;
const dataRAM = {
    labels: labelsRAM,
    datasets: [
        {
            data: [],
            borderColor: "#BD06DD",
            tension: .4,
            fill: true,
            backgroundColor: (context) => {
                const background = [
                    "#B411D1",
                    "#bd06dd60"
                ]

                if(!context.chart.chartArea) {
                    return;
                }

                const { ctx, data, chartArea: { top, bottom } } = context.chart;
                const gradientBackground = ctx.createLinearGradient(0, top, 0, bottom);
                gradientBackground.addColorStop(.5, background[0]);
                gradientBackground.addColorStop(1, background[1]);

                return gradientBackground;
            },
            borderRadius: 10,
        }
    ],
};

const RAMChart = new Chart(ctxRAM, {
    type: "bar",
    data: dataRAM,
    options: {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.parsed.y + '% de uso de RAM';
                    }
                }
            },
        },
        responsive: true,
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
