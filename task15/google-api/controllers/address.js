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
    return User.findByIdAndUpdate(userId, { $pull: { address: { _id: formData.addressId } } }, null)
        .then((user) => {
            return {message: 'Address failed to delete, refresh the page'};
        });
};

const currentPage = (userId, formData) => {
    return User.setUserNewCurrentAddress(userId, formData.addressId);
};

module.exports.googlePage = googlePage;
module.exports.deletePage = deletePage;
module.exports.currentPage = currentPage;