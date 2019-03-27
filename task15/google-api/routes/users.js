const express = require('express');
const router = express.Router();
const Ajv = require('ajv');
const User = require('models/user');
const GooglePlaces = require('classes/places');
const addressSchema = require('schemas/address');
const placeSchema = require('schemas/place');

router.get('/addresses', function(req, res, next) {
    User.findById('5c94e45ab8bf111308c2973f').exec(function (err, user) {
        const addresses = [];

        for (let i = user.address.length - 1; i >= 0; i--) {
            addresses.push(user.address[i]);
        }

        res.render('addresses', { title: 'My Addresses', addresses: addresses});
    });
});

router.post('/address', function(req, res, next) {
    const formData = req.body;
    const googleMapsClient = new GooglePlaces();
    const ajv = new Ajv({verbose: true});
    const valid = ajv.validate(addressSchema, formData);
    const result = {status: false};

    if (!valid) {
        result.message = `${ajv.errors[0].parentSchema.description} ${ajv.errors[0].message}`;
        res.json(result);
        return;
    }

    User.findById('5c94e45ab8bf111308c2973f')
        .then((user) => {
            for (let address of user.address) {
                if (address.googleAddressId === formData.googleId) {
                    throw new Error('This address you have already saved');
                }
            }
        })
        .then(() => {
            return googleMapsClient.placeDetails(formData.placeId);
        })
        .then((response) => {
            if (response.json.status === 'OK') {
                const userAddress = {
                    googleAddressId: formData.googleId,
                    googlePlaceId: formData.placeId,
                };

                if (typeof(response.json.result.formatted_address) !== 'undefined') {
                    userAddress.formattedAddress = response.json.result.formatted_address;
                }

                if (typeof(response.json.result.name) !== 'undefined') {
                    userAddress.name = response.json.result.name;
                }

                if (typeof(response.json.result.photos) !== 'undefined') {
                    userAddress.photos = [];

                    for (let photo of response.json.result.photos) {
                        userAddress.photos.push(photo.photo_reference);
                    }
                }

                return userAddress;
            } else {
                throw new Error(googleMapsClient.getErrorByStatusCode(response.json.status));
            }
        })
        .then((place) => {
            const valid = ajv.validate(placeSchema, place);

            if (!valid) {
                throw new Error(`${ajv.errors[0].parentSchema.description} ${ajv.errors[0].message}`);
            }

            return place;
        })
        .then((place) => {
            User.update({
                _id: '5c94e45ab8bf111308c2973f'
            }, {
                '$set': {
                    'address.$[].isMainAddress': false
                }
            }).then(() => {
                User.update({
                    _id: '5c94e45ab8bf111308c2973f'
                }, {
                    $push: {
                        address: place
                    }
                }).then(() => {
                    result.status = true;
                    result.googleId = place.googleAddressId;
                    result.address = place.formattedAddress;
                    res.json(result);
                });
            });
        })
        .catch((error) => {
            res.json({status: false, message: error.message});
        });
});

module.exports = router;
