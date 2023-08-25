/* eslint-disable import/extensions */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable no-tabs */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import _ from 'lodash';
import { validationResult } from 'express-validator';
import expressJwt from 'express-jwt';
import JWT from 'jsonwebtoken';
import gravatar from 'gravatar';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import sendMail from '../util/mail.js';
import { verificationMail, passwordResetMail } from '../util/mailsyntax.js';

const register = asyncHandler(async (req, res) => {
	console.log(req.body);
	const { email, password } = req.body;

	let user = await User.findOne({ email });
	if (user) {
		console.log('error');
		res.status(400);
		throw new Error('email already in use');
	}

	const avatar = gravatar.url(email, {
		s: '200',
		r: 'pg',
		d: 'mm',
	});

	const token = JWT.sign(
		{
			email,
			password,
			avatar,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: `${process.env.ACCESS_TOKEN_LIFE}`,
		}
	);

	const from = 'CODED';
	const to = `${email}`;
	const subject = 'Email verification link for CODED';
	const text = `Click on the link to activate your account: ${process.env.CLIENT_URI}/user/verify/${token}`;
	const link = `${process.env.CLIENT_URI}/user/verify/${token}`;
	const html = verificationMail(link);
	//   <p>Click on the below like to activate your account</p>
	//   <p>${process.env.CLIENT_URI}/user/verify/${token}</p>
	//   <p>Ignore the mail if you didn't signed for IntPrep.</p>
	//   <hr/>
	//   <p>This email contains sensitive information, please do not share with any one.</p>
	// `;
	const result = await sendMail(from, to, subject, text, html);

	console.log(result);

	if (result) {
		console.log(result);
		return res.json({
			success: true,
			message: 'Verification mail send to the registered email id.',
		});
	}
	res.status(455);
	throw new Error('error sending mail');
});

const verify = asyncHandler(async (req, res) => {
	const {
		token,
		name,
		about,
		organization,
		position,
		website,
		linkedin,
		github,
		twitter,
		codepen,
	} = req.body;
	console.log(token);

	if (token) {
		try {
			JWT.verify(token, process.env.JWT_SECRET);
		} catch (error) {
			res.status(401);
			throw new Error('token expired, register again');
		}
		const { email, password, avatar } = await JWT.decode(token);

		const user = await User.findOne({ email });
		if (user) {
			console.log('error');
			res.status(400);
			throw new Error('email already in use');
		}

		const newuser = await User.create({
			email,
			password,
			resetPasswordLink: '',
			avatar,
			name,
			about,
			organization,
			position,
			website,
			linkedin,
			github,
			twitter,
			codepen,
		});
		if (newuser instanceof User) {
			console.log(newuser);
			return res.json({ success: true, message: 'register success' });
		}
	}
	res.status(500);
	throw new Error('some error occured please try again');
});

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	console.log(req.body);

	let user;

	try {
		user = await User.findOne({ email });
	} catch (error) {
		console.log(error);
	}

	if (user && (await user.authenticate(password))) {
		res.json({
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
			token: JWT.sign(
				{
					_id: user._id,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: `${process.env.REFRESH_TOKEN_LIFE}`,
				}
			),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

const requireLogIn = expressJwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['RS256'],
});

const adminMiddleware = asyncHandler(async (req, res, next) => {
	const user = await User.findById({ _id: req.user._id });
	if (!user || !user.isAdmin) {
		res.status(400);
		throw new Error('Access denied');
	}
	req.profile = user;
	next();
});

const forgotpassword = asyncHandler(async (req, res) => {
	// console.log('here');
	const { email } = req.body;

	// console.log(email);

	const user = await User.findOne({ email });
	if (!user) {
		res.status(400);
		throw new Error('incorrect email id');
	}

	const token = await JWT.sign(
		{
			_id: user._id,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: `${process.env.ACCESS_TOKEN_LIFE}`,
		}
	);
	const name = 'CODED';
	const to = `${email}`;
	const subject = 'Password reset link for CODED';
	const text = `Click on the link to reset your password: ${process.env.CLIENT_URI}/resetpassword/${token}`;
	const link = `${process.env.CLIENT_URI}/user/password/reset/${token}`;
	const html = passwordResetMail(link);
	// `
	//   <p>Click on the below like to reset your password</p>
	//   <p></p>
	//   <p>Ignore the mail if you didn't signed for it.</p>
	//   <hr/>
	//   <p>This email contains sensitive information, please do not share with any one.</p>
	// `;

	await user.updateOne({ resetPasswordLink: token });
	const result = await sendMail(name, to, subject, text, html);
	if (result) {
		console.log(result);
		return res.json({
			success: true,
			message: 'Password reset mail send to the registered email id.',
		});
	}
	res.status(455);
	throw new Error('error sending mail');
});

const resetpassword = asyncHandler(async (req, res) => {
	const { resetPasswordLink, newPassword } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const firstError = errors.array().map((error) => error.msg)[0];
		return res.status(422).json({
			errors: firstError,
		});
	}
	if (resetPasswordLink) {
		const decoded = await JWT.verify(resetPasswordLink, process.env.JWT_SECRET);
		if (!decoded) {
			res.status(400);
			throw new Error('link expired');
		}
		const user = await User.findOne({ resetPasswordLink });
		if (!user) {
			res.status(400);
			throw new Error('something went wrong please try again');
		}

		const updatedFields = await {
			password: newPassword,
			resetPasswordLink: '',
		};

		const tempuser = await _.extend(user, updatedFields);

		const result = await tempuser.save();
		if (!result) {
			res.status(400);
			throw new Error('error resetting password');
		}
		return res.json({
			success: true,
			message: 'password reset complete',
		});
	}
	res.status(400);
	throw new Error('link expired');
});

export {
	register,
	verify,
	login,
	requireLogIn,
	adminMiddleware,
	forgotpassword,
	resetpassword,
};
