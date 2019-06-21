const Room = require('models/room');

const homeView = async (req, res, next) => {
    const rooms = await Room.find({});
    res.render('index', {title: 'Chat', rooms: rooms, data: {}, error: false});
};

module.exports.homeView = homeView;