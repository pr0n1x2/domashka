const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    googleId: {
        type: String,
    },
    address: {
        type: String,
        trim: true,
    },
}, {
    _id : false
});

module.exports = addressSchema;