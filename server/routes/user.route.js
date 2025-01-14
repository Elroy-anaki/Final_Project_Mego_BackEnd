import { Router } from 'express';
import { signUp, signIn, editUserDetails ,getAllUsers, signUpWithGoogle, getAllOrdersByUserId} from '../controllers/user.controller.js';

const router = Router();

router.get('/get-all-users', getAllUsers);

router.post('/sign-up', signUp);

router.post('/sign-up/:provider', signUpWithGoogle);

router.post('/sign-in', signIn);

router.put('/edit-user-details/:id', editUserDetails)

router.get('/get-all-orders-by-user-id/:userId', getAllOrdersByUserId)


export default router;