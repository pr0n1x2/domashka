const MapsStorage = function () {
    this.ADDRESSES_KEY = 'addresses';

    this.addNewAddress = (newAddress) => {
        let addresses = this.getObject(this.ADDRESSES_KEY);

        addresses = this.clearMainAddress(addresses);
        newAddress.isMainAddress = true;
        addresses.push(newAddress);

        this.setObject(this.ADDRESSES_KEY, addresses);
    };

    this.clearMainAddress = (addresses) => {
        for (let i = 0; i < addresses.length; i++) {
            if (addresses[i].isMainAddress == true) {
                addresses[i].isMainAddress = false;
            }
        }

        return addresses;
    };

    this.isAddressExists = (addressId) => {
        const addresses = this.getObject(this.ADDRESSES_KEY);

        for (let i = 0; i < addresses.length; i++) {
            if (addressId == addresses[i].googleAddressId) {
                return true;
            }
        }

        return false;
    };

    this.getCurrentAddress = () => {
        const addresses = this.getObject(this.ADDRESSES_KEY);

        for (let i = 0; i < addresses.length; i++) {
            if (addresses[i].isMainAddress == true) {
                return addresses[i];
            }
        }

        return null;
    };

    this.changeCurrentAddress = (addressId) => {
        let addresses = this.getObject(this.ADDRESSES_KEY);

        addresses = this.clearMainAddress(addresses);

        for (let i = 0; i < addresses.length; i++) {
            if (addressId == addresses[i].googleAddressId) {
                addresses[i].isMainAddress = true;
            }
        }

        this.setObject(this.ADDRESSES_KEY, addresses);
    };

    this.getMyAddresses = () => {
        return this.getObject(this.ADDRESSES_KEY);
    };

    this.removeAddress = (addressId) => {
        let addresses = this.getObject(this.ADDRESSES_KEY);

        for (let i = 0; i < addresses.length; i++) {
            if (addressId == addresses[i].googleAddressId) {
                addresses.splice(i, 1);
                this.setObject(this.ADDRESSES_KEY, addresses);
            }
        }
    };

    this.getPhotoLinks = (addressId) => {
        let addresses = this.getObject(this.ADDRESSES_KEY);

        for (let i = 0; i < addresses.length; i++) {
            if (addressId == addresses[i].googleAddressId) {
                return addresses[i].photos;
            }
        }

        return false;
    };

    this.setObject = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    this.getObject = (key) => {
        const data = localStorage.getItem(key);

        if (data !== null) {
            return JSON.parse(data);
        }

        return [];
    };
};