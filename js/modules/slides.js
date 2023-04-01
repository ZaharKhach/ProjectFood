import { getZero } from "./timer";

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


}

export default slides