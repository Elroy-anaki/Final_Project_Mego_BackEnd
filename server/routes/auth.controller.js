import { Router } from 'express';
import {verifyToken , logOut} from '../controllers/auth.controller.js'
const router = Router();



router.get('/verify-token', verifyToken)

router.get('/log-Out', logOut)

export default router;