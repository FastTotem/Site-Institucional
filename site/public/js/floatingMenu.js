window.addEventListener('load', () => {
    const nomeSaudacaoElement = document.getElementById('nome_saudacao');
    const nomeUsuario = sessionStorage.getItem('NOME_USUARIO');

    if (nomeUsuario) {
        nomeSaudacaoElement.innerText = nomeUsuario;
    }
});

function abrirPerfil() {
    var perfil = document.getElementById("perfilUser");

    perfil.classList.toggle('perfilUser--active');
}