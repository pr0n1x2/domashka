module.exports = {
  db: {
    uri: 'mongodb://localhost:27017/chat',
    connect: {
      config: {
        autoIndex: false,
      },
      useNewUrlParser: true,
    },
  },
};
