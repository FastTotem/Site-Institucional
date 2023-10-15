function selectColor(){
    const statusButtons = document.querySelectorAll('.list-status button');

    statusButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const bgndColor = window.getComputedStyle(button).backgroundColor;
            const borderColor = window.getComputedStyle(button).borderColor;
            switchColor(bgndColor,borderColor);
        });
    });
}

function switchColor(bgndColor, borderColor){

    const cards = document.querySelectorAll('.employee-card');
    
    cards.forEach((card,i) => {
        var i;
        const cardBackgroundColor = window.getComputedStyle(card).backgroundColor;
        card.style.backgroundColor = bgndColor;
    });
}

function openForm() {
    const form = document.getElementById("totem-register");
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}

function filterList(status) {
}

function inativarFuncionario(id) {
    const button = document.getElementById(`btn-inactive-func${id}`);
    if (button) {
        if (button.innerText === "Inativar") {
            button.textContent = "Ativar";
        } else if (button.innerText === "Ativar") {
            button.textContent = "Inativar";
        }
    }
}

function excluirFuncionario(id) {
    const card = document.getElementById(`card-func${id}`);
    card.style.display = "none";
}