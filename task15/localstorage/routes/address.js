const express = require('express');
const router = express.Router();
const addressController = require('controllers/address');

router.post('/google', function(req, res, next) {
    addressController.googlePage(req.body)
        .then((result) => {
            result.status = true;
            res.json(result);
        })
        .catch((error) => {
            res.json({status: false, message: error.message});
        });
});

router.post('/photo', function(req, res, next) {
    addressController.photoPage(req.body)
        .then((url) => {
            res.json({status: true, url: url});
        })
        .catch((error) => {
            res.json({status: false, message: error.message});
        });
});

module.exports = router;