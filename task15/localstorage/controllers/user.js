const Ajv = require('ajv');
const addressSchema = require('schemas/address');
const placeSchema = require('schemas/place');
const googleMapsClient = require('classes/places');

const addressPage = (formData) => {
    const ajv = new Ajv({verbose: true});
    const valid = ajv.validate(addressSchema, formData);

    if (!valid) {
        const message = `${ajv.errors[0].parentSchema.description} ${ajv.errors[0].message}`;
        return Promise.reject(new Error(message));
    }

    return googleMapsClient.placeDetails(formData.placeId)
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
        .then((newAddress) => {
            const valid = ajv.validate(placeSchema, newAddress);

            if (!valid) {
                throw new Error(`${ajv.errors[0].parentSchema.description} ${ajv.errors[0].message}`);
            }

            return newAddress;
        });
};

module.exports.addressPage = addressPage;