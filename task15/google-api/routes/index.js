const express = require('express');
const router = express.Router();
const homeController = require('controllers/home');
const config = require('config');

router.get('/', function(req, res, next) {
    homeController.homePage(config.get('user:id'))
        .then((currentAddress) => {
            res.render('index', { title: 'Enter Address', address: currentAddress});
        })
        .catch((error) => {
            // console.log(error.message);
            next();
        });
});

module.exports = router;