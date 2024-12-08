import { Router } from "express";
import {
  addMeal,
  getAllMeals,
  getMealById,
  getAllReviewsByMealId,
  deleteMealById
} from "../controllers/meal.controller.js";
import upload from "../config/multer.config.js";

const router = Router();

router.post("/add-meal", upload.single("mealImage"), addMeal);

router.get("/get-all-meals", getAllMeals);

router.get("/get-meal-by-id/:id", getMealById);

router.get("/get-all-reviews-by-id/:id", getAllReviewsByMealId);

router.delete("/delete-meal-by-id/:id", deleteMealById)

export default router;
