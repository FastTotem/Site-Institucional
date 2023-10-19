const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const confirmPassword = document.getElementById('confirmPassword');
let user;

document.getElementsByTagName('form')[0].addEventListener('submit', (event) => event.preventDefault());

window.addEventListener('load', async () => {
    const data = await fetch(`/usuarios/${sessionStorage.ID_USUARIO}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });

    const response = await data.json();

    if(data.ok) {
        user = response[0];

        usernameInput.value = user.Nome;
        passwordInput.value = user.Senha;
    } else {
        alert('Erro ao carregar dados do usuário');
        window.location.reload();
    }
});

function updateUserData() {
    if(user.Nome != usernameInput.value) {
        updateNome();
    } 

    if(user.Senha != passwordInput.value) {
        if(passwordInput.value.length < 8) {
            alert('Sua senha deve ter pelo menos 8 caracteres');
        } else {
            if(confirmPassword.value == passwordInput.value) {
                updateSenha();
            } else {
                alert('As senhas não coincidem');
            }
        }
    } else {
        alert('Senha igual a atual');
    }
}

async function updateNome() {
    const data = await fetch(`/usuarios/${sessionStorage.ID_USUARIO}/updateNome`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: usernameInput.value
        })
    });

    if(data.ok) {
        alert('Nome atualizado com sucesso!');
        window.location.reload();
    } else {
        alert('Erro ao atualizar o nome!');
    }
}

async function updateSenha() {
    const data = await fetch(`/usuarios/${sessionStorage.ID_USUARIO}/updateSenha`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            senhaServer: passwordInput.value
        })
    });

    if(data.ok) {
        alert('Senha atualizada com sucesso!');
        window.location.reload();
    } else {
        alert('Erro ao atualizar a senha!');
    }
}
