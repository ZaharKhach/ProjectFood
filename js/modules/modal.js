function hideModal(modalSelector) {
    const modalContent = document.querySelector(modalSelector);

    modalContent.classList.add('hide');
    modalContent.classList.remove('show', 'fade');
    document.body.style.overflow = '';
}

function showModal(modalSelector, modalTimerId) {
    const modalContent = document.querySelector(modalSelector);

    modalContent.classList.add('show', 'fade');
    modalContent.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal(tirggeredSelector, modalSelector, modalTimerId) {
    //Modal

    const openModal = document.querySelectorAll(tirggeredSelector),
        modalContent = document.querySelector(modalSelector);



    openModal.forEach(element => {
        element.addEventListener('click', () => showModal(modalSelector, modalTimerId));
    })

    modalContent.addEventListener('click', (e) => {
        if (e.target === modalContent || e.target.getAttribute('data-close') === '') {
            hideModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == "Escape" && modalContent.classList.contains('show')) {
            hideModal(modalSelector);
        }
    });



    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);


}

export default modal;
export { showModal, hideModal };