import Meal from "../models/meal.model.js";
import cloudinary from '../config/cloudinary.config.js';


export const addMeal = async (req, res) => {
  console.log("body", req.body);
  console.log("file", req.file);
  req.body.ingredients = String(req.body.ingredients).split(',')

  try {
    const { mealName, mealPrice, ingredients } = req.body;
    if (!mealName || !mealPrice || !ingredients)
      throw new Error("all fields requierd!");

    if (req.file) {
      const { secure_url } = await cloudinary.uploader.upload(req.file.path);
      req.body.mealImage = secure_url;
    }
    const newMeal = await Meal.create(req.body)

    res.status(201).json({
      success: true,
      msg: "Meal added successfully!",
      data: newMeal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to add meal.",
      error: error.message || error,
    });
  }
};

export const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json({
      success: true,
      msg: "Meals retrieved successfully.",
      data: meals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to retrieve meals.",
      error: error.message || error,
    });
  }
};

export const getMealById = async (req, res) => {
  try {
    const { id } = req.params;

    const meal = await Meal.findById(id);
    if (!meal) {
      return res.status(404).json({
        success: false,
        message: "Meal not foumd.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Meal retrieved successfully.",
      meal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve meal.",
      error: error.message || error,
    });
  }
};

export const getAllReviewsByMealId = async (req, res) => {
  console.log("get reviews...")
  try {
    const { id } = req.params;
    const meal = await Meal.findById(id).populate({ path: 'reviews' });
    if (!meal) {
      return res.status(404).json({
        success: false,
        msg: "Meal not found.",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Meal retrieved successfully.",
      data: meal.reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to retrieve meal.",
      error: error.message || error,
    });
  }
};

export const deleteMealById = async (req, res) => {
  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX", req.params)
  try {
    const mealToDelete = await Meal.findByIdAndDelete(req.params.id);
    console.log(mealToDelete);
    res.status(204).json({
      success: true,
      msg: "Meal deleted!",
      data: mealToDelete

    })

  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error
    })

  }
};
