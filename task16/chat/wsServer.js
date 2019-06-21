const { logger } = require('logger');
const socketio = require('socket.io');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const sessionStore = require('controllers/sessionStore');
const config = require('config');
const MemoryStore = require('node_modules/express-session/session/memory');
const session_store = new MemoryStore();

module.exports.init = async (server) => {
  const options = {};

  const io = socketio(server, options);
  // io.origins(['http://localhost:3000']);

  io.on('connection', (socket) => {

    // console.log(sessionStore.getStore().ids(function (all) {
    //   console.log(all);
    // }));
    // sessionStore.all(function (array) {
    //   console.log(array);
    // });


    console.log(`connect: ${socket.id}`);

    socket.on('join', (callback) => {
      // if(!isRealString(params.name) || !isRealString(params.room)){
      //   return callback('Name and room are required');
      // }

      // socket.join(params.room);
      // users.removeUser(socket.id);
      // users.addUser(socket.id, params.name, params.room);
      //
      // io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
      // socket.emit('newMessage', generateMessage('Admin', `Welocome to ${params.room}!`));
      //
      // socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', "New User Joined!"));
      // const cookies = cookieParser.signedCookie('sid=s%3A24mVNlMf4Ticit8IO-2YdVnE6_tiNI22.AgxlaKYyESXH2fEl%2FKvtM4huX7FT%2FgD3vx8Xa7Qu3G4', config.get('session:secret'));
      const cookiesObject = cookie.parse(socket.request.headers.cookie);
      const cookies = cookieParser.signedCookies(cookiesObject, config.get('session:secret'));

      // console.log(cookies.sid);
      session_store.get(cookies.sid,function (error, results) {
        console.log(cookies.sid, error, results);
      });
    });

    socket.on('disconnect', (reason) => {
      console.log(`disconnect: ${socket.id} ${reason}`);
    });
  });
};