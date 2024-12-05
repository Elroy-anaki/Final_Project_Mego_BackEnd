import { Router } from 'express';
import { signUp, signIn, logOut } from '../controllers/user.controller.js';
import verifyToken from '../middlewares/verifyToken.middleware.js';
import { auth } from '../controllers/auth.controller.js'

const router = Router();


router.post('/sign-up', signUp);

router.post("/sign-in", signIn);

router.get("/log-Out", verifyToken, logOut);

router.get("/auth",  auth);

export default router;