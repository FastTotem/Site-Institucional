function selectColor(buttonId) {
    const statusButton = document.getElementById(buttonId);

            const bgndColor = window.getComputedStyle(statusButton).backgroundColor;
            const borderColor = window.getComputedStyle(statusButton).borderColor;
            switchColor(bgndColor, borderColor, buttonId);
}

function switchColor(bgndColor, borderColor, buttonId) {
    const criticalSrc = "./assets/aviso.png";
    const alertSrc = "./assets/sinal-de-alerta.png";
    const okSrc = "./assets/verificar.png";
    const offSrc = "./assets/desligar.png";

    const cards = document.querySelectorAll('.list-card');

    cards.forEach((card, index) => {
        const cardBackgroundColor = window.getComputedStyle(card).backgroundColor;
        const imgElement = card.querySelector('.img-status img');
        card.style.backgroundColor = bgndColor;

        switch (buttonId) {
            case 'all':
                const allSrcs = [criticalSrc, alertSrc, okSrc, offSrc]; // Adicione outros srcs se necessário
                const randomSrc = allSrcs[Math.floor(Math.random() * allSrcs.length)];
                imgElement.src = randomSrc;
                break;
            case 'danger':
                imgElement.src = criticalSrc;
                break;
            case 'alert':
                imgElement.src = alertSrc;
                break;
            case 'ok':
                imgElement.src = okSrc;
                break;
            case 'off':
                imgElement.src = offSrc;
                break;
            default:
                break;
        }
    });
}