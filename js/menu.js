const menuToggle = document.querySelector('.menu-toggle');
const sideMenu = document.querySelector('.side-menu');

menuToggle.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
});