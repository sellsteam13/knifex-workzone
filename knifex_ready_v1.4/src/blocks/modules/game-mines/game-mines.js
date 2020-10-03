document.addEventListener('DOMContentLoaded', () => {

    // Добавления класса для анимации к элементу игры Mines.
    if (document.querySelector('.game-mines') && document.querySelector('.game-mines-area__block')) {
        const allBlocks = document.querySelectorAll('.game-mines-area__block');
        allBlocks.forEach(block => {
            block.addEventListener('click', () => {
                block.classList.add('is-opened');
            });
        });
    }

});