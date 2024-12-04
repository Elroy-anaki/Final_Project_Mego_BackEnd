import { Router } from 'express';
import { addRestaurant,getRestaurant } from '../controllers/restaurant.controller.js';



const router = Router();


router.post('/add-restaurant', addRestaurant);
router.get('/get-restaurant', getRestaurant);


export default router;