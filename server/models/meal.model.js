import mongoose, { Schema, model } from "mongoose";

const mealModel = new Schema({
    mealName: {
        type: String,
        required: true,
        unique: true
    },
    mealPrice: {
        type: Number,
        required: true,
    },
    mealImage: {
        type: String,
        required: true,
        default: ""
    },
    ingredients: {
        type: [String],
        required: true
    },
    amoutnOfCalories: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: {
        type: [
            {
                ref: 'Reviews',
                type: mongoose.Schema.Types.ObjectId
            }
        ],
        required: true,
        unique: true,
        default: []
    }
}, { timestamps: true })

const Meal = model("Meals",mealModel);

export default Meal;