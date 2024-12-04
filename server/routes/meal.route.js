import { Router } from 'express';
import { addMeal } from '../controllers/meal.controller.js';



const router = Router();


router.post('/add-meal', addMeal);


export default router;