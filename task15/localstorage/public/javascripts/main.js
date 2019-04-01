const storage = new MapsStorage();
let address, currentAddress, table, error;

const showAddresses = (addresses) => {
    removeTableChilds();

    for (let address of addresses) {
        let row = document.createElement('div');
        let rowText = document.createTextNode(address.address);

        row.appendChild(rowText);
        row.dataset.item = address.id;
        row.dataset.place = address.place_id;

        table.appendChild(row);
    }
};

const removeTableChilds = () => {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
};

const changeCurrentAddress = (id, address) => {
    currentAddress.dataset.item = id;
    currentAddress.innerText = address;
};

const showError = (message) => {
    error.innerText = message;
    error.classList.remove('error-hide');
    removeTableChilds();
};

const hideError = () => {
    if (!error.classList.contains('error-hide')) {
        error.classList.add('error-hide');
    }
};

window.addEventListener('load', () => {
    address = document.querySelector('input[name=address]');
    currentAddress = document.querySelector('.address');
    table = document.querySelector('.container');
    error = document.querySelector('.error');

    const currentAddressFromStorage = storage.getCurrentAddress();

    if (currentAddressFromStorage !== null) {
        changeCurrentAddress(currentAddressFromStorage.googleAddressId, currentAddressFromStorage.formattedAddress);
    }

    address.addEventListener('keyup', () => {
        if (address.value.length > 2) {
            const formData = {
                address: address.value,
            };

            hideError();

            postData(
                '/address/google',
                formData,
                (res) => {
                    if (res.status) {
                        showAddresses(res.addresses);
                    } else {
                        showError(res.message);
                    }
                },
                showError
            );
        } else {
            removeTableChilds();
        }
    });

    table.addEventListener('click', (event) => {
        const id = event.target.dataset.item;
        const place_id = event.target.dataset.place;
        const address = event.target.innerText;
        const formData = {googleId: id, placeId: place_id, address: address};

        postData(
            '/users/address',
            formData,
            (res) => {
                if (res.status) {
                    if (!storage.isAddressExists(res.address.googleAddressId)) {
                        hideError();

                        storage.addNewAddress(res.address);
                        changeCurrentAddress(res.address.googleAddressId, res.address.formattedAddress);
                    }
                    else {
                        showError('This address you have already saved');
                    }
                } else {
                    showError(res.message);
                }
            },
            showError
        );
    });
});