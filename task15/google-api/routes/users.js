const express = require('express');
const router = express.Router();
const userController = require('controllers/user');
const config = require('config');

router.get('/addresses', function(req, res, next) {
    userController.addressesPage(config.get('user:id'))
        .then((addresses) => {
            res.render('addresses', { title: 'My Addresses', addresses: addresses});
        })
        .catch((error) => {
            next();
        });
});

router.post('/address', function(req, res, next) {
    userController.addressPage(req.body, config.get('user:id'))
        .then((result) => {
            result.status = true;
            res.json(result);
        })
        .catch((error) => {
            res.json({status: false, message: error.message});
        })
});

module.exports = router;