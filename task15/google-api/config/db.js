module.exports = {
  db: {
    uri: 'mongodb://localhost:27017/googleapi',
    connect: {
      config: {
        autoIndex: false,
      },
      useNewUrlParser: true,
    },
  },
};
