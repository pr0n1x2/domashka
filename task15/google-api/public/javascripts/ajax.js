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