const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    // Название статьи
    name:  {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true,
    },
    // Сама статья
    text: {
        type: String,
        required: true,
    },
    // Url для статьи
    url: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 180,
        unique: true,
    },
    // Счетчик просмотров статьи
    views: {
        type: Number,
        default: 0,
    },
    // Массив ObjectId для тегов
    tags: [Schema.Types.ObjectId],
}, {
    // Временные метки
    timestamps: true,
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;