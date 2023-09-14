const menuToggle = document.querySelector('.menu-toggle');
const sideMenu = document.querySelector('.side-menu');
const header = document.querySelector('.header');

menuToggle.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
    header.classList.toggle('active');
});