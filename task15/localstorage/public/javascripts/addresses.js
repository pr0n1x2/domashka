const storage = new MapsStorage();
let table, photosList;

const clearNode = (node) => {
    while (node.firstChild) {
        node.firstChild.remove();
    }
};

const getAddressId = (el) => {
    return el.parentNode.parentNode.parentNode.dataset.item;
};

const getAddressNode = (el) => {
    return el.parentNode.parentNode.parentNode;
};

const isCurrentAddress = (node) => {
    return node.querySelector('.current-address');
};

const showError = (message) => {
    alert(message);
};

const deleteAddress = (el) => {
    const addressId = getAddressId(el);
    const addressNode = getAddressNode(el);

    if (isCurrentAddress(addressNode) === null) {
        storage.removeAddress(addressId);
        addressNode.remove();
    } else {
        showError("You can not delete the default address.\nFirst assign another default address.");
    }
};

const changeCurrentAddress = (el) => {
    const addressId = getAddressId(el);
    const currentButtons = document.querySelectorAll('.defauls-address');

    for (let button of currentButtons) {
        if (button.classList.contains('current-address')) {
            button.classList.remove('current-address');
            break;
        }
    }

    el.classList.add('current-address');
    storage.changeCurrentAddress(addressId);
};

const showPhotoLinks = (links) => {
    const photoListEl = document.querySelector('.photos-list');
    const photoContainer = document.querySelector('div.photo');

    clearNode(photoListEl);
    clearNode(photoContainer);

    const createLink = (name, photoRef) => {
        const aEl = document.createElement('a');
        const aAttr = document.createAttribute('href');
        const aText = document.createTextNode(name);

        aAttr.value = 'javascript:;';
        aEl.appendChild(aText);
        aEl.setAttributeNode(aAttr);
        aEl.dataset.ref = photoRef;
        aEl.classList.add('photo');

        return aEl;
    }

    const createSeparator = () => {
        return document.createTextNode(' | ');
    }

    const container = document.createElement('div');

    for (let i = 0; i < links.length; i++) {
        let linkName = `Photo ${i + 1}`;
        container.appendChild(createLink(linkName, links[i]));

        if (i < links.length - 1) {
            container.appendChild(createSeparator());
        }
    }

    photoListEl.appendChild(container);
};

const showPhotosList = (el) => {
    if (el.classList.contains('current-photo')) {
        const photoListEl = document.querySelector('.photos-list');
        const photoContainer = document.querySelector('div.photo');

        clearNode(photoListEl);
        clearNode(photoContainer);

        el.classList.remove('current-photo');

        return;
    }

    const addressId = getAddressId(el);

    const photoButtons = document.querySelectorAll('.show-photos');

    for (let button of photoButtons) {
        if (button.classList.contains('current-photo')) {
            button.classList.remove('current-photo');
            break;
        }
    }

    el.classList.add('current-photo');

    const photos = storage.getPhotoLinks(addressId);

    if (photos !== false) {
        showPhotoLinks(photos);
    }
};

const placePhoto = (url) => {
    const photoContaiter = document.querySelector('div.photo');

    clearNode(photoContaiter);

    const img = document.createElement('img');
    const imgAttr = document.createAttribute('src');

    imgAttr.value = url;

    img.setAttributeNode(imgAttr);

    photoContaiter.appendChild(img);
};

const showPhoto = (el) => {
    const formData = {
        photoreference: el.dataset.ref
    };

    postData(
        '/address/photo',
        formData,
        (res) => {
            if (res.status) {
                placePhoto(res.url);
            } else {
                showError(res.message);
            }
        },
        showError
    );
};

const showAddresses = () => {
    const addresses = storage.getMyAddresses();

    if (!addresses.length) {
        return;
    }

    let addrHtml = '';

    for (let i = addresses.length - 1; i >= 0; i--) {
        addrHtml += `<div class="user-address" data-item="${addresses[i].googleAddressId}">`;
        addrHtml += `<div class="formatted-address">${addresses[i].name}<br />${addresses[i].formattedAddress}</div>`;
        addrHtml += `<div><a href="javascript:;" title="Delete address"><span class="icon delete-address"></span></a></div>`

        if (addresses[i].isMainAddress) {
            addrHtml += `<div><a href="javascript:;" title="Delete address"><span class="icon defauls-address current-address"></span></a></div>`;
        } else {
            addrHtml += `<div><a href="javascript:;" title="Delete address"><span class="icon defauls-address"></span></a></div>`;
        }

        if (typeof addresses[i].photos !== 'undefined') {
            addrHtml += `<div><a href="javascript:;" title="Show photos"><span class="icon show-photos"></span></a></div>`;
        } else {
            addrHtml += `<div></div>`;
        }

        addrHtml += `</div>`;
    }

    table.innerHTML = addrHtml;
}

window.addEventListener('load', () => {
    table = document.querySelector('.addresses');
    photosList = document.querySelector('.photos-list');

    showAddresses();

    table.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-address')) {
            deleteAddress(event.target);
        } else if (event.target.classList.contains('defauls-address')) {
            changeCurrentAddress(event.target);
        } else if (event.target.classList.contains('show-photos')) {
            showPhotosList(event.target);
        }
    });

    photosList.addEventListener('click', (event) => {
        if (event.target.classList.contains('photo')) {
            showPhoto(event.target);
        }
    });
});