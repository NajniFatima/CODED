/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable no-tabs */
import mongoose from 'mongoose';
import crypto from 'crypto';

// user schema
const UserScheama = new mongoose.Schema(
	{
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
		},
		about: {
			type: String,
			required: true,
		},
		organization: {
			type: String,
			required: true,
		},
		position: {
			type: String,
			required: true,
		},
		website: String,
		linkedin: String,
		github: String,
		codepen: String,
		twitter: String,
		hashed_password: {
			type: String,
			required: true,
		},
		hashed_password: {
			type: String,
			required: true,
		},
		salt: String,
		role: {
			type: String,
			default: 'subscriber',
		},
		resetPasswordLink: {
			data: String,
			default: '',
		},
		avatar: {
			type: String,
			required: true,
		},
		entries: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Entry',
			},
		],
	},
	{
		timestamps: true,
	}
);

// virtuals
UserScheama.virtual('password')
	// eslint-disable-next-line func-names
	.set(function (password) {
		// eslint-disable-next-line no-underscore-dangle
		this._password = password;
		this.salt = this.makeSalt();
		this.hashed_password = this.encryptPassword(password);
	})
	// eslint-disable-next-line func-names
	.get(function () {
		// eslint-disable-next-line no-underscore-dangle
		return this._password;
	});

// methods
UserScheama.methods = {
	authenticate(plainText) {
		return this.encryptPassword(plainText) === this.hashed_password;
	},

	encryptPassword(password) {
		if (!password) return '';
		try {
			return crypto
				.createHmac('sha1', this.salt)
				.update(password)
				.digest('hex');
		} catch (err) {
			return '';
		}
	},

	makeSalt() {
		return `${Math.round(new Date().valueOf() * Math.random())}`;
	},
};

export default mongoose.model('User', UserScheama);
