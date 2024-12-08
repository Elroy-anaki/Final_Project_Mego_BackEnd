import { Router } from 'express';
import {resetPassword, forogtPassword,  verifyToken , logOut} from '../controllers/auth.controller.js'
const router = Router();

router.post('/forgot-password', forogtPassword)

router.post('/reset-password', resetPassword);

router.get('/verify-token', verifyToken);

router.get('/log-Out', logOut);

export default router;