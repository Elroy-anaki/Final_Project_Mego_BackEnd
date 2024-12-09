import MealCategories from "../models/mealCategory.model.js";
import cloudinary from '../config/cloudinary.config.js';


export const addMealCategories = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    const { mealCategoriesName } = req.body;
    if (!mealCategoriesName) {
      res.status(400).json({
        success: false,
        msg: "All fields are required!",
      });
    }

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      req.body.mealCategoriesImage = uploadResult.secure_url;
    }

    const newMealCategories = await MealCategories.create(req.body);

    res.status(201).json({
      success: true,
      msg: "Meal category added successfully.",
      data: newMealCategories,
    });
  } catch (error) {

    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        msg: "Meal category with this name already exists.",
      });
    }

    res.status(500).json({
      success: false,
      msg: "Failed to add meal category.",
      error: error.message || error,
    });
  }
};

export const deleteMealCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await MealCategories.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        msg: "Meal category not found.",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Meal category deleted successfully.",
      data: deletedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to delete meal category.",
      error: error.message || error,
    });
  }
};

export const getAllMealCategories = async (req, res) => {
  try {

    const mealCategories = await MealCategories.find();
    res.status(200).json({
      success: true,
      msg: "All meal's categories here",
      data: mealCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to fetch meal categories.",
      error: error.message || error,
    });
  }
};



