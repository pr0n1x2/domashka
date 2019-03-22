const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    // Город (предполагается, что все города принадлежат Украине)
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    // Улица
    street: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    // Дом
    house: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30,
    },
    // Индекс
    zip: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 5,
    }
}, {
    _id : false
});

module.exports = addressSchema;