const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    namespace: {
        type: String,
        required: true,
    },
    user: [mongoose.Schema.ObjectId]
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;