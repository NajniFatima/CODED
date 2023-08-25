/* eslint-disable operator-linebreak */
/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';

const protect = asyncHandler(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded._id);

			next();
		} catch (error) {
			res.status(401);
			throw new Error('Not authorized, token failed');
		}
	}
	if (!token) {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
});

export default protect;
