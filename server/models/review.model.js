import mongoose, { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  user:{
    name: {
        type: String,
        default: "John Doe"
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false,
        default: null
      }},
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

const Review = model("Reviews",reviewSchema);

export default Review;