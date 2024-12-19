import { Router } from 'express';
import { signUp, signIn, editUserDetails ,getAllUsers} from '../controllers/user.controller.js';

const router = Router();

router.get('/get-all-users', getAllUsers);

router.post('/sign-up', signUp);

router.post("/sign-in", signIn);

router.put('/edit-user-details/:id', editUserDetails)


export default router;