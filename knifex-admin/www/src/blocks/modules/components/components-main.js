import Pikaday from 'pikaday';
import moment from 'moment'
document.addEventListener('DOMContentLoaded', () => {
    calendarsInit();
});

const calendarsInit = () => {
    const allCalendars = document.querySelectorAll('.is-calendar');
    if (allCalendars.length > 0) {
        allCalendars.forEach(calendar => {
            const dateInput = calendar.querySelector('input');
            const picker = new Pikaday({
                field: dateInput,
                format: 'DD/MM/YYYY',
            });
        });
    }
};