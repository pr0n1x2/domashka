module.exports = {
    session: {
        name: 'sid',
        lifetime: 1000 * 60 * 60 * 2, // Two hours
        secret: 'G8:p2*:.t#$bY%LF',
        in_prod: false
    }
};
