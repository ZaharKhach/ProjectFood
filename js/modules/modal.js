function modal() {
    //Modal

    const openModal = document.querySelectorAll('[data-open]'),
        modalContent = document.querySelector('.modal');

    function hideModal() {
        modalContent.classList.add('hide');
        modalContent.classList.remove('show', 'fade');
        document.body.style.overflow = '';
        clearInterval(modalTimerId);
    }

    function showModal() {
        modalContent.classList.add('show', 'fade');
        modalContent.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    openModal.forEach(element => {
        element.addEventListener('click', showModal);
    })

    modalContent.addEventListener('click', (e) => {
        if (e.target === modalContent || e.target.getAttribute('data-close') === '') {
            hideModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == "Escape" && modalContent.classList.contains('show')) {
            hideModal();
        }
    });


    const modalTimerId = setTimeout(showModal, 3000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);


}

module.exports = modal;