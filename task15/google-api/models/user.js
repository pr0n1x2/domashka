const mongoose = require('mongoose');
const Address = require('./address');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // Имя
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        trim: true,
    },
    // Фамилия
    surname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        trim: true,
    },
    // E-mail он же логин
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true,
        index: true,
        unique: true,
    },
    // Телефон
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 20,
        trim: true,
    },
    // Пароль
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 30,
    },
    // Адрес доставки
    address: [Address],
}, {
    // Временные метки
    timestamps: true,
});

userSchema.methods.isExistsAddress = function (googleAddressId) {
    for (let address of this.address) {
        if (address.googleAddressId === googleAddressId) {
            return true;
        }
    }

    return false;
};

userSchema.methods.getAllAddresses = function (sort = 1) {
    const addresses = [];

    if (sort === 1) {
        for (let i = 0; i < this.address.length; i++) {
            addresses.push(this.address[i]);
        }
    } else {
        for (let i = this.address.length - 1; i >= 0; i--) {
            addresses.push(this.address[i]);
        }
    }

    return addresses;
};

userSchema.methods.getCurrentAddress = function () {
    const currentAddress = {googleId: null, address: null};

    if (typeof(this.address) !== 'undefined') {
        for (let address of this.address) {
            if (address.isMainAddress) {
                currentAddress.googleId = address.googleAddressId;
                currentAddress.address = address.formattedAddress;
                break;
            }
        }
    }

    return currentAddress;
};

userSchema.statics.getUserCurrentAddress = function (userId) {
    return this.findById(userId)
        .then((user) => {
            return user.getCurrentAddress();
        });
};

userSchema.statics.setUserNewMainAddress = function (userId, address) {
    const clearAllMainAddresses = this.updateOne(
        {_id: userId},
        {'$set': {
                'address.$[].isMainAddress': false
            }
        });

    const setMainAddresses = this.updateOne(
        {_id: userId},
        {$push: {
                address: address
            }
        });

    return clearAllMainAddresses.exec()
        .then(() => {
            return setMainAddresses.exec()
        });
};

userSchema.statics.setUserNewCurrentAddress = function (userId, addressId) {
    console.log(addressId);
    const clearAllMainAddresses = this.updateOne(
        {_id: userId},
        {'$set': {
                'address.$[].isMainAddress': false
            }
        });

    const setNewCurrentAddress = this.updateOne(
        {userId, 'address._id': addressId},
        {$set: { "address.$.isMainAddress" : true}}
        );

    return clearAllMainAddresses.exec()
        .then(() => {
            return setNewCurrentAddress.exec()
        });
};

const User = mongoose.model('User', userSchema);

module.exports = User;