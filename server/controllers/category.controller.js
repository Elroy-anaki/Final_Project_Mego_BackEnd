import Categories from "../models/category.model.js";
import cloudinary from '../config/cloudinary.config.js';


export const addCategory = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    const { categoryName } = req.body;
    if (!categoryName) {
      res.status(400).json({
        success: false,
        msg: "All fields are required!",
      });
    }

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      req.body.categoryImage = uploadResult.secure_url;
    }

    const newCategory = await MealCategories.create(req.body);

    res.status(201).json({
      success: true,
      msg: "Meal category added successfully.",
      data: newCategories,
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

export const deleteCategory = async (req, res) => {
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

export const getAllCategories = async (req, res) => {
  try {

    const categories = await Categories.find();
    res.status(200).json({
      success: true,
      msg: "All meal's categories here",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to fetch meal categories.",
      error: error.message || error,
    });
  }
};
