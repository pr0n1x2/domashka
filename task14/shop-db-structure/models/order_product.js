const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderProductSchema = new Schema({
    // Ссылка на товар
    product_id: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    // Количество товара
    count: {
        type: Number,
        min: 1,
        max: 1000,
        default: 1,
    },
    // Стоимость товара
    // По умолчанию null, данные тут появляются только когда пользователь оформляет заказ
    // Так как цена продукта может меняться, в этом поле будет храниться цена, по поторой был куплен товар
    cost: {
        type: Number,
        default: null,
    },
});

module.exports = orderProductSchema;