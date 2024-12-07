import { Router } from 'express';
import {resetPassword, verifyToken , logOut} from '../controllers/auth.controller.js'
const router = Router();


router.post('/reset-password', resetPassword);

router.get('/verify-token', verifyToken);

router.get('/log-Out', logOut);

export default router;