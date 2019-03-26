const User = require('models/user');

const Seeder = function () {
    this.seed = () => {
        const users = [{
            _id: '5c94e45ab8bf111308c2973f',
            name: 'Сергей',
            surname: 'Федоренко',
            email: 'fedorenkos@dayrep.com',
            phone: '067-230-34-12',
            password: 'R!DX$HChD59Jqy=K',
        }];

        for (user of users) {
            User.create(user);
        }
    };
};

module.exports = Seeder;