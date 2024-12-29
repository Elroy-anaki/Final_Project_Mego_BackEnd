import Meal from "../models/meal.model.js";
import cloudinary from '../config/cloudinary.config.js';
import { model } from "mongoose";


export const addMeal = async (req, res) => {
  console.log("body", req.body);
  console.log("file", req.file);

  req.body.ingredients = String(req.body.ingredients).split(',')

  req.body.mealCategories = JSON.parse(req.body.mealCategories)
  console.log("TEST", req.body.mealCategories);
  try {
    const { mealName, mealPrice, ingredients, mealCategories } = req.body;
    if (!mealName || !mealPrice || !ingredients || !mealCategories)
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
    console.log("error", error)
    res.status(500).json({
      success: false,
      msg: "Failed to add meal.",
      error: error.message || error,
    });
  }
};

export const getAllMeals = async (req, res) => {
  const { limit, page, search = 'mealName', sortBy = '1', gt = 0 } = req.query;

  try {
    const countMeals = await Meal.countDocuments();
    const meals = await Meal.find().sort({[search]: Number(sortBy)}).populate('mealCategories', "categoryName").skip((page - 1) * limit).limit(limit);
    console.log(meals);

    res.status(200).json({
      success: true,
      msg: "Meals retrieved successfully.",
      data: meals,
      count: countMeals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to retrieve meals.",
      error: error.message || error,
    });
  }
};

export const getMealsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const meals = await Meal.find({ 'mealCategories': categoryId});
    res.status(200).json({
      success: true,
      msg: "Get meal success by category",
      data: meals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to get meals.",
      error: error.message || error,
    });
  }
};

export const getMealById = async (req, res) => {
  try {
    const { id } = req.params;

    const meal = await Meal.findById(id);
    if (!meal) { throw new Error("The meal doesn't exist!") }

    res.status(200).json({
      success: true,
      msg: "Meal retrieved successfully.",
      data: meal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to retrieve meal.",
      error: error.message || error,
    });
  }
};

export const autoComplete = async (req, res) => {
  const { query } = req.query
  console.log(query)

  const pipeline = [];

  pipeline.push({
    $search: {
      index: 'autoCompleteMeals',
      autocomplete: {
        query: query,
        path: 'mealName',
        tokenOrder: 'sequential',
      }
    }
  });
  pipeline.push({
    $project: {
      _id: 1,
      score: { $meta: 'searchScore' },
      mealName: 1,
      mealPrice: 1,
      mealImage: 1,
      reviews: 1,
      ingredients: 1,
      amoutnOfCalories: 1,
      mealCategories: 1
    }
  });
  pipeline.push({
    $limit: 5
  });

  try {
    const meals = await Meal.aggregate(pipeline).sort({ score: - 1 })
    res.status(200).json({
      success: true,
      msg: "Take Suggestions",
      data: meals
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: true,
      msg: "Error",
      error: error
    })
  }


};

export const getAllReviewsByMealId = async (req, res) => {
  console.log("get reviews...")
  try {
    const { id } = req.params;
    const meal = await Meal.findById(id)
    .populate({
      path: "reviews",
      select: "comment rating user",
      
    })
    
    
    if (!meal) { throw new Error("The meal doesn't exist!") }

    res.status(200).json({
      success: true,
      msg: "Meal retrieved successfully.",
      data: meal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to retrieve meal.",
      error: error.message || error,
    });
  }
};

export const editMealById = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);

  req.body.ingredients = String(req.body.ingredients).split(',')
  req.body.mealCategories = JSON.parse(req.body.mealCategories)
  try {
    // const existingMeal = await Meal.findById(id);
    // if (!existingMeal) { throw new Error("The meal doesn't exist!") }

    // const mealImage = existingMeal.mealImage;
    if (!req.file) delete req.body.mealImage

    const editedMeal = await Meal.findByIdAndUpdate(id, req.body, { new: true })

    res.status(204).json({
      success: true,
      msg: "Meal Changed successfully!",
      data: editedMeal
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Meal Not Changed successfully!",
      error: error
    })

  }
};

export const deleteMealById = async (req, res) => {
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
