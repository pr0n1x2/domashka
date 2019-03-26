const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    googleAddressId: {
        type: String,
        required: true,
    },
    googlePlaceId: {
        type: String,
        required: true,
    },
    formattedAddress: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    photos: [],
    isMainAddress: {
        type: Boolean,
        default: true,
    }
});

module.exports = addressSchema;