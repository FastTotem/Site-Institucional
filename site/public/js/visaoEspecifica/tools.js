const toolsButton = document.getElementById('toolsButton');
const toolBox = document.getElementById('toolsBox');
const toolsContainer = document.getElementById('toolsContainer');
const main = document.getElementById('main');

let toolBoxIsVisible = false;

toolsButton.addEventListener('click', () => openToolsModal());

window.addEventListener('click', (event) => {
    if(toolBoxIsVisible && !isParent(event.target)) {
        closeToolsModal();
    }
});

main.addEventListener('scroll', () => {
    console.log('teste');
    if(toolBoxIsVisible) {
        closeToolsModal();
    }
})

function isParent(element) {
    let isParent = false;
    let currentElement = element;

    while (currentElement.parentNode) {
        if(currentElement.parentNode == toolsContainer) {
            isParent = true;
            break;
        }
        
        currentElement = currentElement.parentNode;
    }

    return isParent;
}

function openToolsModal() {
    if(toolBoxIsVisible) {
        return closeToolsModal();
    }

    toolBox.classList.add('toolsBoxActive');
    toolBoxIsVisible = true;
}

function closeToolsModal() {
    toolBox.classList.remove('toolsBoxActive');
    toolBoxIsVisible = false;
}
