/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
import User from '../models/user.js';

const adminHandler = (req, res, next) => {
	User.findById({
		_id: req.user._id,
	}).exec((err, user) => {
		if (err || !user) {
			res.status(400).json({
				error: 'User not found',
			});
		}

		if (user.role !== 'admin') {
			res.status(400);
			throw new Error('Admin resource. Access denied');
		}

		req.profile = user;
		next();
	});
};

export default adminHandler;
