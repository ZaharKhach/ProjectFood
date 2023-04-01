import { getResourse } from "../services/services";

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


    getResourse('http://localhost:3000/menu')
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

export default cards;