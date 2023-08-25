/* eslint-disable import/first */
/* eslint-disable import/extensions */
/* eslint-disable comma-dangle */
/* eslint-disable no-tabs */
/* eslint-disable indent */
/* eslint-disable no-console */
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import auth from './routes/auth.js';
import entry from './routes/entry.js';
import user from './routes/user.js';

import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config();
import './models/mongoDB.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(cors());
// if (process.env.NODE_ENV === 'production') {
// }

// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', `${process.env.CLIENT_URI}`);
// 	res.setHeader(
// 		'Access-Control-Allow-Methods',
// 		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
// 	);
// 	res.setHeader(
// 		'Access-Control-Allow-Headers',
// 		'X-Requested-With,content-type'
// 	);
// 	res.setHeader('Access-Control-Allow-Credentials', true);
// 	next();
// });

app.use('/api/auth', auth);
app.use('/api/entry', entry);
app.use('/api/user', user);
// app.use('/', (req, res) => {
// 	res.send('The API is working!!!');
// });

// error handler
app.use(errorHandler);

// catch 404 and forward to error handler
app.use(notFound);

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
	console.log(`Listening at PORT: ${PORT}`);
});
