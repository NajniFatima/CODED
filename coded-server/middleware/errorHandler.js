/* eslint-disable no-unused-vars */
/* eslint-disable no-tabs */
/* eslint-disable indent */
/* eslint-disable import/extensions */

// eslint-disable-next-line no-unused-vars

import createError from 'http-errors';

const notFound = (req, res, next) => {
	next(createError(404));
};

const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack: err.stack,
	});
};

export { notFound, errorHandler };
