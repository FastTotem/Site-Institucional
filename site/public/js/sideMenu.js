function abrirMenu() {
    const sideMenu = document.getElementById("side-menu");

    if (sideMenu.style.display === "flex") {
        sideMenu.style.display = "none";
    } else {
        sideMenu.style.display = "flex";
    }
}
