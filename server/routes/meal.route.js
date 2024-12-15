import { Router } from "express";
import {
  addMeal,
  getAllMeals,
  getMealById,
  autoComplete,
  getAllReviewsByMealId,
  deleteMealById,
  editMealById,
  getMealsByCategory
} from "../controllers/meal.controller.js";
import upload from "../config/multer.config.js";

const router = Router();

router.post("/add-meal", upload.single("mealImage"), addMeal);

router.get("/get-all-meals", getAllMeals);

router.get('/get-meals-by-category/:categoryId', getMealsByCategory);

router.get("/get-meal-by-id/:id", getMealById);

router.get("/get-all-reviews-by-id/:id", getAllReviewsByMealId);

router.get("/auto-complete", autoComplete)

router.put("/edit-meal-by-id/:id", upload.single("mealImage"), editMealById)

router.delete("/delete-meal-by-id/:id", deleteMealById)


export default router;

