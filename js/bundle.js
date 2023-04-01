/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
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


    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResourse)('http://localhost:3000/menu')
        .then(data => data.forEach(obj => {
            new MenuCard(
                obj.img,
                obj.altimg,
                obj.title,
                obj.descr,
                obj.price,
                '.menu .container'
            ).render();
        }));
    // сначало мы получаем данные из сервера 
    // из сервера по этому юрл пришел массив из обьектов который мы перебираем
    // и создаем из каждого обьекта конструктор на основе класса MenuCard и аппендим его на страницу с помощью render()

    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(obj => {
    //             new MenuCard(
    //                 obj.img,
    //                 obj.altimg,
    //                 obj.title,
    //                 obj.descr,
    //                 obj.price,
    //                 '.menu .container'
    //             ).render();
    //         })
    //     });
    //это корчое я забыл как оно работает, но это
    //библиотека которая облегчает получение эелентов с сервера и дает вроде больше возможностей

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




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

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            //сначало берем данные с формы превращаем их в массив массивов
            //потом превращаем этот массив в обычный обьект 
            //и в конце превращаем его в джсон обьект который можно отправить на сервер


            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', modalTimerId);

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
                (0,_modal__WEBPACK_IMPORTED_MODULE_0__.hideModal)('.modal');
            }, 4000)
        }
    }

    fetch('http://localhost:3000/requests')
        .then(data => data.json())
        .then(res => console.log(res))

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "hideModal": () => (/* binding */ hideModal),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slides.js":
/*!******************************!*\
  !*** ./js/modules/slides.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


function slides({ container, slide, next, prev, total, current, wrapper, field }) {
    //Слайды

    const prevSlider = document.querySelector(prev),
        slider = document.querySelector(container),
        currentIndex = document.querySelector(current),
        totalIndex = document.querySelector(total),
        nextSlider = document.querySelector(next),
        Sliders = document.querySelectorAll(slide),
        slidersWrapper = document.querySelector(wrapper),
        slidersField = document.querySelector(field),
        width = window.getComputedStyle(slidersWrapper).width;
    let counter = 1,
        offset = 0;

    console.log(width);

    totalIndex.innerHTML = `${(0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(Sliders.length)}`;

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

        currentIndex.textContent = `${(0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(counter)}`;

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

        currentIndex.textContent = `${(0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(counter)}`;

    });

    forDots(dots, '.5');

    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            counter = slideTo;
            offset = stringTransform(width) * (slideTo - 1);

            slidersField.style.transform = `translateX(-${offset}px)`;

            currentIndex.textContent = `${(0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(counter)}`;

            forDots(dots, '.5');
        })
    })


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slides);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    //Tabs
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);



    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        })

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        // console.log(target);
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, index) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(index);
                }
            })
        }
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getZero": () => (/* binding */ getZero)
/* harmony export */ });
function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function timer(timerSelector, deadline) {
    //Timer
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

    setClock(timerSelector, deadline);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResourse": () => (/* binding */ getResourse),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
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


const getResourse = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch status: ${res.status}`)
    }//ессли у нас "не успешно" тогда выбросит ошибку 

    return await res.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slides__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slides */ "./js/modules/slides.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");








window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.showModal)('.modal', modalTimerId), 3000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])("form", modalTimerId);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])('[data-open]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2023-4-20');
    (0,_modules_slides__WEBPACK_IMPORTED_MODULE_5__["default"])({
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

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map