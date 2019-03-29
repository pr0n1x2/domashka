const User = require('models/user');
const config = require('config');

const init = () => new Promise((resolve, reject) => {
    User.countDocuments()
        .then((count) => {
            if (!count) {
                const user = new User({
                    _id: config.get('user:id'),
                    name: 'Сергей',
                    surname: 'Федоренко',
                    email: 'fedorenkos@dayrep.com',
                    phone: '067-230-34-12',
                    password: 'R!DX$HChD59Jqy=K',
                });

                return user.save();
            } else {
                return false;
            }
        })
        .then((user) => {
            if (!user) {
                console.log('Database not empty');
            } else {
                console.log('Database filled with test data');
            }

            resolve();
        })
        .catch((error) => {
            reject(error.message);
        });
});

module.exports = init;