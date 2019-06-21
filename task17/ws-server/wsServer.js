const Film = require('models/film');
const socketio = require('socket.io');

module.exports.init = async (server) => {
  const options = {};
  const io = socketio(server, options);

  const movies = async () => {
    const films = await Film.find({}).select('id title');
    console.log(films);
    return films;
  };

  const films = await movies();

  io.origins([
    'http://localhost:3000',
    'http://localhost:8000'
  ]);

  io.on('connection', async (socket) => {
    console.log(`connect: ${socket.id}`);

    io.sockets.emit('get films', films);

    socket.on('disconnect', (reason) => {
      console.log(`disconnect: ${socket.id} ${reason}`);
    });
  });
};