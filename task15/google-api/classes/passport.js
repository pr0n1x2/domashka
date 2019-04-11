const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('models/user');
const Ajv = require('ajv');
const bcrypt = require('bcrypt');
const loginSchema = require('schemas/login');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'email'
}, (email, password, done) => {
    const formData = {
        email: email,
        password: password
    };

    const ajv = new Ajv({verbose: true});
    const valid = ajv.validate(loginSchema, formData);

    if (!valid) {
        const message = `${ajv.errors[0].parentSchema.description} ${ajv.errors[0].message}`;
        return done(null, false, { message: message });
    }

    let currentUser;

    User.findOne({'person.email': email})
        .then((user) => {
            if (!user) {
                throw new Error('There is no user with such data');
            }

            currentUser = user;
            return bcrypt.compare(formData.password, user.person.password);
        })
        .then((compareResult) => {
            if (!compareResult) {
                throw new Error('You entered the wrong password');
            }

            return done(null, currentUser);
        })
        .catch((error) => {
            return done(null, false, { message: error.message });
        });
}));

passport.use(new FacebookStrategy({
    clientID: '641941716245607',
    clientSecret: 'c93bc9b8fc86e6e0fc4eb966c91f1322',
    callbackURL: 'http://localhost:8000/auth/facebook/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log('YES');
    console.log(accessToken, refreshToken, profile);
}));