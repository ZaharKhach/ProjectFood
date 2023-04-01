function calculator() {
    //calculator

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, cef;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'male')
    }

    if (localStorage.getItem('cef')) {
        cef = localStorage.getItem('cef');
    } else {
        cef = 1.375;
        localStorage.setItem('cef', 1.375)
    }

    function initLocalSetting(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            el.classList.remove(activeClass);
            if (el.getAttribute('id') === localStorage.getItem('sex')) {
                el.classList.add(activeClass);
            }
            if (el.getAttribute('data-cef') === localStorage.getItem('cef')) {
                el.classList.add(activeClass);
            }
        });
    }
    initLocalSetting('#gender div', 'calculating__choose-item_active');
    initLocalSetting('#activity div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !cef) {
            result.textContent = 'Ты даун';
            //если у нас не определены какие-то данные в спан запишется ты даун
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * cef);
            //формула подсчета ккал для мужчин
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * cef);
            //для женщин
        }
    }
    //фция подставляет все введенные данные в формулу и выводит в спан



    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);
        //выбираем элементы на которые будем вешать обработчики событий

        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-cef')) {
                    cef = +e.target.getAttribute('data-cef');
                    localStorage.setItem('cef', +e.target.getAttribute('data-cef'));//помещаем в локалСторедж ключ кеф с значением кефа
                    //если мы работаем с элементами физической активности
                    //тогда cef присваивается значение коэффициента
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));//помещаем в локалСторедж 
                    //если же с полом (М-Ж) тогда sex присваивается айдишник элемента 
                    //на который кликнули (male of famale)
                }

                console.log(cef, sex);

                elements.forEach(el => {
                    el.classList.remove(activeClass);
                });//удаляем для всех класс активности

                e.target.classList.add(activeClass);
                //и ставим класс активности для элемента на который кликнули

                calcTotal();
                //вызываем эту фцию чтобы она сраву же подсчитывала новые значения и выводила их в спан

            });
        });

    }
    //функция для работы над , хуй его , над тем, что надо выбирать а не вводить

    getStaticInformation('#gender', 'calculating__choose-item_active');//вызываем фцию для работы над полом
    getStaticInformation('#activity', 'calculating__choose-item_active');//над физической активностью

    function getInput(selector) {
        const input = document.querySelector(selector);
        //помещаем в input инпут с страницы

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1.8px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    console.log(height)
                    break;

                case 'weight':
                    weight = +input.value;
                    console.log(weight)
                    break;

                case 'age':
                    age = +input.value;
                    console.log(age)
                    break;

            }
            //назначаем обработчик события который срабатыает при кадждом изминении инпута
            calcTotal();
        })
    }

    getInput('#height');
    getInput('#weight');
    getInput('#age');
}

export default calculator;