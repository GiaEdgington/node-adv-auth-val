const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/signup', 
    //block with validations
    [
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
            //check for password in the body (example)
            body(
                'password',
                'Please enter a password with only numbers and text and at least 5 characters'
                )
                .isLength({min: 5})
                .isAlphanumeric()
    ],
    authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);


module.exports = router;