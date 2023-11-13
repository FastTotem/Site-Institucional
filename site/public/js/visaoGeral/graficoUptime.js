   
   async function getUptime(){

    const idEmpresa = sessionStorage.ID_EMPRESA;

   try {
       const response = await fetch(`/captura/${idEmpresa}/listarUptime`, {
           method: 'GET',
           headers: {
               "Content-Type": "application/json"
           }
       });

       const data = await response.json();

           plotarGraficoUptime(data)

   } catch (error) {
       console.error('Erro ao buscar informações do totem:', error);
       return false;
   }
   
}
   
function plotarGraficoUptime(data) {

    var efficiencyCanvas = document.getElementById('efficiency-canvas').getContext('2d');

    var borderColorOk = 'rgb(44, 161, 100)';
    var borderColorAlerta = 'rgba(255, 215, 0, 1)';
    var borderColorCritico = 'rgba(255, 99, 71, 1)';

    var labels = data.map(item => item.nomeTotem);
    var valores = data.map(item => formatUsageTime(item.valor).hours);

    var efficiencyData = {
        labels: labels,
        datasets: [
            {
                data: valores,
                backgroundColor: 'rgb(44, 161, 100)',
                borderColor: borderColorOk,
                borderWidth: 2,
                label: 'Uptime',
            }
        ]
    };

    var efficiencyChart = new Chart(efficiencyCanvas, {
        type: 'bar',
        data: efficiencyData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: false,
                    beginAtZero: true,
                    ticks: {
                        color: 'white',
                        font: {
                            family: 'Montserrat',
                        },
                    },
                    title: {
                        display: false,
                        text: 'Totens'
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5,
                        color: 'white',
                        font: {
                            family: 'Montserrat',
                        },
                    },
                    title: {
                        display: false,
                        text: 'Tempo de Atividade (h)'
                    }
                }
            },
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
                            label += context.formattedValue + 'h';
                            return label;
                        }
                    }
                }
            }
        }
    });
}

function formatUsageTime(time) {
    let restTime = time;

    const days = Math.floor(restTime/86400);
    restTime %= 86400;
    
    const hours = Math.floor(restTime/3600);
    restTime %= 3600;
    
    const minutes = Math.floor(restTime/60);
    restTime %= 60;
    
    return { days, hours, minutes };
}