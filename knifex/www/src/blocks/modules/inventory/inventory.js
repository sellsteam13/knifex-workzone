document.addEventListener('DOMContentLoaded', () => {

    // Открытие/закрытие попапа всего инвенторя.
    if (document.querySelector('.all-inventory__trigger')) {
        const triggers = document.querySelectorAll('.all-inventory__trigger');
        const allInners = document.querySelectorAll('.all-inventory');
        const findAscendingTag = (el) => {
            while (el.parentNode) {
                el = el.parentNode;
                if (el.querySelector('.all-inventory')) {
                    return el.querySelector('.all-inventory');
                }
            }
        }
        triggers.forEach(btn => {
            const inner = findAscendingTag(btn);
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (!inner.classList.contains('is-opened')) {
                    allInners.forEach(each => {
                        each.classList.remove('is-opened');
                    });
                    inner.classList.add('is-opened');
                } else {
                    inner.classList.remove('is-opened');
                }
            });
        });
    }

});