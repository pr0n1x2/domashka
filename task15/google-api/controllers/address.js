const User = require('models/user');
const googleMapsClient = require('classes/places');

const googlePage = (formData) => {
    return googleMapsClient.placesAutoComplete(formData.address)
        .then((response) => {
            if (response.json.status === 'OK') {
                const data = {addresses: []};

                for (let address of response.json.predictions) {
                    data.addresses.push({id: address.id, place_id: address.place_id, address: address.description})
                }

                return data;
            } else {
                throw new Error(googleMapsClient.getErrorByStatusCode(response.json.status));
            }
        });
};

const deletePage = (userId, formData) => {
    return User.findOneAndUpdate({_id: userId}, { $pull: { address: { _id: formData.addressId } } });
};

const currentPage = (userId, formData) => {
    return User.setUserNewCurrentAddress(userId, formData.addressId);
};

const photosPage = (userId, formData) => {
    return User.getUserAddressPhotos(userId, formData.addressId)
};

const photoPage = (formData) => {
    return googleMapsClient.placesPhoto(formData.photoreference)
        .then((response) => {
            if (response.status === 200) {
                return `https://${response.req.socket._host}${response.req.path}`;
            }

            throw new Error('Photo not found');
        });
};

module.exports.googlePage = googlePage;
module.exports.deletePage = deletePage;
module.exports.currentPage = currentPage;
module.exports.photosPage = photosPage;
module.exports.photoPage = photoPage;