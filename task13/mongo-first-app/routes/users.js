const express = require('express');
const router = express.Router();
const Ajv = require('ajv');
const userSchema = require('schemas/user');
const idSchema = require('schemas/id');
const User = require('models/users');

router.post('/add', function(req, res, next) {
    const formData = req.body;
    const ajv = new Ajv({verbose: true});
    const valid = ajv.validate(userSchema, formData);
    const result = {status: false};

    if (!valid) {
      result.data = {message: `${ajv.errors[0].parentSchema.description} ${ajv.errors[0].message}`};
      res.json(result);
      return;
    }

    User.create(formData)
      .then((newUser) => {
          result.status = true;

          result.data = {
              id: newUser._id,
              name: newUser.fullname,
              birthday: User.formatDate(newUser.birthday),
              age: newUser.getAge(),
              created: User.formatDate(newUser.createdAt, true)
          };

          res.json(result);
      })
      .catch(() => {
          result.data = {message: 'An error has occurred, the data has not been saved'};
          res.json(result);
      });
});

router.post('/delete', function(req, res, next) {
    const formData = req.body;
    const ajv = new Ajv({verbose: true});
    const valid = ajv.validate(idSchema, formData);
    const result = {status: false};

    if (!valid) {
        result.data = {message: 'ID value passed invalid'};
        res.json(result);
        return;
    }

    User.remove({ _id: formData.id }, (err) => {
        if (err !== null) {
            result.status = true;
            res.json(result);
        } else {
            result.data = {message: err};
            res.json(result);
        }
    });
});

module.exports = router;
