/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable no-undef */
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import axios from 'axios';
import Entry from '../models/entry.js';
import User from '../models/user.js';

const version = {
	java: '3',
	c: '4',
	c99: '3',
	cpp: '4',
	cpp14: '3',
	cpp17: '0',
	php: '3',
	perl: '3',
	python2: '2',
	python3: '3',
	ruby: '3',
	go: '3',
	scala: '3',
	bash: '3',
	sql: '3',
	pascal: '2',
	csharp: '3',
	vbn: '3',
	haskell: '3',
	objc: '3',
	swift: '3',
	groovy: '3',
	fortran: '3',
	brainfuck: '0',
	lua: '2',
	tcl: '3',
	hack: '0',
	rust: '3',
	d: '1',
	ada: '3',
	r: '3',
	freebasic: '1',
	verilog: '2',
	cobol: '2',
	dart: '3',
	yabasic: '1',
	clojure: '2',
	nodejs: '3',
	scheme: '2',
	forth: '0',
	prolog: '1',
	octave: '3',
	coffeescript: '3',
	icon: '1',
	fsharp: '1',
	nasm: '3',
	gccasm: '2',
	intercal: '0',
	nemerle: '0',
	ocaml: '1',
	unlambda: '0',
	picolisp: '3',
	spidermonkey: '1',
	rhino: '1',
	bc: '1',
	clisp: '3',
	elixir: '3',
	factor: '3',
	falcon: '0',
	fantom: '0',
	nim: '2',
	pike: '1',
	smalltalk: '0',
	mozart: '0',
	lolcode: '0',
	racket: '2',
	kotlin: '2',
	whitespace: '0',
	erlang: '0',
	jlang: '0',
};

const getEntryById = asyncHandler(async (req, res) => {
	let entry;
	console.log(req.params.id);
	if (mongoose.Types.ObjectId.isValid(req.params.id))
		entry = await Entry.findById(req.params.id);
	if (entry) {
		res.status(200);
		res.json(entry);
	} else {
		res.status(404);
		throw new Error('Entry not Found');
	}
});

const saveEntry = asyncHandler(async (req, res) => {
	console.log(req);
	const { title, tags, code, input, language } = req.body;
	const newEntry = await Entry.create({
		user: req.user._id,
		title,
		tags,
		code,
		input,
		language,
	});
	if (newEntry instanceof Entry) {
		console.log(newEntry);
		try {
			const user = await User.findByIdAndUpdate(req.user._id, {
				$push: { entries: newEntry._id },
			});
		} catch (error) {
			await Entry.findByIdAndDelete(newEntry._id);
			res.status(400);
			throw new Error('user not found, login to submit');
		}
		res.status(200);
		res.json({
			_id: newEntry._id,
			title,
			tags,
			code,
			input,
			language,
		});
	} else {
		res.status(400);
		throw new Error('code cannot be saved');
	}
});

const updateEntry = asyncHandler(async (req, res) => {
	const { title, tags, code, input, language } = req.body;

	try {
		await Entry.findByIdAndUpdate(req.params.id, {
			$set: {
				title: title,
				tags: tags,
				code: code,
				input: input,
				language: language,
			},
		});
		res.status(200);
		res.json({ success: true });
	} catch (error) {
		console.log(error);
		res.status(400);
		throw new Error('entry cant be updated');
	}
});

const runEntry = asyncHandler(async (req, res) => {
	const client_ids = [
		process.env.COMPILER_CLIENT_ID_1,
		process.env.COMPILER_CLIENT_ID_2,
		process.env.COMPILER_CLIENT_ID_3,
		process.env.COMPILER_CLIENT_ID_4,
		process.env.COMPILER_CLIENT_ID_5,
	];
	const client_secret = [
		process.env.COMPILER_CLIENT_SECRET_1,
		process.env.COMPILER_CLIENT_SECRET_2,
		process.env.COMPILER_CLIENT_SECRET_3,
		process.env.COMPILER_CLIENT_SECRET_4,
		process.env.COMPILER_CLIENT_SECRET_5,
	];

	const position = Math.floor(Math.random() * 5);

	const { code, input, language } = req.body;
	console.log({ code, input, language });
	const program = {
		script: code,
		language,
		versionIndex: version[language],
		stdin: input,
		clientId: client_ids[position],
		clientSecret: client_secret[position],
	};

	axios
		.post(`${process.env.COMPILER_URI}`, program)
		.then((response) => {
			res.status(200);
			res.json(response.data);
		})
		.catch((error) => {
			console.log(error);
			res.status(999);
			throw new Error('compiler error occured');
		});
});

const deleteEntry = asyncHandler(async (req, res) => {
	const { id } = req.params;
	let user;
	try {
		user = await User.findByIdAndUpdate(req.user._id, {
			$pull: { entries: id },
		});
	} catch (error) {
		res.status(403);
		throw new Error('Access denied!');
	}
	try {
		await Entry.findByIdAndDelete(id);
		res.status(200);
		res.json(user.entries);
	} catch (error) {
		res.status(400);
		throw new Error('Entry not found');
	}
});

export { getEntryById, saveEntry, updateEntry, runEntry, deleteEntry };
