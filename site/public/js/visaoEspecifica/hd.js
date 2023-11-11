const ctxHD = document.getElementById("barChartHD").getContext("2d");

const labelsHD = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
const dataHD = {
    labels: labelsHD,
    datasets: [
        {
            label: 'Disco Local (C:)',
            data: [],
            borderColor: "#BD06DD",
            tension: .4,
            fill: true,
            backgroundColor: '#BD06DD',
            borderRadius: 10,
        },
        {
            label: 'Disco Local (D:)',
            data: [],
            borderColor: "#8D11B5",
            tension: .4,
            fill: true,
            backgroundColor: '#7D167F',
            borderRadius: 10,
        },
    ],
};

const HDChart = new Chart(ctxHD, {
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
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        var label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += context.formattedValue + '% de armazenamento ocupado';
                        return label;
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
