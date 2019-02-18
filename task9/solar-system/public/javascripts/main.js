// В этом массиве будут кешироваться объекты планет, полученные с сервера
const planets = [];

// Переменная содержит текущий объект планеты
let planet = null;

// Переменная содержит предыдущий объект планеты
let previousPlanet = null;

// Переменная хранит DOM элемент, где отображается приветствующая надпись
let presentationContainer = null;

// Переменные хранят DOM элементы, в которых отображается планета
let planetContainer = null;
let planetAtmosphere = null;
let planetElement = null;

// Переменные хранят DOM элементы, в которых отображается тексты про планету
let descElement = null;
let textElement = null;

// Переменные хранят DOM элементы, в которых отображается название планета и ее описание
let planetName = null;
let planetDescription = null;

// Переменная хранит DOM элемент, где отображаются факты об планете
let factContainers = null;

// Переменная хранит DOM элемент, где отображаются меню
let menuContainer = null;

// Массив ассоциаций цветов, которыми будут показаны факты о планете и их соответсвующие классы
const factColorAssotiations = [
    {name: 'white', value: 'fact-text-white-color'},
    {name: 'blue', value: 'fact-text-blue-color'},
    {name: 'orange', value: 'fact-text-orange-color'},
    {name: 'red', value: 'fact-text-red-color'}
];

// Промисированная функция, с помощью которой, происходит задержка между действиями на экране
const delay = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
};

// Функция которая записывает в переменную planet текущий объект планеты
const setPlanet = (planetObj) => {
    planet = planetObj;
}

// Функция которая получает из сервера объект планеты
const getPlanet = (name) => {
    return new Promise((resolve, reject) => {
        const url = `/planet/${name}`;

        return fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((planetObj) => {
                planets.push(planetObj);
                resolve(planetObj);
            })
            .catch(() => {
                planet = false;
            });
    });
}

// Функция которая ищет планету в кеше, если она ранее была загружена из сервера
const getPlanetFromCache = (name) => {
    return new Promise((resolve, reject) => {
        let isFindPlanetInCache = false;

        for (let i = 0; i < planets.length; i++) {
            if (planets[i].name === name) {
                isFindPlanetInCache = true;
                resolve(planets[i]);
                break;
            }
        }

        // Если планета в кеше не найдена тогда получаем планету из сервера
        if (!isFindPlanetInCache) {
            reject(name);
        }
    });
}

// Функция которая меняет факты о текущей планете
const fact = (name, value, nameColor, valueColor, containerIndex) => {
    const container = factContainers[containerIndex].querySelector('.fact');
    const nameContainer = container.querySelector('.fact-name');
    const valueContainer = container.querySelector('.fact-value');

    for (let color of factColorAssotiations) {
        if (nameContainer.classList.contains(color.value)) {
            nameContainer.classList.remove(color.value);
        }

        if (valueContainer.classList.contains(color.value)) {
            valueContainer.classList.remove(color.value);
        }
    }

    nameContainer.innerText = name;
    valueContainer.innerText = value;

    for (let color of factColorAssotiations) {
        if (nameColor === color.name) {
            nameContainer.classList.add(color.value);
            break;
        }
    }

    for (let color of factColorAssotiations) {
        if (valueColor === color.name) {
            valueContainer.classList.add(color.value);
            break;
        }
    }

    container.classList.add('scale-fact-up');
};

// Функция которая отображает текст на экране, когда мы нажали на кнопку на планете
const description = (text) => {
    const prom = delay(0);

    if (descElement.classList.contains('description-hide')) {
        descElement.classList.remove('description-hide');
        descElement.classList.add('description-show');
    }

    prom
        .then(() => {
            if (descElement.classList.contains('scale-description-up')) {
                descElement.classList.remove('scale-description-up');

                return delay(400);
            }

            return delay(0);
        })
        .then(() => {
            textElement.innerText = text;
            return delay(100);
        })
        .then(() => {
            descElement.classList.add('scale-description-up');
        });
};

// Функция, которая размещает информационные кнопки на текущей планете
const button = (top, left, text) => {
    let el = document.createElement('button');

    el.style.top = top;
    el.style.left = left;

    el.addEventListener('click', () => {
        description(text);
    });

    delay(100)
        .then(() => {
            el = planetAtmosphere.appendChild(el);
            return delay(100);
        })
        .then(() => {
            el.classList.add('scale-button-up');
        });
};

// Функция которая показывает на экране текущею планету
const showPlanet = () => {
    delay(0)
        .then(() => {
            if (previousPlanet !== null) {
                planetElement.classList.remove(previousPlanet.name);
            }

            planetElement.classList.add(planet.name);
            return delay(200);
        })
        .then(() => {
            planetContainer.classList.remove('scale-down');
            planetContainer.classList.add('scale-up');
            return delay(7000);
        })
        .then(() => {
            planetContainer.classList.add('gravity');

            planetName.innerText = planet.planetName;
            planetDescription.innerText = planet.planetDescription;

            return delay(500);
        })
        .then(() => {
            planetName.classList.add('scale-planet-description-up');
            return delay(500);
        })
        .then(() => {
            planetDescription.classList.add('scale-planet-description-up');
            return delay(500);
        })
        .then(() => {
            for (let i = 0; i < planet.facts.length; i++) {
                setTimeout(() => {
                    fact(
                        planet.facts[i].name,
                        planet.facts[i].value,
                        planet.facts[i].nameColor,
                        planet.facts[i].valueColor,
                        i
                    );
                }, i * 300);
            }

            return delay(500);
        })
        .then(() => {
            for (let i = 0; i < planet.points.length; i++) {
                setTimeout(() => {
                    button(planet.points[i].top, planet.points[i].left, planet.points[i].text);
                }, i * 300);
            }

            return delay(1000);
        })
        .then(() => {
            menuContainer.classList.add('scale-menu-up');
        });
}

// Функция которая прячет с экрана текущею планету
const hidePlanet = () => {
    delay(0)
        .then(() => {
            menuContainer.classList.remove('scale-menu-up');
            return delay(500);
        })
        .then(() => {
            if (descElement.classList.contains('description-show')) {
                delay(0)
                    .then(() => {
                        descElement.classList.remove('scale-description-up');
                        return delay(300);
                    })
                    .then(() => {
                        descElement.classList.remove('description-show');
                        descElement.classList.add('description-hide');
                    });
            }

            return delay(500);
        })
        .then(() => {
            const buttons = planetAtmosphere.querySelectorAll('button');

            for (let i = 0; i < buttons.length; i++) {
                setTimeout(() => {
                    // buttons[i].removeEventListener('click', null);
                    buttons[i].remove();
                }, i * 300);
            }

            return delay(500);
        })
        .then(() => {
            let timer = 0;

            for (let i = 3; i >= 0; i--) {
                setTimeout(() => {
                    factContainers[i].firstChild.classList.remove('scale-fact-up');
                },timer * 300);

                timer++;
            }

            return delay(500);
        })
        .then(() => {
            planetDescription.classList.remove('scale-planet-description-up');
            return delay(500);
        })
        .then(() => {
            planetName.classList.remove('scale-planet-description-up');
            return delay(500);
        })
        .then(() => {
            planetContainer.classList.remove('scale-up');
            planetContainer.classList.add('scale-down');
            return delay(5000);
        })
        .then(() => {
            showPlanet();
        });
}

// Свойство срабатывает когда весь DOM был загружен при открытии страницы
window.addEventListener('load', () => {
    // Когда DOM был загружен, присваиваем переменным элементы на странице
    planetContainer = document.querySelector('.ratio');
    planetAtmosphere = document.querySelector('.ratio-inner');
    planetElement = planetContainer.querySelector('.ratio-content');

    presentationContainer = document.querySelector('.presentation');

    planetName = document.querySelector('.planet-name');
    planetDescription = document.querySelector('.planet-description');

    descElement = document.querySelector('.description');
    textElement = descElement.querySelector('.text');

    factContainers = document.querySelectorAll('div.facts ul li');

    menuContainer = document.querySelector('nav');

    // Проигрываем музыку
    const audio = new Audio('/music/music.mp3');
    audio.play();

    const menuLinks = menuContainer.querySelectorAll('a');

    // Вешаем на каждый пункт меню обработчик события click, так как запрос к серверу
    // осуществляем через ajax
    for (let i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener('click', (event) => {
            const dataPlanet = event.currentTarget.dataset['planet'];

            // Если кликаем на планете, которая в данный момент отображается, тогда ничего не делаем
            if (planet.name === dataPlanet) {
                return false;
            }

            // Функция обработчик события 'animationiteration'
            // Предназначена для того, чтобы плавно, без скачков остановить анимацию планеты
            const animationIteration = (event) => {
                if (event.animationName == 'swing') {
                    event.currentTarget.classList.remove('gravity');
                    event.currentTarget.removeEventListener("animationiteration", animationIteration);
                }
            }

            planetContainer.addEventListener("animationiteration", animationIteration);

            // В переменную previousPlanet записываем объект планеты, которая должна скрыться
            previousPlanet = planet;

            // Пока идет анимация на экране, делаем асинхронный запрос в кеш, чтобы найти следующею планету
            // Если планета в кеше не будет найдена, тогда будет произведен запрос на сервер
            getPlanetFromCache(dataPlanet)
                .then(setPlanet)
                .catch((name) => {
                    getPlanet(name).then(setPlanet);
                });

            // Прячем текущею планету и показывает следующею
            hidePlanet();
        });
    }

    // При открытии страницы, запрашиваем данные с сервера о первой планете,
    // показывает приветствие и показываем планету
    getPlanet('sun')
        .then((name) => {
            return setPlanet(name);
        })
        .then(() => {
            return delay(3000);
        })
        .then(() => {
            presentationContainer.classList.add('scale-presentation-up');
            return delay(7000);
        })
        .then(() => {
            presentationContainer.classList.add('scale-presentation-down');
            return delay(5000);
        })
        .then(() => {
            presentationContainer.remove();
            menuContainer.classList.remove('menu-hidden');
            return delay(1000);
        })
        .then(() => {
            showPlanet();
        });
});