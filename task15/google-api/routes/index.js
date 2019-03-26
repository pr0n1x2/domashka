const express = require('express');
const router = express.Router();
const User = require('models/user');

router.get('/', function(req, res, next) {
  User.findById('5c94e45ab8bf111308c2973f', function (err, user) {
    const currentAddress = {googleId: null, address: null};

    if (typeof(user.address) !== "undefined") {
      currentAddress.googleId = user.address.googleId;
      currentAddress.address = user.address.address;
    }

    res.render('index', { title: 'Enter Address', address: currentAddress});
  });
});

module.exports = router;
