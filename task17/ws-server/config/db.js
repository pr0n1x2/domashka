module.exports = {
  db: {
    uri: 'mongodb://localhost:27017/starwars',
    connect: {
      config: {
        autoIndex: false,
      },
      useNewUrlParser: true,
    },
  },
};
