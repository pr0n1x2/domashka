const express = require('express');
const router = express.Router();
const User = require('models/users');

router.get('/', function(req, res, next) {
  User.find({}).sort({createdAt: 1}).exec(function(err, users) {
    if (err === null) {
      res.render('index', { title: 'Express', users: users, User: User});
    } else {
      res.render('index', { title: 'Express', users: []});
    }
  });
});

module.exports = router;
