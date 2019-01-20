const Scene = function (windowWidth, windowHeight) {
    this.el; // Свойство где будет храниться Element cцена

    // Создаем и настиаваем сцену
    this.create = (windowWidth, windowHeight) => {
        // Вычисляем геометрию относительно размеров рабочей области
        const width = Math.floor(windowWidth / 5);
        const height = Math.floor(windowHeight / 2);

        // Вычисляем x, y координаты, чтобы расположить сцену по центру
        const top = Math.floor((windowHeight / 2) - (height / 1.65));
        const left = Math.floor((windowWidth / 2) - (width / 2));

        // Создаем Element сцены
        const element = document.createElement('div');

        // Присваиваем сцене нужные классы и стили
        element.classList.add('scene');
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
        element.style.top = `${top}px`;
        element.style.left = `${left}px`;

        // Размещаем сцену на документе и присваиваем свойству this.el ее html
        this.el = document.body.appendChild(element);
    }

    // Возвращаем размер сцены и ее позицию относительно окна
    this.getRect = () => {
        return this.el.getBoundingClientRect();
    }

    this.create(windowWidth, windowHeight);
}

const Actor = function (width, height, guise) {
    this.transition = 'transition'; // CSS класс, который отвечает за css анимацию
    this.myManager; // Данное свойство хранит ссылку на менеджер, которому принадлежит актер
    this.previousPosition; // Предыдушая позиция в которой был расположен актер
    this.active = false; // Данное свойтво отвечает играет ли актер или ждет своей очереди
    this.isMove = false; // Свойство хранит состояние актера, движется он или стоит
    this.name = guise; // Идентификатор актера
    this.el; // Свойство где будет храниться Element актер

    // Создаем и настраиваем актера
    this.create = (width, height, guise) => {
        // Создаем Element актер
        const actor = document.createElement('div');

        // Задаем актеру геометрию и применяем образ
        actor.classList.add('actor');
        actor.style.width = `${width}px`;
        actor.style.height = `${height}px`;
        actor.classList.add(guise);

        // На данном этапе актеры находятся в примерочной
        actor.style.top = '20px';
        actor.style.left = '20px';

        const actorHide = document.createElement('div');
        actorHide.classList.add('hide');

        const actorHideBackground = document.createElement('div');
        actorHideBackground.classList.add('hide-background');

        actorHide.appendChild(actorHideBackground);
        actor.appendChild(actorHide);

        // Размещаем актера на документе и присваиваем свойству this.el его html
        this.el = document.body.appendChild(actor);
    }

    // Метод добавляет актеру css класс, который позволяет анимировать автера на уровне css
    // Этот медот вызывается только когда актер должен занять первоначальную позицию
    this.setTransition = () => {
        this.el.classList.add(this.transition);
    }

    // Убираем css класс анимации, когда актер занял первоначальную позицию
    this.removeTransition = () => {
        this.el.classList.remove(this.transition);
    }

    // Задаем первоначальные позиции для актера
    this.setStartPosition = (top, left) => {
        this.el.style.top = `${top}px`;
        this.el.style.left = `${left}px`;
        this.previousPosition = left;
    }

    // Метод вешает на актера отбработчик событий
    this.react = (func) => {
        // Вешаем на Element актер событие click
        this.el.addEventListener('click', () => {
            // Если актер играет, тогда мы не может кликнуть по нему
            if (this.active) {
                return;
            }

            this.active = true;
            this.isMove = true;

            // Вызываем функцию обработчик, в качетсве параметра передаем текущего актера, по которому кликнули
            func(this);
        });
    }

    // Метод, который двигает всех актеров по сцене и за ее пределами
    // Если задан второй параметр, тогда актер будет выходить на сцену
    // и для него нужно рассчитывать пересечения со сценой
    this.move = (position, sceneRect = null) => {
        const moveTo = (position, previousPosition, oldPosition, sceneRect, actorBg) => {
            const calculateConflux = () => {
                const actorBgRect = actorBg.getBoundingClientRect();

                if (actorBgRect.x >= sceneRect.right || actorBgRect.right <= sceneRect.x) {
                    return;
                }

                if (actorBgRect.x > sceneRect.x && actorBgRect.right < sceneRect.right) {
                    return;
                }

                console.log('YES');
            }

            const intervalID = setInterval(() => {
                if (oldPosition !== position) {
                    position < previousPosition ? oldPosition-- : oldPosition++;
                    this.el.style.left = `${oldPosition}px`;

                    if (sceneRect !== null) {
                        calculateConflux();
                    }
                } else {
                    this.active = false;
                    this.isMove = false;
                    clearInterval(intervalID);
                    this.myManager.groupActors();
                }
            }, 10);
        }

        let actorBg = null;

        if (sceneRect !== null) {
            actorBg = this.el.querySelector('.hide-background');
        }

        moveTo(position, this.previousPosition, this.previousPosition, sceneRect, actorBg);
    }

    this.create(width, height, guise);
}

const ActorManager = function (startPosition, actorWidth, actorTop, direction = 'right') {
    this.direction = direction; // Свойство, которое указывает расположение менеджера относительно сцены (справа, слева)
    this.positions = []; // Массив объектов в которых будут храниться координаты рассположений актеров и сами актеры

    this.create = () => {
        const indent = 50; // Отступ первого актера от сцены
        const actorIndent = 25; // Отступ актера от соседнего актера
        const maxPositions = 4; // Сколько позиций для актеров может вместить менеджер

        // Вычисляем позицию первого актера
        let direction = this.direction  === 'right' ? startPosition + indent : startPosition - indent - actorWidth;

        for (let i = 0; i < maxPositions; i++) {
            // Создаем новую позицию и указываем ее координаты
            // На данном этапе на позициях нет акторов
            this.positions[i] = {left: direction, top: actorTop, actor: null};

            // Вычисляем следующею позицию относительно расположения и соседнего актера
            if (this.direction  === 'right') {
                direction += actorWidth + actorIndent;
            } else {
                direction -= actorWidth + actorIndent;
            }
        }
    }

    // Добавляем актера в менеджер
    this.addActor = function (actor) {
        for (let position of this.positions) {
            // Если первая доступная позиция пустая, тогда размещаем в ней актера
            if (position.actor === null) {
                // В свойство myManager записываем ссылку на менеджера к которому в данный момент принадлежит актер
                actor.myManager = this;
                actor.previousPosition = position.left;
                position.actor = actor;
                break;
            }
        }
    }

    // Перебираем всех актеров в менеджере, задаем им первоначальные позиции и
    // анимируем с помощью css и небольшой временной задержкой
    this.takePosition = (delay) => {
        for (let position of this.positions) {
            if (position.actor !== null) {
                position.actor.setTransition();

                setTimeout(() => {
                    position.actor.setStartPosition(position.top, position.left);
                }, 500 * delay);

                delay++;
            }
        }
    }

    // Метод, который подготавлявает всех актеров, после того, как она заняли первоначальные позиции
    this.prepareActors = (func) => {
        for (let position of this.positions) {
            if (position.actor !== null) {
                // Удаляем css класс, который отвечает за css анимацию (больше она не успользуется)
                position.actor.removeTransition();

                // Вешаем на актера обработчик событий
                position.actor.react(func);
            }
        }
    }

    // Метод удаляет из менеджера актера по которому клинкули, так как он должен перейти в противоположный менеджер
    this.removeActiveActor = (actor) => {
        for (let position of this.positions) {
            if (position.actor !== null) {
                if (position.actor.name === actor.name) {
                    position.actor = null;
                }
            }
        }
    }

    // Метод находит ближайшую свободную координату куда может переместиться актер
    this.getNearPosition = () => {
        for (let position of this.positions) {
            if (position.actor === null) {
                return position.left;
            }
        }
    }

    // Метод группирует всех актеров, чтобы они заняли позиции ближе к сцене
    this.groupActors = () => {
        const findAfter = (position) => {
            if (position != (this.positions.length - 1)) {
                for (let j = position + 1; j < this.positions.length; j++) {
                    if (this.positions[j].actor !== null && !this.positions[j].actor.isMove) {
                        const actor = this.positions[j].actor;
                        this.positions[j].actor = null;

                        return actor;
                    }
                }
            }

            return null;
        }

        let delay = 1;

        for (let i = 0; i < this.positions.length; i++) {
            if (this.positions[i].actor === null) {
                const nextActor = findAfter(i);

                if (nextActor !== null) {
                    this.positions[i].actor = nextActor;
                    this.positions[i].actor.active = true;
                    this.positions[i].actor.isMove = true;

                    setTimeout(() => {
                        this.positions[i].actor.move(this.positions[i].left);
                        this.positions[i].actor.previousPosition = this.positions[i].left;
                    }, 500 * delay);

                    delay++;
                }
            }
        }
    }

    this.create(startPosition, actorWidth, actorTop);
}

const Theater = function () {
    this.actors = ['chaplin', 'marilyn', 'pamela', 'leonardo']; // Текстуры для актеров
    this.actorManeger = []; // Хранилище менеджеров
    this.sceneRect; // Геометрия и координаты сцены

    // Инициализация сцены, менеджеров и актеров
    this.init = () => {
        // Узнаем размеры рабочей области окна
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Создаем сцену
        const scene = new Scene(windowWidth, windowHeight);

        // Получаем размер сцены и ее позицию
        this.sceneRect = scene.getRect();

        // Вычисляем размеры для актеров относительно сцены
        const actorWidth = Math.floor(this.sceneRect.width / 2.5);
        const actorHeight = Math.floor(this.sceneRect.height / 1.5);
        const actorTop = Math.floor((windowHeight / 2) - (actorHeight / 2));

        // Создаем два менеджера актеров (слева и справа относительно сцены)
        this.actorManeger[0] = new ActorManager(this.sceneRect.x, actorWidth, actorTop, 'left');
        this.actorManeger[1] = new ActorManager(this.sceneRect.right, actorWidth, actorTop);

        for (let i = 0; i < this.actors.length; i++) {
            // Создаем нового актера
            let actor = new Actor(actorWidth, actorHeight, this.actors[i]);

            // Распределяем актеров по менеджерам (два слева и два справа)
            if (i < 2) {
                this.actorManeger[0].addActor(actor);
            } else {
                this.actorManeger[1].addActor(actor);
            }
        }
    }

    // Устанавливаем актеров в первоначальную позицую с помощью css анимации
    this.takeInitialPositions = () => {
        let delay = 1; // Временная задержка с которой актер должен прибыть на первоначальную позицию

        // Говорим всем менеджерам, чтобы они дали приказ актерам задать первоначальные позиции
        // Цикл вызываем в обратном порядке, просто для того, чтобы актеры заняли снача правую позицию
        for (let i = 1; i >= 0; i--) {
            this.actorManeger[i].takePosition(delay);
            delay +=2;
        }

        // Делаем окончательную настройку актеров
        // Задержку устанавливаем для того, чтобы нельзя было клинкуть по актеру
        // до того, как он занял первоначальную поцизию
        setTimeout(this.prepareActors, 3500);
    }

    // Настраиваем актеров после того, как они заняли первоначальные позиции
    this.prepareActors = () => {
        for (let manager of this.actorManeger) {
            // В качестве аргумента передаем функцию обработчик, которая будет
            // двигать и распределять актеров между менеджерами
            manager.prepareActors(this.moveActors);
        }
    }

    // Функция обработчки, которая вызывается всякий раз, когда мы кликнули по актеру
    this.moveActors = (actor) => {
        // Менеджер актера в момент когда мы на него кликнули
        const actorManager = actor.myManager;

        // Получаем противоположный менеджер
        const manager = this.getAnotherManager(actorManager);

        // Получаем ближайшие координаты куда можно переместить актера
        const position = manager.getNearPosition();

        // Удаляем актера из менеджера в котором он был, когда мы по нему клинкули
        // так как он должен переместиться в противоположный менеджер
        actorManager.removeActiveActor(actor);

        // Говорим актеру, чтобы он вышел на сцену
        // Для расчета пересечения со сценой, вторый параметром передает геометрию и координаты сцены
        actor.move(position, this.sceneRect);

        // Добавляем актера в противоположный менеджер
        manager.addActor(actor);

        // Группируем всех актуров в менеджере
        actorManager.groupActors();
    }

    // Метод возвращает противоположный менеджер
    this.getAnotherManager = (manager) => {
        for (let anotherManager of this.actorManeger) {
            // Так как у нас всего может быть два менеджера (левый и правый)
            // просто сравниваем их позиции и возвращаем несовпавший менеджер
            if (anotherManager.direction !== manager.direction) {
                return anotherManager;
            }
        }
    }

    this.init();
}

const theater = new Theater();
theater.takeInitialPositions();