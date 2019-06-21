const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
    title: {
        type: Schema.Types.String,
    }
}, {
    timestamps: true,
});

const Film = mongoose.model('Film', filmSchema);

module.exports = Film;