import { Router } from 'express';
import { addMealCategories, deleteMealCategory, getAllMealCategories  } from '../controllers/MealCategories.controller.js';
import upload from '../config/multer.config.js'



const router = Router();


router.post('/add-meal-categories', upload.single('mealCategoriesImage'), addMealCategories);

router.delete('/delete-meal-category/:id', deleteMealCategory);

router.get('/get-all-meal-categories', getAllMealCategories);



export default router;