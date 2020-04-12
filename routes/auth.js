const express = require('express');
const { check } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/signup', 
    check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    //add custom validation
    .custom((value, {req}) => {
        if(value === 'me@test.com') {
            throw new Error('This email address is not Ok.')
        }
        return true;
    }),
    authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);


module.exports = router;