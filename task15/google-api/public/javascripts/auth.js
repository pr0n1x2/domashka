const Auth = function () {
    this.fieldName = null;
    this.fieldSurname = null;
    this.fieldPhone = null;
    this.fieldEmail = null;

    this.init = () => {
        this.fieldName = document.querySelector('input[name=name]');
        this.fieldSurname = document.querySelector('input[name=surname]');
        this.fieldPhone = document.querySelector('input[name=phone]');
        this.fieldEmail = document.querySelector('input[name=email]');
    };

    this.saveForm = () => {
        const regData = {};

        if (this.fieldName !== null) {
            regData.name = this.fieldName.value;
        }

        if (this.fieldSurname !== null) {
            regData.surname = this.fieldSurname.value;
        }

        if (this.fieldPhone !== null) {
            regData.phone = this.fieldPhone.value;
        }

        if (this.fieldEmail !== null) {
            regData.email = this.fieldEmail.value;
        }

        localStorage.setItem('register', JSON.stringify(regData));
    };

    this.fillForm = () => {
        const regData = JSON.parse(localStorage.getItem('register'));

        if (regData !== null) {
            if (typeof regData.name !== 'undefined' && this.fieldName !== null) {
                this.fieldName.value = regData.name;
            }

            if (typeof regData.surname !== 'undefined' && this.fieldSurname !== null) {
                this.fieldSurname.value = regData.surname;
            }

            if (typeof regData.phone !== 'undefined' && this.fieldPhone !== null) {
                this.fieldPhone.value = regData.phone;
            }

            if (typeof regData.email !== 'undefined' && this.fieldEmail !== null) {
                this.fieldEmail.value = regData.email;
            }
        }
    };

    this.clearStorage = () => {
        this.saveLogin();
        localStorage.removeItem('register');
    };

    this.saveLogin = () => {
        const regData = JSON.parse(localStorage.getItem('register'));

        if (regData !== null) {
            if (typeof regData.email !== 'undefined') {
                localStorage.setItem('authLogin', regData.email);
            }
        }
    };

    this.getLogin = () => {
        return localStorage.getItem('authLogin');
    }
};