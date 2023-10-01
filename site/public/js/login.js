const [ form ] = document.forms;
const { email, password } = form;

const allInputs = document.querySelectorAll('input');

allInputs.forEach((item) => item.addEventListener('input', () => {
    if(item.value === '') {
        let alertPreenchimento = document.createElement('span');
        alertPreenchimento.textContent = "*Campo obrigatório";

        item.insertAdjacentElement('afterend', alertPreenchimento);
    } else {
        let alertPreenchimento = item.nextElementSibling;

        if (alertPreenchimento && alertPreenchimento.textContent === "*Campo obrigatório") {
            alertPreenchimento.remove();
        }
    }
}));

form.addEventListener('submit', (event) => {
    event.preventDefault();
    login();
})

function login() {
    allInputs.forEach((item) => {
        if(item.value === '') {
            let alertPreenchimento = item.nextElementSibling;

            if (alertPreenchimento && alertPreenchimento.textContent === "*Campo obrigatório")
                return

            alertPreenchimento = document.createElement('span');
            alertPreenchimento.textContent = "*Campo obrigatório";
    
            item.insertAdjacentElement('afterend', alertPreenchimento);

            inputsSaoValidos = false;
        }
    });

    let inputsSaoValidos = true;

    if(inputsSaoValidos) {
        if(email.value === 'fasttotemcontact@gmail.com' && password.value === 'fg@Ea254') {
            alert('Usuário autenticado com sucesso!');
        } else {
            alert('Usuário e/ou senha incorretos!');
        }
    }
}