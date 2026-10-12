import express from 'express';
import { login, verifySession, changePassword } from '../controllers/authController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/verify', authenticateAdmin, verifySession);
router.post('/change-password', authenticateAdmin, changePassword);

export default router;
