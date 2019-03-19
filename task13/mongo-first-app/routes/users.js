const express = require('express');
const router = express.Router();
const Ajv = require('ajv');
const userSchema = require('schemas/user');
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
              birthday: newUser.birthday,
              age: newUser.getAge(),
              created: newUser.createdAt
          };

          res.json(result);
      })
      .catch(() => {
          result.data = {message: 'An error has occurred, the data has not been saved'};
          res.json(result);
      });
});

module.exports = router;
