import Meal from "../models/meal.model.js";

export default {
//   POST!
  addMeal: async (req, res) => {
    try {
      const { mealName, mealPrice, mealImage, ingredients, amoutnOfCalories } = req.body;
      if (!mealName || !mealPrice || !ingredients)
            throw new Error("all fields requierd!");

      const newMeal = await Meal.create(req.body)

      res.status(201).json({
        success: true,
        message: "Meal added successfully.",
        meal: newMeal,
      });
    } catch (error) {
      if (error.code === 11000) error.message = "Meal with this name alredy exists.";
      res.status(500).json({
        success: false,
        message: "Failed to add meal.",
        error: error.message || error,
      });
    }
  },
// GET
  getAllMeals: async (req, res) => {
    try {
      const meals = await Meal.find();

      res.status(200).json({
        success: true,
        message: "Meals retrieved successfully.",
        meals,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve meals.",
        error: error.message || error,
      });
    }
  },

  // GET + params(ID) 
  getMealById: async (req, res) => {
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
  },
};
