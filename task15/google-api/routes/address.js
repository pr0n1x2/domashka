const express = require('express');
const router = express.Router();
const addressController = require('controllers/address');
const config = require('config')

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

router.post('/delete', function(req, res, next) {
    addressController.deletePage(config.get('user:id'), req.body)
        .then((result) => {
            result.status = true;
            res.json(result);
        })
        .catch((error) => {
            res.json({status: false, message: error.message});
        });
});

router.post('/current', function(req, res, next) {
    addressController.currentPage(config.get('user:id'), req.body)
        .then(() => {
            res.json({status: true});
        })
        .catch((error) => {
            res.json({status: false, message: error.message});
        });
});

router.post('/photos', function(req, res, next) {
    addressController.photosPage(config.get('user:id'), req.body)
        .then((photos) => {
            res.json({status: true, photos: photos});
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