import mongoose, { Schema, model } from "mongoose";

const tableSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
        unique: true
    },
    guests: {
        type: [String],
        default: []
    },
    meals: [
        {
            mealId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Meals',
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    }

}, { timestamps: true })




const Table = model("Tables", tableSchema);

export default Table;