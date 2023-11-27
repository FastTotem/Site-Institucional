const usernameInput = document.getElementById('usernameInput');
const inputLvlAcessInput = document.getElementById('inputLvlAcess');
const passwordInput = document.getElementById('passwordInput');
const confirmPassword = document.getElementById('confirmPassword');

let user;

document.getElementsByTagName('form')[0].addEventListener('submit', (event) => event.preventDefault());

window.addEventListener('load', async () => {
    const data = await fetch(`/usuario/${sessionStorage.ID_USUARIO}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });

    const response = await data.json();
    const profileImage = document.querySelector(".formContainer label");
    const profileImageText = document.querySelector(".profileImage h1");

    if(data.ok) {
        user = response[0];

        usernameInput.value = user.nome;
        inputLvlAcessInput.value = user.nivelAcesso;
        passwordInput.value = user.senha;
        
        if(user.imgUsuario) {
            profileImageText.style.display = "none";
            profileImage.style.backgroundImage = `url("../../uploads/${user.imgUsuario}")`;
        }

        generateUserImage(user.nome);
    } else {
        alert('Erro ao carregar dados do usuário');
        window.location.reload();
    }
});

function updateUserData() {
    if(user.nome != usernameInput.value) {
        updateNome();
    } 

    if(user.senha != passwordInput.value) {
        if(passwordInput.value.length < 8) {
            alert('Sua senha deve ter pelo menos 8 caracteres');
        } else {
            if(confirmPassword.value == passwordInput.value) {
                updateSenha();
            } else {
                alert('As senhas não coincidem');
            }
        }
    }

    if(profileImageInput.files.length > 0) {
        updateProfileImage();
    }
}

function generateUserImage(name) {
    const profileImageText = document.querySelector(".profileImage h1");

    const firstLetter = name.split(' ')[0][0].toUpperCase();
    const secondLetter = name.split(' ')[1] ? name.split(' ')[1][0].toUpperCase() : '';

    profileImageText.innerHTML = firstLetter + secondLetter;
}

async function updateProfileImage() {
    const formData = new FormData();

    formData.append('profileImage', profileImageInput.files[0]);

    const data = await fetch(`/usuario/${sessionStorage.ID_USUARIO}/changeProfileImage`, {
        method: 'PATCH',
        body: formData
    });

    if(data.ok) {
        alert('Imagem de perfil atualizada com sucesso!');
        window.location.reload();
    } else {
        alert('Erro ao atualizar imagem de perfil!');
    }
}

async function updateNome() {
    const data = await fetch(`/usuario/${sessionStorage.ID_USUARIO}/updateNome`, {
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
    const data = await fetch(`/usuario/${sessionStorage.ID_USUARIO}/updateSenha`, {
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
