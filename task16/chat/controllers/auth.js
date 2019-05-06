const User = require('models/user');
const Room = require('models/room');
const authJsonSchema = require('schemes/auth');
const Ajv = require('ajv');
const urlParse = require('url-parse');
const config = require('config');

const sessionStore = require('controllers/sessionStore');

const login = async (req, res, next) => {
    const { name, roomId } = req.body;

    try {
        const ajv = new Ajv({verbose: true});
        const validLogin = ajv.validate(authJsonSchema, req.body);

        if (!validLogin) {
            const message = `${ajv.errors[0].parentSchema.description} ${ajv.errors[0].message}`;
            throw new Error(message);
        }

        const existsUser = await User.findOne({'name': name});

        if (existsUser) {
            throw new Error('A user with this Name already exists');
        }

        const newUser = new User({
            name: name
        });

        const user = await newUser.save();

        req.session.userId = user.id;
        req.session.roomId = roomId;

        console.log(`SESSION ID: ${req.sessionID}`);
        console.log(sessionStore.getStore().ids(function (all, all2) {
            console.log(all, all2);
        }));

        res.redirect('/chat');
    } catch (error) {
        const rooms = await Room.find({});
        res.render('index', {title: 'Chat', rooms: rooms, data: req.body, error: error.message});
    }
};

const logout = (req, res, next) => {
    req.session.destroy(async (err) => {
        if (err) {
            return res.redirect('/chat');
        }

        res.clearCookie(config.get('session:name'));
        res.redirect('/');
    });
};

const allowUserToPage = (req, res, next) => {
    const notAuthPage = ['/'];
    const url = urlParse(req.url, true);

    if (!req.session.userId) {
        if (notAuthPage.indexOf(url.pathname) === -1) {
            return res.redirect('/');
        }
    } else {
        if (notAuthPage.indexOf(req.url) !== -1) {
            return res.redirect('/chat');
        }
    }

    next();
};

module.exports.login = login;
module.exports.logout = logout;
module.exports.allowUserToPage = allowUserToPage;