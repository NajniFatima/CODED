/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import asyncHandler from 'express-async-handler';

import User from '../models/user.js';

const readuser = asyncHandler(async (req, res) => {
	const userId = req.params.id;

	const user = await User.findById(userId).populate('entries');
	if (user) {
		const tempuser = user;
		tempuser.hashed_password = '';
		tempuser.salt = '';
		console.log(tempuser);
		res.status(200).json(tempuser);
	} else {
		res.status(400);
		throw new Error('user  not found');
	}
});

const updateuser = asyncHandler(async (req, res) => {
	const {
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

	try {
		const user = await User.findByIdAndUpdate(req.user._id, {
			$set: {
				name: name,
				about: about,
				organization: organization,
				position: position,
				website: website,
				linkedin: linkedin,
				github: github,
				codepen: codepen,
				twitter: twitter,
			},
		});
		if (user) {
			const tempuser = user;
			tempuser.hashed_password = '';
			tempuser.salt = '';
			console.log(tempuser);
			res.status(200);
			res.json(tempuser);
		}
	} catch (error) {
		res.status(400);
		throw new Error('user  not found');
	}
});

const deleteuser = asyncHandler(async (req, res) => {
	try {
		await User.findByIdAndDelete(req.user._id);
		res.status(200);
		res.json({ success: true });
	} catch (error) {
		res.status(400);
		throw new Error('unauthorized  to delet the account');
	}
});

export { readuser, updateuser, deleteuser };
