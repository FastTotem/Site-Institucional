function abrirPerfil() {
    var perfil = document.getElementById("perfilUser")

    if (perfil.style.display == 'none') {
        perfil.style.display = `flex`
    } else {
        perfil.style.display = 'none'
    }
}