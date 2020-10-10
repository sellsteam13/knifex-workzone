document.addEventListener('DOMContentLoaded', () => {

    // Добавления модификатора к хэдеру при скролле.
    if (document.querySelector('.header')) {
        const body = document.body;
        const header = document.querySelector('.header');
        window.addEventListener('scroll', () => {
            if (body.getBoundingClientRect().top < -50) {
                header.classList.add('is-modified');
            } else {
                header.classList.remove('is-modified');
            }
        });
    }

    // Мобильное меню
    const dropdownToggler = document.querySelector('.header-dropdown');
    const body = document.body;
    if (dropdownToggler && body) {
        dropdownToggler.addEventListener('click', (e) => {
            if (window.innerWidth < 1171) {
                if (!body.classList.contains('mobile-menu-opened')) {
                    body.style.overflow = 'hidden';
                    body.classList.add('mobile-menu-opened');
                } else {
                    body.style.overflow = '';
                    body.classList.remove('mobile-menu-opened');
                }
            }
        });
    }

});