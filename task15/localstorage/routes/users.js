const express = require('express');
const router = express.Router();
const userController = require('controllers/user');

router.get('/addresses', function(req, res, next) {
    res.render('addresses', { title: 'My Addresses' });
});

router.post('/address', function(req, res, next) {
    userController.addressPage(req.body)
        .then((address) => {
            res.json({status: true, address: address});
        })
        .catch((error) => {
            res.json({status: false, message: error.message});
        })
});

module.exports = router;