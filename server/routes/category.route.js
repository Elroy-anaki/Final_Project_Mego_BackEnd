import { Router } from 'express';
import { addCategory, deleteCategory, getAllCategories  } from '../controllers/category.controller.js';
import upload from '../config/multer.config.js'

const router = Router();

router.post('/add-category', upload.single('categoryImage'), addCategory);

router.delete('/delete-category/:id', deleteCategory);

router.get('/get-all-categories', getAllCategories);


export default router;