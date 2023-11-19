    const criticalSrc = "./assets/aviso.png";
const alertSrc = "./assets/sinal-de-alerta.png";
const okSrc = "./assets/verificar.png";
const offSrc = "./assets/desligar.png";

function listarTotens() {

    const filterMax = document.getElementById('filterMax');
    const filterAtual = document.getElementById('filterAtual');

    fetch(`/totem/${sessionStorage.ID_EMPRESA}/listar`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        filterMax.textContent = data.length;
        filterAtual.textContent = data.length;
        criarCardsTotem(data);
    })
    .catch(error => {
        console.error('Erro ao buscar informações do totem:', error);
    });

}

function listarTotensPorStatus(status) {

    const filterAtual = document.getElementById('filterAtual');

    fetch(`/totem/${sessionStorage.ID_EMPRESA}/${status}/listar`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        filterAtual.textContent = data.length;
        criarCardsTotem(data);
    })
    .catch(error => {
        console.error('Erro ao buscar informações do totem:', error);
    });
}

function criarCardsTotem(totemData) {
    const totemList = document.getElementById('list');

    while (totemList.firstChild) {
        totemList.removeChild(totemList.firstChild);
    }

    totemData.forEach(totem => {
        const card = document.createElement('div');
        card.classList.add('list-card');

        const imgStatus = document.createElement('div');
        imgStatus.classList.add('img-status');
        const img = document.createElement('img');

        switch (totem.statusTotem) {
            case 'alerta':
                card.classList.add('status-alerta');
                img.src = alertSrc;
                break;
            case 'critico':
                card.classList.add('status-critico');
                img.src = criticalSrc;
                break;
            case 'inativo':
                card.classList.add('status-inativo');
                img.src = offSrc;
                break;
            case 'ok':
                card.classList.add('status-ok');
                img.src = okSrc;
                break;
        }

        imgStatus.appendChild(img);

        const totemInfo = document.createElement('div');
        totemInfo.classList.add('totem-info');

        const totemName = document.createElement('div');
        totemName.classList.add('totem-name');
        const h3 = document.createElement('h3');
        h3.textContent = totem.nome || 'Nome Desconhecido';
        totemName.appendChild(h3);

        const message = document.createElement('div');
        message.classList.add('message');
        const link = document.createElement('a');
        link.href = `visaoEspecifica.html?idTotem=${totem.idTotem}`;
        link.textContent = 'Clique aqui para ver mais';
        message.appendChild(link);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');

        const imgDelete = document.createElement('img');
        imgDelete.src = './assets/trash.png';
        imgDelete.alt = 'Excluir';
        deleteButton.appendChild(imgDelete);
        deleteButton.onclick = () => excluirTotem(totem.nome || 'Nome Desconhecido');

        totemInfo.appendChild(totemName);
        totemInfo.appendChild(message);
        totemInfo.appendChild(deleteButton);

        card.appendChild(imgStatus);
        card.appendChild(totemInfo);

        totemList.appendChild(card);
    });
}

async function cadastrarTotem(nome, jar, chave) {
    const message = document.getElementById('message');
    var chaveDeAcesso;

    if (chave !== "") {
        chaveDeAcesso = chave;
    } else {
        chaveDeAcesso = gerarChaveDeAcesso();
    }

    if (nome !== "") {
        var nomeExiste = await nomeExists(nome); 

        if (nomeExiste == false) {
            const data = fetch(`/totem/cadastrar`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nomeServer: nome,
                    jarServer: jar,
                    chaveServer: chaveDeAcesso,
                    fkEmpresaServer: sessionStorage.ID_EMPRESA
                })
            });

            message.textContent = 'Totem cadastrado com sucesso';
            setTimeout(function () {
                message.textContent = '';
                window.location.reload();
            }, 1500);
        } else {
            message.textContent = 'Nome já cadastrado';
        }
    } else {
        message.textContent = 'Preencha todos os campos';
    }
}


async function nomeExists(nome) {
    const idEmpresa = sessionStorage.ID_EMPRESA;

    try {
        const response = await fetch(`/totem/${idEmpresa}/${nome}/listarPorNome`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        return data.length > 0;
    } catch (error) {
        console.error('Erro ao buscar informações do totem:', error);
        return false;
    }
}

function excluirTotem(nome) {
    const data = fetch(`/totem/excluir`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nome,
            fkEmpresaServer: sessionStorage.ID_EMPRESA
        })
    });

        window.location.reload();
}

function gerarChaveDeAcesso() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const tamanhoChave = 10;
    let chave = '';

    for (let i = 0; i < tamanhoChave; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        chave += caracteres.charAt(indiceAleatorio);
    }

    return chave;
}