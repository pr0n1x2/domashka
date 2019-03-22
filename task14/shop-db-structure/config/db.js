module.exports = {
  db: {
    uri: 'mongodb://localhost:27017/mongo-shop',
    connect: {
      config: {
        autoIndex: false,
      },
      useNewUrlParser: true,
    },
  },
};
