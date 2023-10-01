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

//Adiciona um event listener para todos inputs assim que a tela é carregada
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

    //Faz o mesmo que a funçaõ acima mas no momento em que o botão de cadastrar-se é pressionado 
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
        cadastrar();
    }
}

function cadastrar() {
    var nomeVar = document.querySelector('input[name="nomeEmpresa"]').value;
    var cnpjVar = document.querySelector('input[name="cnpjEmpresa"]').value;
    var emailVar = document.querySelector('input[name="email"]').value;
    var cepVar = document.querySelector('input[name="cep"]').value;
    var ruaVar = document.querySelector('input[name="rua"]').value;
    var bairroVar = document.querySelector('input[name="bairro"]').value;
    var numeroVar = document.querySelector('input[name="numero"]').value;
    var complementoVar = document.querySelector('input[name="complemento"]').value;

    fetch("/empresa/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            cnpjServer: cnpjVar,
            emailServer: emailVar,
            cepServer: cepVar,
            ruaServer: ruaVar,
            bairroServer: bairroVar,
            numeroServer: numeroVar,
            complementoServer: complementoVar
        }),
    })
    .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...");
            // enviarEmail();

            setTimeout(() => {
                window.location = "login.html";
            }, "2000");
        } 
        else {
            throw "Houve um erro ao tentar realizar o cadastro!";
        }
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
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
}