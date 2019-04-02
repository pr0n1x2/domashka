const register = new Auth();

window.addEventListener('load', () => {
    const form = document.querySelector('form');

    register.init();
    register.fillForm();

    form.addEventListener('submit', () => {
        register.saveForm();
    });
});