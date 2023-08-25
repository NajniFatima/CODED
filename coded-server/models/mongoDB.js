/* eslint-disable comma-dangle */
/* eslint-disable no-tabs */
/* eslint-disable indent */
/* eslint-disable no-console */
import mongoose from 'mongoose';
import gravatar from 'gravatar';
import crypto from 'crypto';
import User from './user.js';

mongoose
	.connect(`${process.env.MONGO_URI}`, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log('DataBase connected...'))
	.catch((err) => console.log(err));

mongoose.connection.on('open', () => {
	User.findOne({ email: 'admin@IntPrep.com' }, (error, user) => {
		if (!user) {
			const owner = {
				email: 'admin@IntPrep.com',
				hashed_password: `${crypto
					.createHmac('sha1', '144055712023')
					.update('SirLucarioo@2020')
					.digest('hex')}`,
				salt: '144055712023',
				role: 'admin',
				avatar: gravatar.url('admin@intprep.com', {
					s: '200',
					r: 'pg',
					d: 'mm',
				}),
				resetPasswordLink: '',
				name: 'SirLucarioo',
				organization: 'IntPrep',
				position: 'admin',
				about: 'Admin account of @mdmusibul',
				website: '',
				twitter: '',
				linkedin: '',
				github: '',
				codepen: '',
				resetPasswordLink: '',
				entries: [
					'60cd9d8b4da10e1e41116fea',
					'60cd9d8b4da10e1e41116fec',
					'60cd9d8b4da10e1e41116fed',
					'60cd9d8b4da10e1e41116fee',
					'60cd9d8b4da10e1e41116feb',
					'60ce04113b745aaaa4be641a',
				],
			};
			User.create(owner, (err) => {
				if (err) {
					console.log(
						`[Error] occured while creating owner's account: ${err}.`
					);
					// [an error handler]
				}
				console.log("[Database Initialized] Owner's account was created.");
				console.log(
					'[Owners info] username: sirlucarioo, password: SirLucarioo@2020'
				);
			});
		} else {
			console.log(
				'[Owners info] username: sirlucarioo, password: SirLucarioo@2020'
			);
		}
	});
});

mongoose.connection.on('connected', () => {
	console.log(`Mongoose connected to ${process.env.DEV_DB_URI}`);
});

mongoose.connection.on('error', (error) => {
	console.log(`Mongoose connection error ${error}`);
});

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose disconnected');
});
