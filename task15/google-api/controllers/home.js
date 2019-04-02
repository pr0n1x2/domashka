const User = require('models/user');
const Ajv = require('ajv');
const bcrypt = require('bcrypt');
const registerSchema = require('schemas/register');
const loginSchema = require('schemas/login');

const homePage = (user) => {
    return Promise.resolve(user.getCurrentAddress());
};

const registerAction = (formData) => {
    const ajv = new Ajv({verbose: true, $data: true});
    const valid = ajv.validate(registerSchema, formData);

    if (!valid) {
        const message = `${ajv.errors[0].parentSchema.description} ${ajv.errors[0].message}`;
        return Promise.reject(new Error(message));
    }

    return User.findOne({'person.email': formData.email})
        .then((user) => {
            if (user) {
                throw new Error('User with such E-mail already exists');
            }
        })
        .then(() => {
            const saltRounds = 10;
            return bcrypt.hash(formData.password, saltRounds);
        })
        .then((passwordHash) => {
            const user = new User({
                person: {
                    name: formData.name,
                    surname: formData.surname,
                    email: formData.email,
                    phone: formData.phone,
                    password: passwordHash,
                }
            });

            return user.save();
        })
};

const loginAction = (req) => {
    const formData = req.body;
    const ajv = new Ajv({verbose: true});
    const valid = ajv.validate(loginSchema, formData);
    let userID = null;

    if (!valid) {
        const message = `${ajv.errors[0].parentSchema.description} ${ajv.errors[0].message}`;
        return Promise.reject(new Error(message));
    }

    return User.findOne({'person.email': formData.email})
        .then((user) => {
            if (!user) {
                throw new Error('There is no user with such data');
            }

            userID = user.id;
            return bcrypt.compare(formData.password, user.person.password);
        })
        .then((compareResult) => {
            if (!compareResult) {
                throw new Error('You entered the wrong password');
            }

            req.session.userId = userID;
        });
};

module.exports.homePage = homePage;
module.exports.registerAction = registerAction;
module.exports.loginAction = loginAction;