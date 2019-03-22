const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productImageSchema = new Schema({
    // Имя файла картинки
    filename:  {
        type: String,
        required: true,
        maxlength: 255,
        trim: true,
    },
    // Альтернативный текст
    alt: {
        type: String,
        maxlength: 255,
        default: null,
        trim: true,
    },
    // Метка для основной картинки
    main: {
        type: Boolean,
        default: false,
    }
}, {
    // Временные метки
    timestamps: true,
});

module.exports = productImageSchema;