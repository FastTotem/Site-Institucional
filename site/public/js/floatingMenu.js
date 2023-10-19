const nome_saudacao = document.getElementById('nome_saudacao');

window.addEventListener('load', () => {
    nome_saudacao.innerText = sessionStorage.NOME_USUARIO;
});

function abrirPerfil() {
    var perfil = document.getElementById("perfilUser");

    perfil.classList.toggle('perfilUser--active');
}