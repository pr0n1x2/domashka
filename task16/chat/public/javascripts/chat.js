document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('#logout');

    const socket = io();

    logoutButton.addEventListener('click', () => {
        window.location.href = '/logout';
    });

    socket.on('connect', function() {
        // let searchQuery = window.location.search.substring(1);
        // let params = JSON.parse('{"' + decodeURI(searchQuery).replace(/&/g, '","').replace(/\+/g, ' ').replace(/=/g,'":"') + '"}');

        // socket.emit('join', params, function(err) {
        socket.emit('join', function(err) {
            if (err) {
                alert(err);
                window.location.href = '/';
            } else {
                console.log('No Error');
            }
        });
    });
});