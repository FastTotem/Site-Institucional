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
    const status = document.getElementById(`stts${id}`);
    if (button) {
        if (button.innerText === "Inativar") {
            button.textContent = "Ativar";
            status.textContent = "Status: Inativo"
        } else if (button.innerText === "Ativar") {
            button.textContent = "Inativar";
            status.textContent = "Status: Ativo"
        }
    }
}

function excluirFuncionario(id) {
    const card = document.getElementById(`card-func${id}`);
    card.style.display = "none";

}

function validarCampos(){

    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const successMessage = document.getElementById('success-message');
    const form = document.getElementById('totem-form');

    nome = nomeInput.value
    email = emailInput.value
    
    
        if (validateEmail(emailInput.value)) {
            setTimeout(function () {
                successMessage.style.display = 'block';
            }, 1000);
            criarCard(nome,email)
            form.reset();
        } else {
            alert('Por favor, insira um endereço de e-mail válido.');
        }

        setTimeout(function () {
            successMessage.style.display = 'none';
        }, 5000);

}

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function criarCard(nome, email) {

const funcList = document.getElementById('func-list');

const contagemFuncionarios = funcList.childElementCount+1;

    const employeeCard = document.createElement('div');
    employeeCard.className = 'employee-card';
    employeeCard.id = `card-func${contagemFuncionarios}`

    employeeCard.innerHTML = `
        <div class="employee-info">
            <div class="employee-name">
                <h3>${nome}</h3>
                <p>Email: ${email}</p>
                <p>Nível de Acesso: Funcionário</p>
                <p id="stts${contagemFuncionarios}">Status: Ativo</p>
            </div>
            <div class="actions">
                <button id="btn-inactive-func${contagemFuncionarios}" onclick="inativarFuncionario(${contagemFuncionarios})">Inativar</button>
                <button onclick="excluirFuncionario(${contagemFuncionarios})">Excluir</button>
            </div>
        </div>
    `;

    const listaFuncionarios = document.querySelector('.list');
    listaFuncionarios.appendChild(employeeCard);
}