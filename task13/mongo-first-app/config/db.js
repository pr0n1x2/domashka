module.exports = {
  db: {
    uri: 'mongodb://localhost:27017/firstapp',
    connect: {
      config: {
        autoIndex: false,
      },
      useNewUrlParser: true,
    },
  },
};
