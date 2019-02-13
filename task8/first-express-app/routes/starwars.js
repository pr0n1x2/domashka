var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('starwars', { title: 'StarWars' });
});

module.exports = router;
