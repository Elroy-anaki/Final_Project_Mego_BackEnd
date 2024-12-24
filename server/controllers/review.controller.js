import Review from "../models/review.model.js";
import Meal from "../models/meal.model.js";

export const addReviews = async (req, res) => {
  console.log("req.body", req.body);

  try {
    const newReview = await Review.create(req.body);


    await Meal.updateOne(
      {_id:newReview.mealId},
      {$push:{reviews:newReview._id}}
    )
    console.log(newReview)
 

    res.status(201).json({
      success: true,
      msg: "The review has been successfully added.",
      meal: newReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "The review was not added successfully.",
      error: error.message || error,
    });
  }
};
