import { Router } from 'express';
import upload from '../config/multer.config.js';
import { addRestaurant, getRestaurant } from '../controllers/restaurant.controller.js';


const router = Router();


router.post('/add-restaurant', upload.fields([
    { name: 'restaurantLogo', maxCount: 1 },
    { name: 'restaurantImage', maxCount: 1 }
]), addRestaurant);

router.get('/get-restaurant', getRestaurant);


export default router;