document.addEventListener('DOMContentLoaded', () => {
    chatToggle();
});


// Открытие/закрытие чата (работает через localStorage)
const chatToggle = () => {
    if (document.querySelector('.chat') && document.querySelector('.chat-toggle')) {
        const chat = document.querySelector('.chat');
        const wrapper = document.querySelector('.wrapper');
        const chatTogglers = document.querySelectorAll('.chat-toggle');
        const dependingElements = document.querySelectorAll('.chat-depends');

        const isChatToggled = window.localStorage.getItem('chatState');

        const openChat = () => {
            dependingElements.forEach(element => {
                element.classList.add('chat-opened');
            });
            wrapper.classList.add('chat-opened');
            chat.classList.add('is-opened');
            window.localStorage.setItem('chatState', 'opened');
        };

        const closeChat = () => {
            dependingElements.forEach(element => {
                element.classList.remove('chat-opened');
            });
            wrapper.classList.remove('chat-opened');
            chat.classList.remove('is-opened');
            window.localStorage.setItem('chatState', 'closed');
        };

        if (isChatToggled == 'opened') {
            openChat();
        }

        chatTogglers.forEach(each => {
            each.addEventListener('click', (e) => {
                e.preventDefault();
                if (localStorage.chatState != 'opened') {
                    openChat();
                } else {
                    closeChat();
                }
            });
        });
    }
};