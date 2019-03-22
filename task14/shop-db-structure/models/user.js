const mongoose = require('mongoose');
const Address = require('./address');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // Имя
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        trim: true,
    },
    // Фамилия
    surname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        trim: true,
    },
    // E-mail он же логин
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true,
        index: true,
        unique: true,
    },
    // Телефон
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 20,
        trim: true,
    },
    // Пароль
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 30,
    },
    // Адрес доставки
    address: Address,
    // Метка, которая указывает, заблокирован пользователь или нет
    blocked: {
        type: Boolean,
        default: false,
    },
    // Идентификатор заказа / корзины
    // Если это поле пустое, то у пользователя еще нет товаров в корзине.
    // Как только пользователь добавляет в корзину первый товар, в это поле записывается
    // идентификатор созданной корзины.
    // Как только пользователь оформляет заказ, это поле обнуляется.
    // Будет храниться корзина, даже если пользователь выйдет из сайта.
    // Когда он зайдет на сайт в следующий раз, его корзина не исчезнет.
    // Это поле не нужно делать индексным, так как связи не будет.
    order_id: {
        type: Schema.Types.ObjectId,
        default: null,
    }
}, {
    // Временные метки
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;