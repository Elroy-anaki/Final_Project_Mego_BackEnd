import mongoose, { Schema, model } from "mongoose";

const reviewsModel = new Schema({
    userName: {
        type: String,
        default: "John Doe"
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false
      },
      mealId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meals',    
        required: true
      },
      rating: {
        type: Number,
        required: true,
        min: 0 ,
        max: 5
      },
      comment: {
        type: String,
        required: false
      }
   
}, { timestamps: true })

const Review = model("Reviews",reviewsModel);

export default Review;