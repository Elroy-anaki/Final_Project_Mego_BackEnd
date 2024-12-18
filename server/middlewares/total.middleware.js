import Meal from "../models/meal.model.js";

const Total = async (meals) => {
    try {
      const ids = meals.map((meal) => meal.id);
  
      const allMeals = await Meal.find({ _id: { $in: ids } });

      const total = allMeals.reduce((sum, meal, index) => {
        return sum + (meal.mealPrice * meals[index].quantity)
      }, 0);     

  console.log(total)

      return total;
      
    } catch (error) {
      console.log("Error:", error);
      throw error; 
    }
  };

export default Total;