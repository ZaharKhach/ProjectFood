import tabs from './modules/tabs';
import calculator from './modules/calculator';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slides from './modules/slides';
import timer from './modules/timer';
import { showModal } from './modules/modal';
window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 3000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    calculator();
    cards();
    forms("form", modalTimerId);
    modal('[data-open]', '.modal', modalTimerId);
    timer('.timer', '2023-4-20');
    slides({
        container: '.offer__slider',
        slide: '.offer__slide',
        next: '.offer__slider-next',
        prev: '.offer__slider-prev',
        total: '#total',
        current: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});
