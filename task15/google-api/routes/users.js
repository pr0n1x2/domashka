const express = require('express');
const router = express.Router();
const Ajv = require('ajv');
const User = require('models/user');
const addressSchema = require('schemas/address');

router.post('/address', function(req, res, next) {
    const formData = req.body;
    const ajv = new Ajv({verbose: true});
    const valid = ajv.validate(addressSchema, formData);
    const result = {status: false};

    if (!valid) {
        result.message = `${ajv.errors[0].parentSchema.description} ${ajv.errors[0].message}`;
        res.json(result);
        return;
    }

    User.findOneAndUpdate(
        {_id: '5c94e45ab8bf111308c2973f'},
        {address: formData},
        null,
        (err, user) => {
            if (!err) {
                result.status = true;
                res.json(result);
            } else {
                result.message = err;
                res.json(result);
            }
        }
    );
});

module.exports = router;
