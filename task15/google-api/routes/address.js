const express = require('express');
const googleMapsClient = require('classes/places');
const User = require('models/user');
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
    const formData = req.body;
    const result = {status: false};

    User.findById('5c94e45ab8bf111308c2973f')
        .then((user) => {
            let photos = [];

            for (let address of user.address) {
                if (address.id === formData.addressId) {
                    photos = address.photos;
                }
            }

            result.status = true;
            result.photos = photos;
            res.json(result);
        });
});

router.post('/photo', function(req, res, next) {
    const formData = req.body;
    const result = {status: false};

    googleMapsClient.placesPhoto(formData.photoreference)
        .then((response) => {
            if (response.status === 200) {
                return `https://${response.req.socket._host}${response.req.path}`;
            } else {
                throw new Error('Photo not found');
            }
        })
        .then((url) => {
            result.status = true;
            result.url = url;
            res.json(result);
        })
        .catch((error) => {
            result.message = error.message;
            res.json(result);
        });
});

module.exports = router;