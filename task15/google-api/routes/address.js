const express = require('express');
const googleMapsClient = require('classes/places');
const User = require('models/user');
const router = express.Router();

router.post('/google', function(req, res, next) {
    const formData = req.body;

    googleMapsClient.placesAutoComplete(formData.address)
        .then((response) => {
            if (response.json.status === 'OK') {
                const data = {status: true, addresses: []};

                for (let address of response.json.predictions) {
                    data.addresses.push({id: address.id, place_id: address.place_id, address: address.description})
                }

                return data;
            } else {
                throw new Error(googleMapsClient.getErrorByStatusCode(response.json.status));
            }
        })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({status: false, message: error.message});
        });
});

router.post('/delete', function(req, res, next) {
    const formData = req.body;
    const result = {status: false};

    User.findByIdAndUpdate(
        '5c94e45ab8bf111308c2973f',
        { $pull: { address: { _id: formData.addressId } } },
        null,
        (err, user) => {
            if (!err) {
                result.status = true;
            } else {
                result.message = 'Address failed to delete, refresh the page';
            }

            res.json(result);
        }
    );
});

router.post('/current', function(req, res, next) {
    const formData = req.body;
    const result = {status: false};

    User.updateOne({
        _id: '5c94e45ab8bf111308c2973f'
    }, {
        '$set': {
            'address.$[].isMainAddress': false
        }
    }).then(() => {
        User.updateOne({
            _id: '5c94e45ab8bf111308c2973f',
            'address._id': formData.addressId
        }, {
            $set: { "address.$.isMainAddress" : true }
        }).then(() => {
            result.status = true;
            res.json(result);
        });
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