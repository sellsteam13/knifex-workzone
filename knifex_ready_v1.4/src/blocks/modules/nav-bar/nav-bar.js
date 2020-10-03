document.addEventListener('DOMContentLoaded', () => {
    const navBar = document.querySelector('.nav-bar');
    if (navBar) {
        navBar.addEventListener('click', () => {
            if (window.innerWidth < 901) {
                navBar.classList.toggle('is-opened');
            }
        });
    }
});