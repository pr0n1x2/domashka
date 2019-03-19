const express = require('express');
const router = express.Router();
const Ajv = require('ajv');
const userSchema = require('schemas/user');
const User = require('models/users');

router.post('/add', function(req, res, next) {
  const formData = req.body;
  const ajv = new Ajv({verbose: true});
  const valid = ajv.validate(userSchema, formData);
  const result = {status: true};

  if (!valid) {
      result.status = false;
      result.data = {message: `${ajv.errors[0].parentSchema.description} ${ajv.errors[0].message}`};
  } else {
      User.create(formData, (err, newUser) => {
          if (err) {
              result.status = false;
              result.data = {message: err};
              return;
          }

          result.data = {
              id: newUser._id,
              name: newUser.fullname,
              birthday: newUser.birthday,
              age: newUser.getAge(),
              created: newUser.createdAt
          };
      });
  }

  res.json(result);
});

module.exports = router;
