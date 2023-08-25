/* eslint-disable import/extensions */
/* eslint-disable import/first */
/* eslint-disable no-tabs */
/* eslint-disable indent */
import express from 'express';

const router = express.Router();

import {
	register,
	verify,
	login,
	forgotpassword,
	resetpassword,
} from '../controllers/auth.js';
// const {
//   validateSignup,
//   validateLogin,
//   validateResetPassword,
//   validateForgotPassword,
// } = require('../util/validator');

// the user token will be saved in localStorage, in frontend.
// The same saved token will be used for autologin.
// For logout the localStorage will be cleared.
router.post('/login', login);
router.post('/register', register);
router.post('/verify', verify);
router.post('/resetpassword', resetpassword);
router.post('/forgotpassword', forgotpassword);

export default router;
