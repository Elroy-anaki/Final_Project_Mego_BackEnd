import { Router } from 'express';
import { signUp, login, logOut, auth } from '../controllers/user.controller.js';
import verifyToken from '../middlewares/verifyToken.middleware.js';

const router = Router();


router.post('/sign-up', signUp);
router.post("/log-in", login);
router.get("/log-Out", verifyToken, logOut);
router.get("/auth", auth);

export default router;