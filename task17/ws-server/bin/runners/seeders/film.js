const Film = require('models/film');

const init = () => new Promise((resolve, reject) => {
    Film.countDocuments()
        .then((count) => {
            if (!count) {
                const films = [
                    {title: 'A New Hope'},
                    {title: 'Attack of the Clones'},
                    {title: 'The Phantom Menace'},
                    {title: 'Revenge of the Sith'},
                    {title: 'Return of the Jedi'},
                    {title: 'The Empire Strikes Back'},
                    {title: 'The Force Awakens'},
                ];

                return Film.create(films);
            } else {
                return false;
            }
        })
        .then((result) => {
            if (!result) {
                console.log('Collection Film already exists');
            } else {
                console.log('The collection Film has been successfully filled with values');
            }

            resolve();
        })
        .catch((error) => {
            reject(error.message);
        });
});

module.exports = init;