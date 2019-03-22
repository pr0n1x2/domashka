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
    };
};

module.exports = Seeder;