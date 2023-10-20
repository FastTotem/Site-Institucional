const nome_saudacao = document.getElementById('nome_saudacao');

window.addEventListener('load', () => {
    if (sessionStorage.NOME_USUARIO) {
        nome_saudacao.innerText = sessionStorage.NOME_USUARIO;
    }
});

function abrirPerfil() {
    var perfil = document.getElementById("perfilUser");

    perfil.classList.toggle('perfilUser--active');
}