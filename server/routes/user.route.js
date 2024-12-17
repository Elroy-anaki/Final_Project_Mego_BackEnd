import { Router } from 'express';
import { signUp, signIn, editUserDetails } from '../controllers/user.controller.js';

const router = Router();


router.post('/sign-up', signUp);

router.post("/sign-in", signIn);

router.put('/edit-user-details/:id', editUserDetails)


export default router;