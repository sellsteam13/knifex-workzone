document.addEventListener('DOMContentLoaded', () => {
    const triggerElement = document.querySelector('.multicase-row-item-select-emoji__trigger');
    const parent = document.querySelector('.multicase-row-item-select-emoji');
    const emojis = document.querySelectorAll('.multicase-row-item-select-emoji__list a');
    if (triggerElement && parent && emojis.length > 0) {
        triggerElement.addEventListener('click', () => {
            parent.classList.toggle('is-opened');
        });
        emojis.forEach(each => {
            each.addEventListener('click', (e) => {
                e.preventDefault();
                parent.classList.remove('is-opened');
            });
        });
    }
});