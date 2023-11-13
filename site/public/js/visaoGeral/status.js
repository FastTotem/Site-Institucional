   async function getStatus(){

        const idEmpresa = sessionStorage.ID_EMPRESA;
   
       try {
           const response = await fetch(`/totem/${idEmpresa}/listarStatus`, {
               method: 'GET',
               headers: {
                   "Content-Type": "application/json"
               }
           });
   
           const data = await response.json();
   
               atualizarStatus(data)
               plotarGraficoStatus(data)
   
       } catch (error) {
           console.error('Erro ao buscar informações do totem:', error);
           return false;
       }
       
   }


function atualizarStatus(data){

    var totalTotens = 0;

    var ok = document.getElementById("statusOk")
    var alerta = document.getElementById("statusAlerta")
    var critico = document.getElementById("statusCritico")
    var inativo = document.getElementById("statusInativo")

for(i = 0; i<data.length; i++){

    var statusDaVez = data[i].statusTotem;
    var qntdDaVez = data[i].quantidade;

    switch(statusDaVez){
        case "Ok":
         ok.textContent = qntdDaVez; 
         break;
         case "Alerta":
         alerta.textContent = qntdDaVez; 
         break;
         case "Critico":
         critico.textContent = qntdDaVez;
         break;
         case "Inativo":
         inativo.textContent = qntdDaVez; 
         break;
            
    }

    totalTotens += qntdDaVez;

}


const totalTotemsText = document.getElementById("total-totems-text");
totalTotemsText.textContent = `${totalTotens} Totens sendo monitorados`;

}

function plotarGraficoStatus(data) {
    var statusCanvas = document.getElementById('status-canvas').getContext('2d');

    var borderColorOk = 'rgb(44, 161, 100)';
    var borderColorAlerta = 'rgb(255, 215, 0)';
    var borderColorCritico = 'rgb(255, 99, 71)';
    var borderColorOff = 'gray';

    var total = data.reduce((acc, item) => acc + item.quantidade, 0);

    var labels = data.map(item => item.statusTotem);
    var valores = data.map(item => item.quantidade);
    var porcentagens = valores.map(valor => ((valor / total) * 100).toFixed(2));

    var backgroundColors = data.map(item => {
        switch ((item.statusTotem || '').toLowerCase()) {
            case 'ok':
                return 'rgb(44, 161, 100)';
            case 'alerta':
                return 'rgba(255, 215, 0, 0.7)';
            case 'critico':
                return 'rgba(255, 99, 71, 0.7)';
            case 'inativo':
                return 'rgb(101, 101, 101)';
            default:
                return 'gray';
        }
    });

    var borderColors = data.map(item => {
        switch ((item.statusTotem || '').toLowerCase()) {
            case 'ok':
                return borderColorOk;
            case 'alerta':
                return borderColorAlerta;
            case 'critico':
                return borderColorCritico;
            case 'inativo':
                return borderColorOff;
            default:
                return 'gray';
        }
    });

    var statusData = {
        labels: labels,
        datasets: [{
            data: porcentagens,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 2,
        }]
    };

    var statusChart = new Chart(statusCanvas, {
        type: 'doughnut',
        data: statusData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            var label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.formattedValue + '% dos totens';
                            return label;
                        }
                    }
                }
            },
            cutout: '80%'
        }
    });
}

