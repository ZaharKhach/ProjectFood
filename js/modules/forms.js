import { showModal } from "./modal";
import { hideModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
    //Forms

    const massange = {
        loading: "img/form/spinner.svg",
        success: "Всё хорошо, садись 5",
        failure: "Всё плохо, садись 2"
    }
    const forms = document.querySelectorAll(formSelector);

    forms.forEach((item) => {
        bindPostData(item);
    })


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = massange.loading;
            statusMessage.style.cssText = ` 
                display: block;
                margin: 0 auto; 
            `
            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);

            console.log(formData);
        

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            console.log(json);
            //сначало берем данные с формы превращаем их в массив массивов
            //потом превращаем этот массив в обычный обьект 
            //и в конце превращаем его в джсон обьект который можно отправить на сервер


            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);  
                    showThanksModal(massange.success);
                    form.reset();
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(massange.failure)
                }).finally(() => {
                    form.reset();
                });


        });
        function showThanksModal(messeage) {
            const prevModalDalog = document.querySelector('.modal__dialog');
            prevModalDalog.classList.add('hide');
            showModal('.modal', modalTimerId);

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class="modal__content"> 
                    <div class="modal__close" data-close>×</div>
                    <div class="modal__title">${messeage}</div>
                </div>
            `;

            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => {
                thanksModal.remove();
                prevModalDalog.classList.add('show');
                prevModalDalog.classList.remove('hide');
                hideModal('.modal');
            }, 4000)
        }
    }

    fetch('http://localhost:3000/requests')
        .then(data => data.json())
        .then(res => console.log(res))

}

export default forms;