const express = require('express');
const {check, body} = require("express-validator/check");

const authController = require('../controllers/auth');
const User = require("../models/user");

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login',
    [
        body("email")
            .isEmail()
            .withMessage("Please, enter a valid email!")
            .normalizeEmail(),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Please enter a password with al least 6 characters!")
            .isAlphanumeric()
            .withMessage("Please enter a password with only numbers and text!")
            .trim()

    ],
    authController.postLogin);

router.post('/signup',
    [
        check("email")
            .isEmail()
            .withMessage("Please enter a valid email!")
            .custom((value, {req}) => {
                return User.findOne({email: value})
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject(
                                "E-mail already exists, please pick a different one!"
                            );
                        }
                    })
            })
            .normalizeEmail(),
        body(
            "password",
        )
            .isLength({min: 6})
            .withMessage("Please enter a password with al least 6 characters!")
            .isAlphanumeric()
            .withMessage("Please enter a password with only numbers and text!")
            .trim(),
        body("confirmPassword")
            .trim()
            .custom((value, {req}) => {
                if (value !== req.body.password) {
                    throw new Error("Password have to match!")
                }
                return true;
            })
    ],
    authController.postSignup);

router.post('/logout', authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;