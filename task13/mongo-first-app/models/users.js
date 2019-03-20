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

userSchema.statics.formatDate = function (data, isUseTime = false) {
    const addZero = (number) => {
        if (number < 10) {
            number = `0${number}`;
        }

        return number;
    };

    let dateTime = data.toDateString();

    if (isUseTime) {
        dateTime += ` at ${addZero(data.getHours())}:${addZero(data.getMinutes())}`
    }

    return dateTime;
};

const User = mongoose.model('User', userSchema);

module.exports = User;