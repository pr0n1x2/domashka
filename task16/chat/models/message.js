const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    room: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    message: {
        type: Schema.Types.ObjectId,
        required: true,
    }
}, {
    timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;