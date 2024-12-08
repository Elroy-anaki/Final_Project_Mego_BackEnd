import MealCategories from "../models/mealCategory.model.js";
import cloudinary from '../config/cloudinary.config.js';


export const addMealCategories = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    // בדיקת תקינות הקלט
    const { mealCategoriesName } = req.body;
    if (!mealCategoriesName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // העלאת תמונה ל-Cloudinary אם קובץ צורף
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      req.body.mealCategoriesImage = uploadResult.secure_url;
    }

    // יצירת קטגוריית ארוחה חדשה
    const newMealCategories = await MealCategories.create(req.body);

    // החזרת תגובה מוצלחת ללקוח
    return res.status(201).json({
      success: true,
      message: "Meal category added successfully.",
      mealCategory: newMealCategories,
    });
  } catch (error) {
    // טיפול בשגיאות (לדוגמה: קטגוריה עם אותו שם כבר קיימת)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Meal category with this name already exists.",
      });
    }

    // שגיאות כלליות
    return res.status(500).json({
      success: false,
      message: "Failed to add meal category.",
      error: error.message || error,
    });
  }
};

export const deleteMealCategory = async (req, res) => {
    try {
      const { id } = req.params;
  
      // חיפוש הקטגוריה לפי ID ומחיקתה
      const deletedCategory = await MealCategories.findByIdAndDelete(id);
  
      if (!deletedCategory) {
        return res.status(404).json({
          success: false,
          message: "Meal category not found.",
        });
      }
  
      // החזרת תגובה מוצלחת לאחר המחיקה
      return res.status(200).json({
        success: true,
        message: "Meal category deleted successfully.",
        mealCategory: deletedCategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete meal category.",
        error: error.message || error,
      });
    }
  };

export const getAllMealCategories = async (req, res) => {
    try {
      // קבלת כל הקטגוריות מהמאגר
      const mealCategories = await MealCategories.find();
  
      // החזרת כל הקטגוריות בתגובה
      return res.status(200).json({
        success: true,
        mealCategories,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch meal categories.",
        error: error.message || error,
      });
    }
  }
  
  

