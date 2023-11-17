function atualizarValoresInputs(input) {
    const rangeValue = input.value;
    const rangeValueSpan = input.nextElementSibling.querySelector(".range-value"); 
    rangeValueSpan.textContent = rangeValue;
}

async function validarInputs(button) {
    const section = button.closest("section");
    const sectionName = section.querySelector('h2').innerText;
    const okLvl = parseInt(section.querySelector(".okLvl").value);
    const alertLvl = parseInt(section.querySelector(".alertLvl").value);
    const criticalLvl = parseInt(section.querySelector(".criticalLvl").value);
    const notificationLvl = parseInt(section.querySelector(".notificationLvl").value);
    const errorMessage = section.querySelector(".error-message");

    if (alertLvl >= okLvl && criticalLvl >= alertLvl) {
        errorMessage.style.display = "none";
        
        const paramID = params.find(item => item.tipo === paramName[sectionName]).idParametroAlerta;

        const response = await fetch(`/parametros/${paramID}/changeParams`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idParam: paramID,
                ideal: okLvl,
                alerta: alertLvl,
                critico: criticalLvl,
                notificacao: notificationLvl
            })
        });

        if(response.ok) {
            alert("Parâmetros atualizados com sucesso");
        } else {
            alert("Não foi possível atualizar os parâmetros, tente novamente mais tarde");
        }
    } else {
        errorMessage.style.display = "block";
    }
}

async function validarUsb(button) {
    const section = button.closest("section");
    const sectionName = section.querySelector('h2').innerText;
    const criticalLvl = parseInt(section.querySelector(".criticalLvl").value);
    const notifyLvl = parseInt(section.querySelector(".notificationLvl").value);
    const errorMessage = section.querySelector(".error-message");

    if (notifyLvl >= criticalLvl) {
        errorMessage.style.display = "none";
        const paramID = params.find(item => item.tipo === paramName[sectionName]).idParametroAlerta;

        const response = await fetch(`/parametros/${paramID}/changeParams`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idParam: paramID,
                ideal: null,
                alerta: null,
                critico: criticalLvl,
                notificacao: notifyLvl
            })
        });

        if(response.ok) {
            alert("Parâmetros atualizados com sucesso");
        } else {
            alert("Não foi possível atualizar os parâmetros, tente novamente mais tarde");
        }
    } else {
        errorMessage.style.display = "block";
    }
}

const rangeInputs = document.querySelectorAll("input[type=range]");

rangeInputs.forEach((input) => {
    input.addEventListener("input", function () {
        updateRangeValue(input);
    });
});

const paramName = {
    "CPU": "PROCESSADOR",
    "RAM": "MEMORIA",
    "HD": "DISCO",
    "USB": "USB"
}