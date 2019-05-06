const express = require('express');
const router = express.Router();
const sessionStore = require('controllers/sessionStore');

router.get('/', function(req, res, next) {
    res.render('chat', { title: 'Express' });
});

module.exports = router;