const MapsClient = require('@google/maps');

const GooglePlaces = function () {
    this.API_KEY = 'AIzaSyBewlIjuU9RCmaAa2JgAKXN42TCnEV_Yp8';
    this.SESSION_TOKEN = 'randomstr';

    this.googleMapsClient = MapsClient.createClient({
        key: this.API_KEY,
        Promise: Promise
    });

    this.placesAutoComplete = (input) => {
        return this.googleMapsClient.placesAutoComplete({
            input: input,
            sessiontoken: this.SESSION_TOKEN, // Не знаю, что сюда передавать!!!
            language: 'uk',
        }).asPromise();
    };

    this.placeDetails = (placeId) => {
        return this.googleMapsClient.place({
            placeid: placeId,
            language: 'uk',
        }).asPromise();
    };

    this.placesPhoto = (photoreference) => {
        return this.googleMapsClient.placesPhoto({
            photoreference: photoreference,
            maxwidth: 500,
        }).asPromise();
    };

    this.getErrorByStatusCode = (code) => {
        let message;

        switch (code) {
            case 'ZERO_RESULTS':
                message = 'No matches were found';
                break;
            case 'OVER_QUERY_LIMIT':
                message = 'You have exceeded your quota';
                break;
            case 'REQUEST_DENIED':
                message = 'Your request has been denied';
                break;
            case 'INVALID_REQUEST':
                message = 'The request to the server is incorrect';
                break;
            default:
                message = 'Unknown error';
                break;
        }

        return message;
    }
};

module.exports = GooglePlaces;