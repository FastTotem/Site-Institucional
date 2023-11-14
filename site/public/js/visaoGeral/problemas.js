document.addEventListener('DOMContentLoaded', function () {

    getOcorrencias();

    setInterval(function () {
        getOcorrencias();
    }, 60000);
    
});

function getOcorrencias() {
    fetch(`/captura/${sessionStorage.ID_EMPRESA}/listar`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        atualizarOcorrencias(data);
    })
    .catch(error => {
        console.error('Erro ao buscar informações do totem:', error);
    });
}

function atualizarOcorrencias(data) {
    const occHD = document.getElementById('OccHD');
    const occRAM = document.getElementById('OccRAM');
    const occCPU = document.getElementById('OccCPU');
    const occUSB = document.getElementById('OccUSB');
    const occMost = document.getElementById('OccMost');
    const occTotal = document.getElementById('OccTotal');

    let countHD = 0;
    let countRAM = 0;
    let countCPU = 0;
    let countUSB = 0;
    let mostOccComponent = 'Nenhum';
    let mostOccCount = 0;

    data.forEach(item => {
        switch (item.tipoComponente) {
            case 'MEMORIA':
                countRAM = item.ocorrenciasCriticas;
                break;
            case 'PROCESSADOR':
                countCPU = item.ocorrenciasCriticas;
                break;
            case 'TAXA_TRANSFERENCIA':
                countHD = item.ocorrenciasCriticas;
                break;
        }

        if (item.ocorrenciasCriticas > mostOccCount) {
            mostOccCount = item.ocorrenciasCriticas;
            mostOccComponent = item.tipoComponente;
        }
    });

    occHD.innerText = countHD;
    occRAM.innerText = countRAM;
    occCPU.innerText = countCPU;
    occUSB.innerText = countUSB;
    occMost.innerText = mostOccComponent;
    occTotal.innerText = countHD + countRAM + countCPU + countUSB;
}
