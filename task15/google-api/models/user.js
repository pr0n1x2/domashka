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
}, {
    // Временные метки
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;