const allToolTipButtons = document.querySelectorAll('.tooltipButton');

allToolTipButtons.forEach(element => {
    element.addEventListener('click', (button) => toggleToolTip(button.target));
});

function toggleToolTip(element) {
    const chartContainer = element.closest('.chartContainer');
    const tooltipInfoContainer = chartContainer.querySelector('.tooltipInfoContainer');
    const canvas = chartContainer.querySelector('canvas');

    console.log(tooltipInfoContainer);
    
    tooltipInfoContainer.classList.toggle('tooltipInfoContainer--active');
    canvas.classList.toggle('chart--inactive');
}