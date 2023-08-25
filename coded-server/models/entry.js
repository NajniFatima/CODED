/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable no-tabs */
import mongoose from 'mongoose';

const entrySchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		language: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
		},
		tags: {
			type: String,
			default: '',
		},
		likes: {
			type: Number,
			required: true,
			default: 0,
		},
		views: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Code = mongoose.model('Entry', entrySchema);

export default Code;
