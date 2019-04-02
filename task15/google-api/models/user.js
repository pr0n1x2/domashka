const mongoose = require('mongoose');
const Person = require('./person');
const Address = require('./address');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // Персона
    person: Person,
    // Адрес доставки
    address: [Address],
}, {
    // Временные метки
    timestamps: true,
});

userSchema.virtual('fullName').get(function () {
    return `${this.person.name} ${this.person.surname}`;
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

userSchema.methods.getAddressPhotos = function (addressId) {
    let photos = [];

    for (let address of this.address) {
        if (address.id === addressId) {
            photos = address.photos;
            break;
        }
    }

    return photos;
};

userSchema.methods.clearAllMainAddresses = function () {
    for (let address of this.address) {
        if (address.isMainAddress === true) {
            address.isMainAddress = false;
        }
    }
};

userSchema.methods.setNewCurrentAddress = function (addressId) {
    this.clearAllMainAddresses();

    for (let address of this.address) {
        if (address.id === addressId) {
            address.isMainAddress = true;
        }
    }
}

userSchema.statics.getUserCurrentAddress = function (userId) {
    return this.findById(userId)
        .then((user) => {
            return user.getCurrentAddress();
        });
};

userSchema.statics.getUserAddressPhotos = function (userId, addressId) {
    return this.findById(userId)
        .then((user) => {
            return user.getAddressPhotos(addressId);
        });
};

// userSchema.statics.setUserNewMainAddress = function (userId, address) {
//     const clearAllMainAddresses = this.updateOne(
//         {_id: userId},
//         {'$set': {
//                 'address.$[].isMainAddress': false
//             }
//         });
//
//     const setMainAddresses = this.updateOne(
//         {_id: userId},
//         {$push: {
//                 address: address
//             }
//         });
//
//     return clearAllMainAddresses.exec()
//         .then(() => {
//             return setMainAddresses.exec()
//         });
// };

// userSchema.statics.setUserNewCurrentAddress = function (userId, addressId) {
//     const clearAllMainAddresses = this.updateOne(
//         {_id: userId},
//         {'$set': {
//                 'address.$[].isMainAddress': false
//             }
//         });
//
//     const setNewCurrentAddress = this.updateOne(
//         {_id: userId, 'address._id': addressId},
//         {$set: { "address.$.isMainAddress" : true}}
//         );
//
//     return clearAllMainAddresses.exec()
//         .then(() => {
//             return setNewCurrentAddress.exec()
//         });
// };

const User = mongoose.model('User', userSchema);

module.exports = User;