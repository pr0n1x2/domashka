const register = new Auth();

window.addEventListener('load', () => {
    const emailInput = document.querySelector('input[name=email]');
    const email = register.getLogin();

    emailInput.value = email;
});