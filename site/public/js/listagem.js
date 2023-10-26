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
        const criticalSrc = "./assets/aviso.png"
        const alertSrc = "./assets/sinal-de-alerta.png"
        const okSrc = "./assets/verificar.png"
        const offSrc = "./assets/desligar.png"
    
        const cards = document.querySelectorAll('.list-card');
        
        cards.forEach((card,i) => {
            var i;
            const cardBackgroundColor = window.getComputedStyle(card).backgroundColor;
            const imgElement = card.querySelector('.img-status img');
            card.style.backgroundColor = bgndColor;
        
            if (cardBackgroundColor == "rgba(0, 255, 0, 0.7)") {
                imgElement.src = okSrc;
            } else if (cardBackgroundColor == "rgba(255, 215, 0, 0.7)") {
                imgElement.src = alertSrc;
            } else if(cardBackgroundColor == "rgba(255, 99, 71, 0.7)"){
                imgElement.src = criticalSrc;
            }else if(cardBackgroundColor == "rgb(101, 101, 101)"){
                imgElement.src = offSrc;
            }else{
                switch (i) {
                    case 0:
                        imgElement.src = okSrc;
                        break;
                    case 1:
                        imgElement.src = alertSrc;
                        break;
                    case 2:
                        imgElement.src = criticalSrc;
                        break;
                    case 3:
                        imgElement.src = okSrc;
                        break;
                }
            }
        });
    }
