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

const deletePage = (user, formData) => {
    user.address.pull({_id: formData.addressId});
    return user.save();
};

const currentPage = (user, formData) => {
    user.setNewCurrentAddress(formData.addressId);
    return user.save();
};

const photosPage = (user, formData) => {
    return Promise.resolve(user.getAddressPhotos(formData.addressId));
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