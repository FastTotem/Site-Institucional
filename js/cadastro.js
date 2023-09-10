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

        ruaInput.value = '';
        bairroInput.value = '';
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
        accessKey: 'ebcb1b77-d9c8-44e0-8795-7a4b67100e42',
        subject: 'Cadastro no FastTotem',
        message: `
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center">
                        <img src="https://github.com/FastTotem/Site-Institucional/blob/main/assets/FastToten%20-%20Logo.png?raw=true" alt="Sua Logo" height="100">
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding: 20px;">
                        <h1>Bem vindo ao Fast Totem, ${nomeEmpresa.value}</h1>
                        <p>Seu endereço de e-mail: ${email.value}</p>
                        <h1>Senha:</h1>
                        <p>fg@Ea254</p>
                    </td>
                </tr>
            </table>
        `,
        replyTo: email.value
    }

    const url = `https://api.staticforms.xyz/submit`;
    const data = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if(data.ok) 
        alert('Empresa cadastrada com sucesso!');
    else {
        alert('Erro ao cadastrar a empresa!');
    }
}