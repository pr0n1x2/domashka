function postData(url, data = {}, successCallback = null, errorCallback = null) {
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
        .then(response => response.json()); // parses JSON response into native Javascript objects
}

window.addEventListener('load', () => {
    const firstName = document.querySelector('input[name=firstname]');
    const lastName = document.querySelector('input[name=lastname]');
    const birthday = document.querySelector('input[name=birthday]');
    const button = document.querySelector('button');

    button.addEventListener('click', () => {
        const formData = {
            firstname: firstName.value,
            lastname: lastName.value,
            birthday: birthday.value,
        };

        postData('/users/add', formData);
    });
});