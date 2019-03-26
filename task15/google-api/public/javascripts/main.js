let address, currentAddress, table, error;

const postData = (url, data = {}, successCallback = null, errorCallback = null) => {
    return fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Could not connect to server');
            }

            return response.json();
        })
        .then((record) => {
            if (successCallback !== null) {
                successCallback(record);
            }
        })
        .catch((error) => {
            if (errorCallback !== null) {
                errorCallback(error);
            }
        });
};

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
};

const hideError = () => {
    if (!error.classList.contains('error-hide')) {
        error.classList.add('error-hide');
    }
};

const isAddressExists = (id) => {
    const currentId = currentAddress.dataset.item;
    return currentId === id;
};

window.addEventListener('load', () => {
    address = document.querySelector('input[name=address]');
    currentAddress = document.querySelector('.address');
    table = document.querySelector('.container');
    error = document.querySelector('.error');

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

        if (!isAddressExists(id)) {
            changeCurrentAddress(id, address);
            hideError();

            postData(
                '/users/address',
                formData,
                (res) => {
                    if (!res.status) {
                        showError(res.message);
                    }
                },
                showError
            );
        } else {
            showError('This address you have already saved');
        }
    });
});