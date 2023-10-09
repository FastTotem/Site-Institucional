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
            backgroundColor: '#BD06DD',
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
