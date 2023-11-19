const idEmpresa = sessionStorage.getItem('ID_EMPRESA');

const cardCPU = document.getElementById('card-cpu');
const cardRAM = document.getElementById('card-ram');
const cardHD = document.getElementById('card-hd');
const cardUSB = document.getElementById('card-usb');

var params = [];

window.addEventListener('load', () => {
    displayParams();
});

async function loadAllParams() {
    const response = await fetch(`/parametros/${idEmpresa}`);
    const data = await response.json();

    return data;
}

async function displayParams() {
    const data = await loadAllParams();
    params = data;
    
    data.forEach(element => {
        switch (element.tipo) {
            case "MEMORIA": 
                displayParamsInComponent(cardRAM, element);
                break;
            case "PROCESSADOR":
                displayParamsInComponent(cardCPU, element);
                break;
            case "DISCO":
                displayParamsInComponent(cardHD, element);
                break;
            case "USB": 
                displayParamsInComponent(cardUSB, element);
        }
    });
}

function displayParamsInComponent(component, data) {
    data.ideal && (component.querySelector(".okLvl").value = data.ideal);
    data.ideal && (component.querySelector("#range-value-ok").innerText = data.ideal);

    data.alerta && (component.querySelector(".alertLvl").value = data.alerta);
    data.alerta && (component.querySelector("#range-value-alert").innerText = data.alerta);

    data.critico && (component.querySelector(".criticalLvl").value = data.critico);
    data.critico && (component.querySelector("#range-value-critical").innerText = data.critico);

    data.notificacao && (component.querySelector(".notificationLvl").value = data.notificacao);
    data.notificacao && (component.querySelector("#range-value-notification").innerText = data.notificacao);
}