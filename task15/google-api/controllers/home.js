const User = require('models/user');

const getCurrentUserAddress = (userId) => {
    return User.findById(userId)
        .then((user) => {
            const currentAddress = {googleId: null, address: null};

            if (typeof(user.address) !== 'undefined') {
                for (let address of user.address) {
                    if (address.isMainAddress) {
                        currentAddress.googleId = address.googleAddressId;
                        currentAddress.address = address.formattedAddress;
                        break;
                    }
                }
            }

            return currentAddress;
        });
};

module.exports.getCurrentUserAddress = getCurrentUserAddress;