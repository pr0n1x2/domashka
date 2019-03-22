const User = require('models/user');
const Product = require('models/product');
const Order = require('models/order');
const Article = require('models/article');
const Tag = require('models/tag');

const Seeder = function () {
    this.seed = () => {
        const users = [{
            _id: '5c94e45ab8bf111308c2973f',
            name: 'Сергей',
            surname: 'Федоренко',
            email: 'fedorenkos@dayrep.com',
            phone: '067-230-34-12',
            password: 'R!DX$HChD59Jqy=K',
            address: {
                city: 'Киев',
                street: 'Федьковича',
                house: '12а',
                zip: '03123'
            },
        }, {
            _id: '5c94e79c973d4e1e5cd2f66f',
            name: 'Валентина',
            surname: 'Роликова',
            email: 'rolikova@gmail.com',
            phone: '097-523-23-75',
            password: '=q+zq22N6PpyCU^c',
            address: {
                city: 'Одесса',
                street: 'Ленина',
                house: '4a',
                zip: '32341'
            },
        }, {
            _id: '5c94e813c97edf2230104893',
            name: 'Дмитрий',
            surname: 'Рогозин',
            email: 'rogozin@ukr.net',
            phone: '098-412-43-14',
            password: 'bK*KFmJ3+W4LA?CJ',
            address: {
                city: 'Львов',
                street: 'Бандеры',
                house: '11',
                zip: '12324'
            },
            order_id: '5c95110ddf4598295c41bec3'
        }];

        for (user of users) {
            User.create(user);
        }

        const products = [{
            _id: '5c94f0ec0944801408ac5e52',
            name: 'Двухкамерный холодильник SHARP SJ-BB04IMXW1-UA',
            description: 'Скрытый испаритель обеспечивает равномерное и эффективное охлаждение. С NanoFrost образуется меньше наледи и размораживать холодильник нужно реже. Внутреннее пространство холодильника стало больше, появилось больше возможностей его организации.',
            cost: 759900,
            url: 'sharp_sj-bb04imxw1-ua',
            images: [{
                filename: 'fwpioertj239sdf.jpg',
                alt: 'Двухкамерный холодильник SHARP SJ-BB04IMXW1-UA',
                main: true
            }, {
                filename: 'wff0wfek23rkdfl.jpg',
                alt: 'Двухкамерный холодильник SHARP SJ-BB04IMXW1-UA вид сверху',
            }]
        }, {
            _id: '5c94f0ec0944801408ac5e58',
            name: 'Ноутбук ASUS VivoBook 15 X542UF-DM262 (90NB0IJ3-M03720) Golden',
            description: 'Ноутбук ASUS серии VivoBook X отличается великолепными мультимедийными возможностями. Оснащенный процессором Intel, он справится с самыми ресурсоемкими задачами. Эксклюзивная аудиотехнология SonicMaster обеспечивает беспрецедентное для мобильных компьютеров качество звучания.',
            cost: 1649900,
            url: 'asus_x542uf_dm262',
            images: [{
                filename: 'aca2314124ldfma.jpg',
                alt: 'Ноутбук ASUS VivoBook 15 X542UF-DM262 (90NB0IJ3-M03720) Golden',
                main: true
            }, {
                filename: 'lsdfg23rjadsfsd.jpg',
                alt: 'Экран Ноутбука ASUS VivoBook 15 X542UF-DM262 (90NB0IJ3-M03720) Golden',
            }]
        }, {
            _id: '5c94f0ec0944801408ac5e55',
            name: 'Nokia 6.1 Dual Sim 4/64GB Blue',
            description: 'Новая модель Nokia 6 оснащена мобильной платформой Qualcomm Snapdragon 630 и 3 ГБ оперативной памяти. Проводите больше времени в любимых приложениях, а не в ожидании их загрузки.',
            cost: 599900,
            url: 'nokia_11pl2l01a14',
            images: [{
                filename: 'lksdf23923lkaff.jpg',
                alt: 'Nokia 6.1 Dual Sim 4/64GB Blue',
                main: true
            }, {
                filename: 'fvdk3129dd2flsd.jpg',
                alt: 'Упаковка Nokia 6.1 Dual Sim 4/64GB Blue',
            }]
        }, {
            _id: '5c94f0ec0944801408ac5e5b',
            name: 'Sony Cyber-Shot DSC-H300 Black Официальная гарантия! (DSCH300.RU3)',
            description: 'Снимайте как профессионал: эта простая в использовании камера со множеством функций удобно "сидит" в руке благодаря корпусу как у цифровых зеркалок. От ландшафтов до эффектных крупных планов диких животных во время сафари: с помощью этой камеры вы сможете без труда снимать практически любые сюжеты благодаря 26-кратному оптическому зуму.',
            cost: 639900,
            url: 'sony_cyber-shot_dcs-h300',
            images: [{
                filename: 'wdf34122deslafs.jpg',
                alt: 'Фотоаппарат Sony Cyber-Shot DSC-H300 Black Официальная гарантия! (DSCH300.RU3)',
                main: true
            }, {
                filename: 'jf2139dwndksdcn.jpg',
                alt: 'Sony Cyber-Shot DSC-H300 Black Официальная гарантия! (DSCH300.RU3)',
            }]
        }, {
            _id: '5c94f0ec0944801408ac5e5e',
            name: 'Планшет Impression ImPAD P701 Android 8.1',
            description: 'Планшет ImPAD P701 — лучший попутчик. Комфортный отдых в любой поездке обеспечен, ведь планшет не займет много места в вашем багаже. Он значительно легче, чем ноутбук, к тому же дольше работает автономно.',
            cost: 189900,
            url: 'impression_impad_p701_android_8_1',
            images: [{
                filename: 'f3r9u2kdskf93jd.jpg',
                alt: 'Планшет Impression ImPAD P701 Android 8.1',
                main: true
            }]
        }, {
            _id: '5c94f0ec0944801408ac5e60',
            name: 'Телевизор Philips 43PFS5803/12',
            description: 'Делитесь впечатлениями. Подключите USB-накопитель, цифровую камеру, MP3-плеер или другое мультимедийное устройство через USB-вход телевизора и смотрите фотографии, видео или слушайте музыку, используя удобный экранный обозреватель.',
            cost: 1025000,
            url: 'philips_43pfs5803_12',
            images: [{
                filename: 'df40jfe2lfdfjfs.jpg',
                alt: 'Телевизор Philips 43PFS5803/12',
                main: true
            }]
        }];

        for (product of products) {
            Product.create(product);
        }

        const articles = [{
            _id: '5c950763da41a927c82406e7',
            name: 'iPhone Xs и iPhone Xs Max — обзор смартфонов Apple',
            text: 'Сегодня производителям все сложнее вызывать ажиотаж на старте продаж, но Apple чудесным образом собирает очереди перед своими магазинами даже без значительных изменений в iPhone. В этом году новые модели действительно не получили мажорного обновления, только внутренние апгрейды и появление увеличенной версии с приставкой Мах. Но это вовсе не означает, что в iPhone Xs и iPhone Xs Max нет ничего нового, даже наоборот: они стали быстрее, получили версии с 512 ГБ памяти, новый софт камеры и улучшенный звук. Поэтому давайте детальнее разберемся, как все это работает на практике.',
            url: 'iphone-xs-i-iphone-xs-max-obzor-smartfonov-apple',
            tags: ['5c950c5373c1d61cd8a97497', '5c950c5373c1d61cd8a97498']
        }, {
            _id: '5c950763da41a927c82406e8',
            name: 'Обзор iPhone 7 Plus',
            text: 'На первый взгляд iPhone 7 Plus тяжело отличить от предыдущей модели. Тем не менее, как и в случае с iPhone 7, Apple заявляет, что внутри это совсем другой смартфон. Как будто в доказательство этого, на тыльной его стороне компания расположила сразу две камеры. Давайте посмотрим, что нового в iPhone 7 Plus и стал ли он лучше снимать с двумя объективами.',
            url: 'obzor-iphone-7-plus',
            tags: ['5c950c5373c1d61cd8a97497', '5c950c5373c1d61cd8a97498']
        }, {
            _id: '5c950763da41a927c82406e9',
            name: 'Обзор флагмана Samsung Galaxy S10/S10+',
            text: 'Линейка Galaxy в 2019 году становится юбилейной, выходит десятое поколение этих смартфонов. Это самые популярные смартфоны на Android, их продажи исчисляются сотнями миллионов штук за эти годы. В Samsung всегда старались сделать бескомпромиссные устройства, в которых были бы самые последние технологии, и при этом упор сделан не только на сами технологии, но и на удобство использования.',
            url: 'samsung-galaxy-s10-plus',
            tags: ['5c950c5373c1d61cd8a97499']
        }, {
            _id: '5c950763da41a927c82406ea',
            name: 'Обзор Nokia 7.1: камера с оптикой ZEISS и чистый Android',
            text: 'Компания HMD Global продолжает возрождать легендарный бренд Nokia. И сегодня речь пойдет не о супер-флагмане, а о смартфоне, который станет самым популярным в этом сезоне.',
            url: 'nokia-7-1-review',
            tags: ['5c950c5373c1d61cd8a9749a']
        }];

        for (article of articles) {
            Article.create(article);
        }

        const tags = [{
            _id: '5c950c5373c1d61cd8a97497',
            name: 'Apple',
            url: 'apple',
            articles: ['5c950763da41a927c82406e7', '5c950763da41a927c82406e8']
        }, {
            _id: '5c950c5373c1d61cd8a97498',
            name: 'iPhone',
            url: 'iphone',
            articles: ['5c950763da41a927c82406e7', '5c950763da41a927c82406e8']
        }, {
            _id: '5c950c5373c1d61cd8a97499',
            name: 'Samsung',
            url: 'samsung',
            articles: ['5c950763da41a927c82406e9']
        }, {
            _id: '5c950c5373c1d61cd8a9749a',
            name: 'Nokia',
            url: 'nokia',
            articles: ['5c950763da41a927c82406ea']
        }];

        for (tag of tags) {
            Tag.create(tag);
        }

        const orders = [{
            _id: '5c95110ddf4598295c41bec1',
            user_id: '5c94e45ab8bf111308c2973f',
            complete: true,
            products: [{
                product_id: '5c94f0ec0944801408ac5e52',
                count: 1,
                cost: 759900
            }, {
                product_id: '5c94f0ec0944801408ac5e58',
                count: 1,
                cost: 1649900
            }]
        }, {
            _id: '5c95110ddf4598295c41bec2',
            user_id: '5c94e79c973d4e1e5cd2f66f',
            complete: true,
            products: [{
                product_id: '5c94f0ec0944801408ac5e55',
                count: 3,
                cost: 599900
            }, {
                product_id: '5c94f0ec0944801408ac5e5b',
                count: 1,
                cost: 639900
            }, {
                product_id: '5c94f0ec0944801408ac5e5e',
                count: 2,
                cost: 189900
            }]
        }, {
            _id: '5c95110ddf4598295c41bec3',
            user_id: '5c94e813c97edf2230104893',
            complete: false,
            products: [{
                product_id: '5c94f0ec0944801408ac5e60',
                count: 1,
                cost: null
            }, {
                product_id: '5c94f0ec0944801408ac5e55',
                count: 2,
                cost: null
            }]
        }];

        for (order of orders) {
            Order.create(order);
        }
    };
};

module.exports = Seeder;