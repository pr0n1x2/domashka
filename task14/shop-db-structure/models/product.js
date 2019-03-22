const mongoose = require('mongoose');
const ProductImage = require('./product_image');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    // Имя товара
    name: {
        type: String,
        required: true,
        maxlength: 255,
        trim: true,
    },
    // Описание товара
    description: {
        type: String,
        default: null,
    },
    // Стоимость товара
    cost: {
        type: Number,
        required: true,
        default: 0,
    },
    // Url для товара
    url: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 180,
        unique: true,
    },
    // Счетчик просмотров товара
    views: {
        type: Number,
        default: 0,
    },
    // Метка, которая указывает, оторбажать на сайте или спрятать (удалить)
    visible: {
        type: Boolean,
        default: true,
    },
    // Массив картинок
    images: [ProductImage],
}, {
    // Временные метки
    timestamps: true,
});

// Так как в поле cost цена будет храниться в int, нужно виртуальное свойство,
// которое будет преобразововать цену в float
productSchema.virtual('price').
    get(function() {
        return Number.parseFloat(this.cost / 100).toFixed(2);
    }).
    set(function(price) {
        this.cost = price * 100;
    });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;