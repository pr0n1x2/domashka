const express = require('express');
const router = express.Router();
const userController = require('controllers/user');

router.get('/addresses', function(req, res, next) {
    userController.addressesPage(req.user)
        .then((addresses) => {
            res.render('addresses', { title: 'My Addresses', addresses: addresses});
        })
        .catch((error) => {
            next();
        });
});

router.post('/address', function(req, res, next) {
    userController.addressPage(req.body, req.user)
        .then((result) => {
            result.status = true;
            res.json(result);
        })
        .catch((error) => {
            res.json({status: false, message: error.message});
        })
});

module.exports = router;