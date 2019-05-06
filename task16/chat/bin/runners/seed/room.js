const Room = require('models/room');

const init = () => new Promise((resolve, reject) => {
    Room.countDocuments()
        .then((count) => {
            if (!count) {
                const rooms = [
                    {name: 'Main', namespace: 'main'},
                    {name: 'New York', namespace: 'newyork'},
                    {name: 'Los Angeles', namespace: 'losangeles'},
                    {name: 'San Francisco', namespace: 'sanfrancisco'},
                    {name: 'Las Vegas', namespace: 'lasvegas'},
                    {name: 'Miami', namespace: 'miami'}
                ];

                return Room.create(rooms);
            } else {
                return false;
            }
        })
        .then((result) => {
            if (!result) {
                console.log('Collection Room already exists');
            } else {
                console.log('The collection Room has been successfully filled with values');
            }

            resolve();
        })
        .catch((error) => {
            reject(error.message);
        });
});

module.exports = init;