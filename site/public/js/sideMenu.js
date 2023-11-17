const visaoEspecifica = document.getElementById('visaoEspecificaTab');

window.addEventListener('load', async () => {
    const totemID = await getFirstTotemID();
    
    visaoEspecifica.href = `visaoEspecifica.html?idTotem=${totemID}`;
});

async function getFirstTotemID() {
    const response = await fetch(`/totem/${sessionStorage.ID_EMPRESA}/buscarPrimeiroTotem`);
    const data = await response.json();

    return data[0].fisrtTotemID;
}

function abrirMenu() {
    const sideMenu = document.getElementById("side-menu");

    if (sideMenu.style.display === "flex") {
        sideMenu.style.display = "none";
    } else {
        sideMenu.style.display = "flex";
    }
}
