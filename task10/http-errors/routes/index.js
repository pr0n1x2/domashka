var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  console.log(req.body);
  next();
});

router.all('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
