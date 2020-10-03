document.addEventListener('DOMContentLoaded', () => {
    accordionInit();
    bindCounter();
});


// Открытие/закрытие аккордеона.
const accordionInit = () => {
    if (document.querySelector('.ac')) {
        const accordions = document.querySelectorAll('.ac');
        accordions.forEach(accordion => {
            const accordionHead = accordion.querySelector('.ac-h');
            const accordionBody = accordion.querySelector('.ac-c');
            if (!accordion.classList.contains('is-opened')) {
                accordionBody.style.height = 0;
            } else {
                accordionHead.classList.remove('is-disabled');
                accordionBody.style.height = accordionBody.offsetHeight + 'px';
                setTimeout(() => {
                    accordionBody.style.height = 'auto';
                    accordionHead.classList.remove('is-disabled');
                }, 500)
            }

            const accordionToggling = () => {
                if (!accordion.classList.contains('is-opened')) {
                    let animatingHeight = accordionBody.scrollHeight + 'px';
                    accordionHead.classList.add('is-disabled');
                    accordionBody.style.height = accordionBody.scrollHeight + 'px';
                    setTimeout(() => {
                        accordionBody.style.height = 'auto';
                        accordionHead.classList.remove('is-disabled');
                    }, 500)
                    window.addEventListener('resize', () => {
                        if (accordion.classList.contains('is-opened')) {
                            accordionBody.style.height = accordionBody.scrollHeight + 'px';
                            setTimeout(() => {
                                accordionBody.style.height = 'auto';
                            }, 500)
                        }
                    });
                    setTimeout(() => {
                        accordion.classList.add('is-opened');
                    }, 0)
                } else {
                    accordionHead.classList.add('is-disabled');
                    accordionBody.style.height = accordionBody.offsetHeight + 'px';
                    setTimeout(() => {
                        accordionBody.style.height = 0 + 'px';
                        accordion.classList.remove('is-opened');
                        setTimeout(() => {
                            accordionHead.classList.remove('is-disabled');
                        }, 400);
                    }, 100);
                }
            };

            accordionHead.addEventListener('click', (e) => {
                e.preventDefault();
                accordionToggling();
            });

            accordion.toggleAccordion = () => {
                accordionToggling();
            };
        });
    }
};

// Плюс/минус инпут
const bindCounter = () => {
    if (document.querySelector('.is-counter')) {
        const allCounters = document.querySelectorAll('.is-counter');
        allCounters.forEach(counter => {
            const counterInput = counter.querySelector('input');
            const counterIncrBtns = counter.querySelectorAll('.is-counter__incr');
            const counterDecrBtns = counter.querySelectorAll('.is-counter__decr');

            counterIncrBtns.forEach(each => {
                each.addEventListener('click', (e) => {
                    e.preventDefault();
                    incrValue(counterInput);
                });
            });

            counterDecrBtns.forEach(each => {
                each.addEventListener('click', (e) => {
                    e.preventDefault();
                    decrValue(counterInput);
                });
            });
        });

        const incrValue = (input) => {
            let currCounterValue = Number.isNaN(Number.parseInt(input.value)) ? 0 : Number.parseInt(input.value);
            if (input.value < 0) {
                input.value = 0;
            } else {
                input.value = currCounterValue + 1;
            }
        };

        const decrValue = (input) => {
            let currCounterValue = Number.isNaN(Number.parseInt(input.value)) ? 1 : Number.parseInt(input.value);
            if (currCounterValue != 0 && !(currCounterValue < 0)) {
                input.value = currCounterValue - 1;
            } else {
                input.value = 0;
            }
        };

        window.incrValue = incrValue;
        window.decrValue = decrValue;
    }
};