const cepInput = document.getElementById('cepInput');
const ruaInput = document.getElementById('ruaInput');
const bairroInput = document.getElementById('bairroInput');
const alertCep = document.getElementById('alertCep');

const allInputs = document.querySelectorAll('input');

const [ form ] = document.forms;

form.addEventListener('submit', (event) => {
    event.preventDefault();

    cadastrarEmpresa();
});

async function getEndereco(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const data = await fetch(url);
    const response = await data.json();

    return response;
}

cepInput.addEventListener('input',async (event) => {
    let cep = event.target.value;

    if(cep.length === 8) {
        const enderecoDados = await getEndereco(cep);

        ruaInput.value = enderecoDados.logradouro;
        bairroInput.value = `${enderecoDados.bairro} - ${enderecoDados.uf}`;

        if(!enderecoDados) {
            alertCep.style.display = 'block';
        } else {
            alertCep.style.display = 'none';
        }
    } else if (cep.length > 0 && alertCep.style.display != 'block') {
        alertCep.style.display = 'block';
    }
});

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

function cadastrarEmpresa() {
    let inputsSaoValidos = true;

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

    if(inputsSaoValidos) {
        enviarEmail();
    }
}

async function enviarEmail() {
    const { email, nomeEmpresa } = form;

    const body = {
        service_id: 'service_yhdz78p',
        template_id: 'template_fvi8zvp',
        user_id: '6A4-sKj9aaXrVf-sX',
        template_params: {
            user_email: email.value,
            nome_empresa: nomeEmpresa.value,
            'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...'
        }
    };    

    const url = `https://api.emailjs.com/api/v1.0/email/send`;
    const data = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(data.ok) {
        alert('Empresa cadastrada com sucesso, para fazer login, enviamos um email com todas as informações necessárias para a autenticação!');
        window.location.href = './login.html';
    } else {
        alert('Erro ao cadastrar a empresa!');
    }
}