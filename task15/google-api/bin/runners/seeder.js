const User = require('models/user');
const config = require('config');

const init = () => new Promise((resolve, reject) => {
    User.countDocuments()
        .then((count) => {
            if (!count) {
                const user = new User({
                    _id: config.get('user:id'),
                    person: {
                        name: 'Roger',
                        surname: 'Berkman',
                        email: 'rogerberkman@dayrep.com',
                        phone: '(067) 230-34-12',
                        password: '$2b$10$sb47Zx0.VwyiQatMSZW/G.aUa4ez3QJAklzm380H8xnQay2EmFozm', // 123456
                    }
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