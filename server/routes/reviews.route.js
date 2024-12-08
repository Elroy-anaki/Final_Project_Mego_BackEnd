import { Router } from 'express';
import {addReviews} from '../controllers/reviews.controller.js';




const router = Router();


router.post('/add-reviews', addReviews);






export default router;