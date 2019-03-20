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

const showUser = (user) => {
    const row = document.createElement('div');
    row.classList.add('row');
    row.dataset.item = user.id;

    row.appendChild(createColumn(user.name));
    row.appendChild(createColumn(user.birthday));
    row.appendChild(createColumn(user.age));
    row.appendChild(createColumn(user.created));

    const link = document.createElement('a');
    const lintText = document.createTextNode('remove');
    let linkAttr = document.createAttribute('href');

    linkAttr.value = 'javascript:;';
    link.setAttributeNode(linkAttr);
    link.appendChild(lintText);
    link.classList.add('remove-user');

    const actionElement = document.createElement('div');
    actionElement.appendChild(link);

    row.appendChild(actionElement);

    table.append(row);

    clearForm();
};

const createColumn = (text) => {
    const el = document.createElement('div');
    const elText = document.createTextNode(text);

    el.appendChild(elText);

    return el;
}

const showError = (message) => {
    error.innerText = message;
    error.classList.remove('error-hide');
};

const hideError = () => {
    if (!error.classList.contains('error-hide')) {
        error.classList.add('error-hide');
    }
};

const clearForm = () => {
    firstName.value = '';
    lastName.value = '';
    birthday.value = '';
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

    table.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-user')) {
            const row = event.target.parentNode.parentNode;
            const id = row.dataset.item;

            if (confirm('Are you sure you want to delete this user?')) {
                row.remove();

                const formData = {id: id};

                postData(
                    '/users/delete',
                    formData,
                    (result) => {
                        if (!result.status) {
                            showError(result.data.message);
                        }
                    },
                    showError
                );
            }
        }
    });
});