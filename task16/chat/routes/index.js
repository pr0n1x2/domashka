const express = require('express');
const router = express.Router();
const authController = require('controllers/auth');
const pagesController = require('controllers/pages');

router.get('/', pagesController.homeView);
router.post('/', authController.login);

router.get('/logout', authController.logout);

module.exports = router;