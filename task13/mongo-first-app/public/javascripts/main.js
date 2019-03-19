let firstName, lastName, birthday, button, table, error;

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
            successCallback(record);
        })
        .catch((error) => {
            errorCallback(error);
        });
};

const showUser = (user) => {
    const created = new Date(user.created);
    const row = document.createElement('div');
    row.classList.add('row');
    row.dataset.item = user.id;


    row.appendChild(createColumn(user.name));
    row.appendChild(createColumn((new Date(user.birthday)).toDateString()));
    row.appendChild(createColumn(user.age));
    row.appendChild(createColumn(`${created.toDateString()} ${addZero(created.getHours())}:${addZero(created.getMinutes())}`));

    table.append(row);
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

const createColumn = (text) => {
    const el = document.createElement('div');
    const elText = document.createTextNode(text);

    el.appendChild(elText);

    return el;
}

const addZero = (number) => {
    if (number < 10) {
        number = `0${number}`;
    }

    return number;
};

window.addEventListener('load', () => {
    firstName = document.querySelector('input[name=firstname]');
    lastName = document.querySelector('input[name=lastname]');
    birthday = document.querySelector('input[name=birthday]');
    button = document.querySelector('button');
    table = document.querySelector('.container');
    error = document.querySelector('.error');

    button.addEventListener('click', () => {
        const formData = {
            firstname: firstName.value,
            lastname: lastName.value,
            birthday: birthday.value,
        };

        hideError();

        postData(
            '/users/add',
            formData,
            (record) => {
                if (record.status) {
                    showUser(record.data);
                } else {
                    showError(record.data.message);
                }
            },
            showError
        );
    });
});