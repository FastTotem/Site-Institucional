const criticalSrc = "./assets/aviso.png";
const alertSrc = "./assets/sinal-de-alerta.png";
const okSrc = "./assets/verificar.png";
const offSrc = "./assets/desligar.png";

function listarTotens() {
    fetch(`/totem/${sessionStorage.ID_EMPRESA}/listar`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        criarCardsTotem(data);
    })
    .catch(error => {
        console.error('Erro ao buscar informações do totem:', error);
    });
}

function listarTotensPorStatus(status) {
    fetch(`/totem/${sessionStorage.ID_EMPRESA}/${status}/listar`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
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

        switch (totem.totemstatus) {
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
        link.href = 'visaoEspecifica.html';
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

function cadastrarTotem(nome, jar, chave) {

var chaveDeAcesso;

if(chave!=""){
 chaveDeAcesso = chave;
}else{
    chaveDeAcesso = gerarChaveDeAcesso()
}

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
        alert('Totem cadastrado com sucesso!');
        window.location.reload();
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

        alert('Totem deletado com sucesso!');
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