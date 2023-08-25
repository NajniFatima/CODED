/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
import express from 'express';
import {
	getEntryById,
	saveEntry,
  updateEntry,
	runEntry,
	deleteEntry,
} from '../controllers/entry.js';
import protect from '../middleware/authHandler.js'
// import authHandler from '../middleware/authHandler.js';

const router = express.Router();

router.post('/save', protect, saveEntry);
router.post('/save/:id', protect, updateEntry);
router.delete('/delete/:id', protect, deleteEntry);
router.post('/run', runEntry);
router.get('/:id', getEntryById);

export default router;
