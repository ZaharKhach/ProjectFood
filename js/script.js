'use strict'

window.addEventListener('DOMContentLoaded', () => {

    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');



    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        })

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        // console.log(target);
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, index) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(index);
                }
            })
        }
    })

    //Timer
    const deadline = '2023-4-20';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        // const t = new Date(endtime);
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60)) % 24),
                minutes = Math.floor((t / (1000 * 60) % 60)),
                seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }

    setClock('.timer', deadline);

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


    // Используем классы для карточек 

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = +price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
        }
        // changeToUAH() {
        //     this.price = this.price * this.transfer;
        // }
        render() {
            const element = document.createElement('div');
            element.innerHTML = `
            <div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            </div>
            `;
            this.parent.append(element);

        }//метод отвечающий за добавление эелемента на страницу 

    }

    const getResourse = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch status: ${res.status}`)
        }//ессли у нас "не успещно" тогда выбросит ошибку 

        return await res.json();
    }

    // getResourse('http://localhost:3000/menu')
    //     .then(data => data.forEach(obj => {
    //         new MenuCard(
    //             obj.img,
    //             obj.altimg,
    //             obj.title,
    //             obj.descr,
    //             obj.price,
    //             '.menu .container'
    //         ).render();
    //     }));
    // сначало мы получаем данные из сервера 
    // из сервера по этому юрл пришел массив из обьектов который мы перебираем
    // и создаем из каждого обьекта конструктор на основе класса MenuCard и аппендим его на страницу с помощью render()

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(obj => {
                new MenuCard(
                    obj.img,
                    obj.altimg,
                    obj.title,
                    obj.descr,
                    obj.price,
                    '.menu .container'
                ).render();
            })
        });

    //Forms

    const massange = {
        loading: "img/form/spinner.svg",
        success: "Всё хорошо, садись 5",
        failure: "Всё плохо, садись 2"
    }
    const forms = document.querySelectorAll("form");

    forms.forEach((item) => {
        bindPostData(item);
    })

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            body: data,
        });

        return await res.json();
    }//функционал по общению с сервером выносим в отдельную фцию
    //так как fetch это ассинхронный код то его ждать никто не будет и в таком случае
    //возможно так что переменной res присвоится ничего так как
    // сервер не успел ответить и из-за этого будет ошибка
    //для этого мы использкуем async await 
    //async мы ставим перед фцией и таким образом говорим джс что тут есть ассинхронный код
    //await мы ставим там, где нужно ждать выполнения операции 
    //также они всегда работают по парно. То есть два сразу

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

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
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
            showModal();

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
                hideModal();
            }, 4000)
        }
    }

    fetch('http://localhost:3000/requests')
        .then(data => data.json())
        .then(res => console.log(res))

    //Слайды

    const prevSlider = document.querySelector('.offer__slider-prev'),
        slider = document.querySelector('.offer__slider'),
        currentIndex = document.querySelector('#current'),
        totalIndex = document.querySelector('#total'),
        nextSlider = document.querySelector('.offer__slider-next'),
        Sliders = document.querySelectorAll('.offer__slide'),
        slidersWrapper = document.querySelector('.offer__slider-wrapper'),
        slidersField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidersWrapper).width;
    let counter = 1,
        offset = 0;

    console.log(width);

    totalIndex.innerHTML = `${getZero(Sliders.length)}`;

    slidersField.style.width = 100 * Sliders.length + '%';
    slidersField.style.display = 'flex';
    slidersField.style.transition = '0.5s all';

    slidersWrapper.style.overflow = 'hidden'


    Sliders.forEach(slider => slider.style.width = width);

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];//массив для хранения точек 
    //нужен для того чтобы для всех эелементов поставить одинкавый opacity
    //а потом дял конкретного сделать этот парматер больше
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);// создаем типа поле для хранения наших навигационных точек 

    for (let i = 0; i < Sliders.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;

        if (i == 0) {
            dot.style.opacity = 1;
        }//подсвечивает первую точку потому что при заходе на стр энивей будет первый элемент
        indicators.append(dot);
        dots.push(dot);//пушим куждую точку в массив
    }

    function forDots(dots, opacity) {
        dots.forEach((dot) => {
            dot.style.opacity = opacity
        });
        dots[counter - 1].style.opacity = 1;
    }//функция для динамического оперделения активной точки

    function stringTransform(string) {
        return +string.replace(/\D/g, '')
    }

    nextSlider.addEventListener('click', () => {
        if (offset == stringTransform(width) * (Sliders.length - 1)) {
            offset = 0;//   
        } else {
            offset += stringTransform(width);
        }

        slidersField.style.transform = `translateX(-${offset}px)`;

        if (counter == Sliders.length) {
            counter = 1;
        } else {
            counter++;
        }

        currentIndex.textContent = `${getZero(counter)}`;

        forDots(dots, '.5');
    });

    prevSlider.addEventListener('click', () => {
        if (offset == 0) {
            offset = stringTransform(width) * (Sliders.length - 1);
        } else {
            offset -= stringTransform(width);
        }

        slidersField.style.transform = `translateX(-${offset}px)`;

        if (counter == 1) {
            counter = Sliders.length;
        } else {
            counter--;
        }

        currentIndex.textContent = `${getZero(counter)}`;

    });

    forDots(dots, '.5');

    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            counter = slideTo;
            offset = stringTransform(width) * (slideTo - 1);

            slidersField.style.transform = `translateX(-${offset}px)`;

            currentIndex.textContent = `${getZero(counter)}`;

            forDots(dots, '.5');
        })
    })


    //calculator

    const result = document.querySelector('.calculating__result span');
    let sex = 'female',
        height, weight, age,
        cef = 1.375;

    function calcTotal() {
        if (!sex || !height || !weight || !age || !cef) {
            result.textContent = 'Ты даун';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * cef);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * cef);
        }
    }


    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-cef')) {
                    cef = +e.target.getAttribute('data-cef');
                } else {
                    sex = e.target.getAttribute('id');
                }
    
                console.log(cef, sex);
    
                elements.forEach(el => {
                    el.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
            calcTotal();
                
            }); 
        });

    }
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('#activity', 'calculating__choose-item_active');

    function getInput(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
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
            calcTotal();
        })
    }

    getInput('#height');
    getInput('#weight');
    getInput('#age');
});
