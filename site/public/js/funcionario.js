function selectColor(){
    const statusButtons = document.querySelectorAll('.list-status button');

    statusButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const bgndColor = window.getComputedStyle(button).backgroundColor;
            const borderColor = window.getComputedStyle(button).borderColor;
            switchColor(bgndColor,borderColor);
        });
    });
}

function switchColor(bgndColor, borderColor){

    const cards = document.querySelectorAll('.employee-card');
    
    cards.forEach((card,i) => {
        var i;
        const cardBackgroundColor = window.getComputedStyle(card).backgroundColor;
        card.style.backgroundColor = bgndColor;
    });
}