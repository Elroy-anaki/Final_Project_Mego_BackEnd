import mongoose, { Schema, model } from "mongoose";

const mealCategoriesModel = new Schema({
    mealCategoriesName: {
        type: String,
        required: true,
        unique: true
    },
    mealCategoriesImage: {
        type: String,
        required: true,
        default: ""
    },
    
}, { timestamps: true })

const MealCategories = model("MealCategories",mealCategoriesModel);

export default MealCategories;