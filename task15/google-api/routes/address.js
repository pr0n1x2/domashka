const express = require('express');
const GooglePlaces = require('classes/places');
const router = express.Router();

router.post('/google', function(req, res, next) {
    const formData = req.body;
    const googleMapsClient = new GooglePlaces();

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

module.exports = router;