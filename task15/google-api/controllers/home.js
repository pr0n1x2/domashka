const User = require('models/user');

const homePage = (userId) => {
    return User.getUserCurrentAddress(userId)
        .then((currentAddress) => {
            return currentAddress;
        });
};

module.exports.homePage = homePage;