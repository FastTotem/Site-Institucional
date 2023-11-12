const ctxHD = document.getElementById("barChartHD").getContext("2d");

const labelsHD = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
const dataHD = {
    labels: labelsHD,
    datasets: [],
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
