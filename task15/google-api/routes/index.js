const express = require('express');
const router = express.Router();
const homeController = require('controllers/home');
const config = require('config');

router.get('/', function(req, res, next) {
    homeController.homePage(res.locals.user)
        .then((currentAddress) => {
            res.render('index', { title: 'Enter Address', address: currentAddress});
        })
        .catch((error) => {
            // console.log(error.message);
            next();
        });
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Registration', error: null });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Authorization', error: null });
});

router.get('/logout', function(req, res, next) {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }

        res.clearCookie(config.get('session:name'));
        res.redirect('/login');
    });
});

router.post('/register', function(req, res, next) {
    homeController.registerAction(req.body)
        .then((user) => {
            res.render('successful', { title: 'Registration completed', message: `${user.fullName} you are successfully registered ` });
        })
        .catch((error) => {
            res.render('register', { title: 'Registration', error: error.message });
        });
});

router.post('/login', function(req, res, next) {
    homeController.loginAction(req)
        .then(() => {
            res.redirect('/');
        })
        .catch((error) => {
            res.render('login', { title: 'Authorization', error: error.message });
        });
});

module.exports = router;