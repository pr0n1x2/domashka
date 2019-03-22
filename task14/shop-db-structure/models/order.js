const mongoose = require('mongoose');
const OrderProduct = require('./order_product');
const Schema = mongoose.Schema;

// Коллекция заказов и она же корзина
// Если поле complete = false, тогда эти товары находятся в корзине,
// иначе этот заказ считается оформлен

const orderSchema = new Schema({
    // Ссылка на пользователя, который разместил заказ
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    // Метка, которая указывает, что заказ оформлен или находится в стадии оформления
    complete: {
        type: Boolean,
        default: false,
        index: true,
    },
    products: [OrderProduct],
}, {
    // Временные метки
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;