const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    // Название тега
    name:  {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 80,
        trim: true,
    },
    // Url для тега
    url: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 80,
        unique: true,
    },
    // Массив ObjectId для статей
    articles: [Schema.Types.ObjectId],
}, {
    // Временные метки
    timestamps: true,
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;