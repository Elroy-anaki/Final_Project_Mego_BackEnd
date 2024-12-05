import { Router } from 'express';
import { addMeal , getAllMeals, getMealById } from '../controllers/meal.controller.js';



const router = Router();


router.post('/add-meal', addMeal);

router.get('/get-all-meals', getAllMeals);

router.get('/get-meal-by-id/:id', getMealById);



export default router;