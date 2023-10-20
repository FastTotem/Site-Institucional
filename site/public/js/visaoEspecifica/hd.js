var ctxHD = document.getElementById("barChartHD").getContext("2d");

var labelsHD = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
var dataHD = {
    labels: labelsHD,
    datasets: [
        {
            label: 'Disco Local (C:)',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: "#BD06DD",
            tension: .4,
            fill: true,
            backgroundColor: '#BD06DD',
            borderRadius: 10,
        },
        {
            label: 'Disco Local (D:)',
            data: [32, 51, 10, 81, 90, 65, 25],
            borderColor: "#8D11A4",
            tension: .4,
            fill: true,
            backgroundColor: '#8D11A4',
            borderRadius: 10,
        },
    ],
};

var HDChart = new Chart(ctxHD, {
    type: "bar",
    data: dataHD,
    options: {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#FFF',
                    font: {
                        family: 'Montserrat',
                    }
                }
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
