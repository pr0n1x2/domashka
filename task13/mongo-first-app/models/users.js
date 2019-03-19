const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname:  {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    birthday: {
        type: Date,
    },
}, {
    timestamps: true,
});

userSchema.virtual('fullname').get(function () {
    return `${this.firstname} ${this.lastname}`;
});

userSchema.methods.getAge = function () {
    const today = new Date();
    const month = today.getMonth() - this.birthday.getMonth();
    let age = today.getFullYear() - this.birthday.getFullYear();

    if (month < 0 || (month === 0 && today.getDate() < this.birthday.getDate())) {
        age--;
    }

    return age;
};

const User = mongoose.model('User', userSchema);

module.exports = User;