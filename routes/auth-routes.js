const router = require('express').Router();
const { authController } = require('../controllers');

router.route('/user')
    .get(authController.getUsers)
    .post(authController.createUser);

router.route('/login')
    .post(authController.login);

module.exports = router;
