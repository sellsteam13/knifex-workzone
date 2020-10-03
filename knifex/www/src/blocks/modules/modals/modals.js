if (document.querySelector('.overlay')) {

    // Основные/главные переменные.
    const $overlay = document.querySelector('.overlay');
    const $overlayCloseTrigger = document.querySelector('.overlay-trigger');
    const $modals = document.querySelectorAll('.modal');

    // Закрытие открытых модалок при клике вне их области.
    document.addEventListener('click', (e) => {
        if (e.target.contains($overlayCloseTrigger) && $overlay.classList.contains('is-opened')) {
            $modals.forEach(each => {
                if (each.classList.contains('is-opened')) {
                    closeModal(each);
                }
            });
        }
    });

    // Открытие модального окна. Переменная - объект модалки.
    const openModal = (currModal) => {
        if (currModal && typeof currModal == 'object' && !currModal.classList.contains('is-opened')) {

            const currOpenModal = document.querySelector('.modal.is-opened') ? document.querySelector('.modal.is-opened') : null;
            const closeTrigger = currModal.querySelector('.modal-close');

            const animatingFunction = (animatingModal) => {
                animatingModal.style.display = 'block';
                setTimeout(() => {
                    animatingModal.classList.add('is-opened');
                }, 50);
            };

            if (currOpenModal != null) {
                currOpenModal.classList.remove('is-opened');
                currOpenModal.style.display = 'none';
            }

            if (!$overlay.classList.contains('.is-opened')) {
                document.body.style.overflow = 'hidden';
                $overlay.classList.add('is-opened');
                animatingFunction(currModal);
            } else {
                animatingFunction(currModal);
            }

            closeTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                closeModal(currModal);
            });

            return true;
        } else {
            console.warn('Cant find modal or its already opened!');
        }
    };

    // Закрытие модального окна. Переменная - объект модалки.
    const closeModal = (closingModal) => {
        if (closingModal && typeof closingModal == 'object' && closingModal.classList.contains('is-opened')) {
            closingModal.classList.remove('is-opened');
            $overlay.classList.remove('is-opened');
            setTimeout(() => {
                closingModal.style.display = 'none';
            }, 300);
            document.body.style.overflow = '';
            return true;
        } else {
            console.warn('Cant find modal or its already closed!');
        }
    };

    // Бинд модалок на элемент. Первая и вторая переменная - классы элементов.
    const bindModal = (modalClass, triggerClass) => {
        if (document.querySelector(triggerClass) && document.querySelector(modalClass)) {
            const $triggers = document.querySelectorAll(triggerClass);
            const $modal = document.querySelector(modalClass);

            $triggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (!$modal.classList.contains('is-opened')) {
                        openModal($modal);
                    }
                });
            });
        } else {
            console.warn('Cant find modal or trigger element');
        }
    };

    // Добавление методов к модалкам
    if ($modals) {
        $modals.forEach($modal => {
            $modal.openModal = () => { openModal($modal) };
            $modal.closeModal = () => { closeModal($modal) };
        });
    }

    // Добавления функций управления модальными окнами в глобальную область видимости.
    window.bindModal = bindModal;
    window.openModal = openModal;
    window.closeModal = closeModal;

}