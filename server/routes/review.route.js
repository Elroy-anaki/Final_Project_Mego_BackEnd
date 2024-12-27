import { Router } from 'express';
import {addReviews} from '../controllers/review.controller.js';




const router = Router();


router.post('/add-reviews/:orderId/:guestEmail', addReviews);






export default router;