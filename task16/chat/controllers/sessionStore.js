const session = require('express-session');
const MemoryStore = require('memorystore')(session);

let sessionStore;

const create = () => {
    if (!sessionStore) {
        sessionStore = new MemoryStore({
            checkPeriod: 86400000
        });
    }
};

const getStore = () => {
    return sessionStore;
};

module.exports.create = create;
module.exports.getStore = getStore;

