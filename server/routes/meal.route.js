import { Router } from 'express';
import { addMeal , getAllMeals } from '../controllers/meal.controller.js';



const router = Router();


router.post('/add-meal', addMeal);
router.get('/get-all-meal', getAllMeals);


export default router;