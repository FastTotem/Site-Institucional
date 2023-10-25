var ctxRAM = document.getElementById("barChartRAM").getContext("2d");

var labelsRAM = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
var dataRAM = {
    labels: labelsRAM,
    datasets: [
        {
            data: [65, 59, 80, 81, 56, 55, 40],
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

var RAMChart = new Chart(ctxRAM, {
    type: "bar",
    data: dataRAM,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        },
        tooltips: {
            enabled: false,
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
