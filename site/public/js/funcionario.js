function openForm() {
    const form = document.getElementById("totem-register");
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}

async function validarCampos() {
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const nivelAcessoSelect = document.getElementById('nivelAcesso');
    const message = document.getElementById('message');

    const nome = nomeInput?.value;
    const email = emailInput?.value;
    const nivelDeAcesso = nivelAcessoSelect?.value;

    if (!nome || !email) {
        message.textContent = 'Preencha todos os campos.';
    } else {
        try {
            const emailEValido = await validarEmail(email);

            if (emailEValido) {
                cadastrarFuncionario(nome, email, nivelDeAcesso);
            } else {
                message.textContent = 'Email já está em uso';
            }
        } catch (error) {
            console.error('Erro ao validar email:', error);
        }
    }
}

function cadastrarFuncionario(nome, email, nivelAcesso) {
    var senha = gerarSenha(8);

    fetch("/usuario/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha,
            nivelAcessoServer: nivelAcesso,
            fkEmpresaServer: sessionStorage.ID_EMPRESA
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                enviarEmail(email, senha, nome);
                message.textContent = 'Funcionário cadastrado com sucesso';
                setTimeout(function () {
                    message.textContent = '';
                    window.location.reload();
                }, 1500);
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


function criarCardsFuncionarios(funcionariosData, status) {
    const funcionariosList = document.getElementById('func-list');

    while (funcionariosList.firstChild) {
        funcionariosList.removeChild(funcionariosList.firstChild);
    }

    funcionariosData.forEach((funcionario, index) => {

        var status = funcionario.statusUsuario;
        var color;
        if(status == 'Ativo'){
            color = 'rgb(44, 161, 100)'
        }else if(status == 'Inativo'){
            color = '#909090'
        }

        const card = document.createElement('div');
        status = funcionario.statusUsuario
            card.style.backgroundColor = color;
        card.classList.add('employee-card');
        card.id = `card-func${index}`;

        const employeeInfo = document.createElement('div');
        employeeInfo.classList.add('employee-info');

        const employeeName = document.createElement('div');
        employeeName.classList.add('employee-name');

        const h3 = document.createElement('h3');
        h3.textContent = funcionario.nome || 'Nome Desconhecido';
        const emailP = document.createElement('p');
        emailP.textContent = `Email: ${funcionario.email}`;
        const nivelAcessoP = document.createElement('p');
        nivelAcessoP.textContent = `Nível de Acesso: ${funcionario.nivelAcesso}`;
        const statusP = document.createElement('p');
        statusP.id = `stts${index}`;
        statusP.textContent = `Status: ${funcionario.statusUsuario}`;

        employeeName.appendChild(h3);
        employeeName.appendChild(emailP);
        employeeName.appendChild(nivelAcessoP);
        employeeName.appendChild(statusP);

        const actions = document.createElement('div');
        actions.classList.add('actions');

        if (funcionario.nome != sessionStorage.NOME_USUARIO) {
            const inativarButton = document.createElement('button');
            inativarButton.id = `btn-inactive-func${index}`;
            if(funcionario.statusUsuario == "Ativo"){
                inativarButton.textContent = 'Inativar';
            }else{
                inativarButton.textContent = 'Ativar';
            }
            inativarButton.onclick = () => mudarStatusFuncionario(funcionario.email, funcionario.statusUsuario);

            const excluirButton = document.createElement('button');
            excluirButton.textContent = 'Excluir';
            excluirButton.onclick = () => excluirFuncionario(funcionario.email);

            actions.appendChild(inativarButton);
            actions.appendChild(excluirButton);
        }

        employeeInfo.appendChild(employeeName);
        employeeInfo.appendChild(actions);

        card.appendChild(employeeInfo);
        funcionariosList.appendChild(card);
    });
}


async function validarEmail(email) {
    try {
        const response = await fetch(`/usuario/${email}/verificar`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (data.length > 0) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.error('Erro ao verificar o email:', error);
        throw error;
    }
}

function excluirFuncionario(email) {
    fetch("/usuario/excluir", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emailServer: email,
            fkEmpresaServer: sessionStorage.ID_EMPRESA
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
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

function mudarStatusFuncionario(email, status) {

  var route;

  if(status == 'Ativo'){
    route = 'inativar'
  }else{
    route = 'ativar'
  }

    fetch(`/usuario/${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emailServer: email,
            fkEmpresaServer: sessionStorage.ID_EMPRESA
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
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

function listarFuncionarios() {

    const filterMax = document.getElementById('filterMax');
    const filterAtual = document.getElementById('filterAtual');

    var idEmpresa = sessionStorage.ID_EMPRESA

    fetch(`/usuario/${idEmpresa}/listar`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            filterMax.textContent = data.length;
            filterAtual.textContent = data.length;
            criarCardsFuncionarios(data);
        })
        .catch(error => {
            console.error('Erro ao buscar informações dos funcionários:', error);
        });
}

function listarFuncionariosPorStatus(status) {

    const filterAtual = document.getElementById('filterAtual');

    var idEmpresa = sessionStorage.ID_EMPRESA

    fetch(`/usuario/${idEmpresa}/${status}/listar`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            filterAtual.textContent = data.length;
            criarCardsFuncionarios(data, status);
        })
        .catch(error => {
            console.error('Erro ao buscar informações do totem:', error);
        });
}

function gerarSenha(tamanho) {
    const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#';

    let senha = '';

    for (let i = 0; i < tamanho; i++) {
        const caractereAleatorio = caracteres[Math.floor(Math.random() * caracteres.length)];
        senha += caractereAleatorio;
    }

    return senha;
}

async function enviarEmail(email, senha, nomeEmpresa) {
    const body = {
        service_id: 'service_yhdz78p',
        template_id: 'template_fvi8zvp',
        user_id: '6A4-sKj9aaXrVf-sX',
        template_params: {
            user_email: email,
            user_senha: senha,
            nome_empresa: nomeEmpresa,
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