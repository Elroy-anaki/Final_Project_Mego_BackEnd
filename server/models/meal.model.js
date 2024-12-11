import mongoose, { Schema, model } from "mongoose";

const mealSchema = new Schema({
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
    mealCategories:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Categories',
            },
    ],
    reviews: {
        type: [
            {
                ref: 'Reviews',
                type: mongoose.Schema.Types.ObjectId
            }
        ],
        required: true,
        default: []
    }
}, { timestamps: true })

const Meal = model("Meals", mealSchema);

export default Meal;