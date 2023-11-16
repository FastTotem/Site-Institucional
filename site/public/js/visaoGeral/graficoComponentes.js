
document.addEventListener('DOMContentLoaded', function () {

    getCapturaComponentes()

    setInterval(function () {
        getCapturaComponentes();
    }, 60000);
 
 });

async function getCapturaComponentes(){

    const idEmpresa = sessionStorage.ID_EMPRESA;

   try {
       const response = await fetch(`/captura/${idEmpresa}/listarCapturasComponentes`, {
           method: 'GET',
           headers: {
               "Content-Type": "application/json"
           }
       });

       const data = await response.json();

       if(data.length>0){
        plotarGraficoComponentes(data)
       }

   } catch (error) {
       console.error('Erro ao buscar informações do totem:', error);
       return false;
   }
   
}

function plotarGraficoComponentes(data) {
    var uptimeCanvas = document.getElementById('uptime-canvas').getContext('2d');

    if (window.uptimeChart) {

        window.uptimeChart.destroy();
    }

    var cpuData = [];
    var ramData = [];

    var uniqueHours = new Set();

    data.forEach(item => {
        uniqueHours.add(item.hora);
        if (item.tipoComponente === 'PROCESSADOR') {
            cpuData.push(item.mediaCaptura);
        } else if (item.tipoComponente === 'MEMORIA') {
            ramData.push(item.mediaCaptura);
        }
    });

    var hoursOfDay = [...uniqueHours].sort();

    var uptimeData = {
        labels: hoursOfDay.map(hour => hour + 'h'),
        datasets: [
            {
                label: 'CPU',
                data: cpuData,
                borderColor: '#119DA4',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
            },
            {
                label: 'RAM',
                data: ramData,
                borderColor: 'blue',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
            }
        ]
    };

    window.uptimeChart = new Chart(uptimeCanvas, {
        type: 'line',
        data: uptimeData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'white',
                        font: {
                            family: 'Montserrat',
                        },
                    }
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
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 10,
                        color: 'white',
                        font: {
                            family: 'Montserrat',
                        },
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                x: {
                    ticks: {
                        color: 'white',
                        font: {
                            family: 'Montserrat',
                        },
                    },
                    grid: {
                        display: false
                    }
                },
            },
        },
    });
};

