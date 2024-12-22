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
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Meals',
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    total: {
        type: Number,
        required: true
    }

}, { timestamps: true })




const Table = model("Tables", tableSchema);

export default Table;