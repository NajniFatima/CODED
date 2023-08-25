/* eslint-disable comma-dangle */
/* eslint-disable no-tabs */
/* eslint-disable indent */
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import asyncHandler from 'express-async-handler';

import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.MAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET;
const REDIRECT_URI = process.env.MAIL_REDIRECT_URI;
const REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN;
const MAIL_ID = process.env.MAIL_ADDRESS;

const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = asyncHandler(async (from, to, subject, text, html) => {
	// try {
	const accessToken = await oAuth2Client.getAccessToken();
	const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: `${MAIL_ID}`,
			clientId: `${CLIENT_ID}`,
			clientSecret: `${CLIENT_SECRET}`,
			refreshToken: `${REFRESH_TOKEN}`,
			accessToken: `${accessToken}`,
		},
	});
	// } catch (error) {
	// 	console.log(error);
	// }

	const mailOptions = {
		from: `${from} <${MAIL_ID}>`,
		to,
		subject,
		text,
		html,
	};
	try {
		const result = await transport.sendMail(mailOptions);
		// console.log(result);
		return result;
	} catch (error) {
		// console.log(error);
		return error;
	}
});

export default sendMail;
