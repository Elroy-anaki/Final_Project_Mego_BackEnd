import mongoose, { Schema, model } from "mongoose";

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
    },
    categoryImage: {
        type: String,
        required: true,
        default: ""
    },
    
}, { timestamps: true })

const Category = model("Categories",categorySchema);

export default Category;