const express = require('express');
const router = express.Router();
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBewlIjuU9RCmaAa2JgAKXN42TCnEV_Yp8',
    Promise: Promise
});

router.post('/google', function(req, res, next) {
    const formData = req.body;

    googleMapsClient.placesAutoComplete({
        input: formData.address,
        sessiontoken: 'dfbgsedtw4t3425sdfgsdg', // Не знаю, что сюда передавать!!!
        language: 'uk',
        types: 'address',
    })
        .asPromise()
        .then((response) => {
            if (response.json.status === 'OK' && response.json.predictions.length > 0) {
                const data = {status: true, addresses: []};

                for (let address of response.json.predictions) {
                    data.addresses.push({id: address.id, address: address.description})
                }

                return data;
            } else {
                throw new Error('No matches were found');
            }
        })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            if (!error.length) {
                error = 'No matches were found';
            }

            res.json({status: false, message: error});
        });
});

module.exports = router;