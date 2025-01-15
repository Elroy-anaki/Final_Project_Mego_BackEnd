import Review from "../models/review.model.js";
import Meal from "../models/meal.model.js";
import OrderTable from "../models/orderTable.model.js";

export const addReviews = async (req, res) => {
  const reviews = req.body
  const {orderId, guestEmail} = req.params
  try {
    await OrderTable.updateOne(
      {
        _id: orderId,
        "table.sharedWith": {
          $elemMatch: { guestEmail: guestEmail, rated: false }, 
        },
      },
      {
        $set: { "table.sharedWith.$.rated": true }, 
      }
    );
    const newReviews = await Review.create(reviews);
    console.log("newReview", newReviews)
    // loop for sum the rating for each meal
    for(let review of newReviews){
      console.log("rating", review.rating)
      // for each value get the mealId
      const meal = await Meal.findById(review.mealId);
      meal.reviews.push(review._id);
      // go to the DB and update (sum) the rating field
      console.log("before", meal.rating.totalRating)
      meal.rating.totalRating += review.rating;
      console.log("after", meal.rating.totalRating)
      // and again in this iteration sum the number of people
      meal.rating.numberPeople += 1;

      await meal.save()
    }


    res.status(201).json({
      success: true,
      msg: "The review has been successfully added.",
      reviews: newReviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message || "The review was not added successfully.",
      error: error,
    });
  }
};
