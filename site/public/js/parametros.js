function atualizarValoresInputs(input) {
    const rangeValue = input.value;
    const rangeValueSpan = input.nextElementSibling.querySelector(".range-value"); 
    rangeValueSpan.textContent = rangeValue;
}

function validarInputs(button) {
    const section = button.closest("section");
    const okLvl = parseInt(section.querySelector(".okLvl").value);
    const alertLvl = parseInt(section.querySelector(".alertLvl").value);
    const criticalLvl = parseInt(section.querySelector(".criticalLvl").value);
    const errorMessage = section.querySelector(".error-message");

    if (okLvl >= alertLvl && alertLvl >= criticalLvl) {
        errorMessage.style.display = "none";
        alert("Parâmetros atualizados com sucesso")
    } else {
        errorMessage.style.display = "block";
    }
}

function validarUsb(button) {
    const section = button.closest("section");
    const criticalLvl = parseInt(section.querySelector(".criticalLvl").value);
    const notifyLvl = parseInt(section.querySelector(".notificationLvl").value);
    const errorMessage = section.querySelector(".error-message");

    if (notifyLvl >= criticalLvl) {
        errorMessage.style.display = "none";
        alert("Parâmetros atualizados com sucesso")
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
