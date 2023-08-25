/* eslint-disable import/extensions */
import express from 'express';
import { readuser, updateuser, deleteuser } from '../controllers/user.js';
import { requireLogIn, adminMiddleware } from '../controllers/auth.js';
import protect from '../middleware/authHandler.js'

// import protect from '../middleware/authHandler.js';

const router = express.Router();

router.get('/:id', readuser);
router.post('/update', protect, updateuser);
router.delete('/delete', protect, deleteuser);
router.get('/admin/update', requireLogIn, adminMiddleware, readuser);

export default router;
