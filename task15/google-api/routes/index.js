const express = require('express');
const router = express.Router();
const homeController = require('controllers/home');
const config = require('config');
const passport = require('passport');
const passportConf = require('classes/passport');

const passportSignIn = passport.authenticate('local', {
    session: true,
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
});

router.get('/', function(req, res, next) {
    homeController.homePage(req.user)
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

router.post('/register', function(req, res, next) {
    homeController.registerAction(req.body)
        .then((user) => {
            res.render('successful', { title: 'Registration completed', message: `${user.fullName} you are successfully registered ` });
        })
        .catch((error) => {
            res.render('register', { title: 'Registration', error: error.message });
        });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Authorization', error: req.flash('error') });
});

router.post('/login', passportSignIn);

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/login');
});

module.exports = router;