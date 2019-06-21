const sessionStore = require('controllers/sessionStore');

const init = () => new Promise((resolve) => {
    sessionStore.create();
    console.log('Session Store is created');

    resolve();
});

module.exports = init;