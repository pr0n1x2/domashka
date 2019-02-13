var express = require('express');
var router = express.Router();
var needle = require('needle');

/* GET home page. */
router.get('/', function(req, res, next) {
    needle('get', 'https://swapi.co/api/people/1/')
        .then((response) => {
            const content = typeof response.body === 'string' ? response.body : JSON.stringify(response.body);
            res.send(content);
        })
        .catch((error) => {
            res.send(error);
        });
});

module.exports = router;