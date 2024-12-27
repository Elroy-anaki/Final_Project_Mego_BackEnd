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
    },
    rating: {
        totalRating: {type: Number, default: 0},
        numberPeople: {type: Number, default: 0},
        avgOfRating: {type: Number, default: 0}
    }
}, { timestamps: true })

mealSchema.pre('save', function(next){
    this.rating.avgOfRating = (this.rating.totalRating / this.rating.numberPeople)
    console.log(this.rating.avgOfRating)
    next()
})

const Meal = model("Meals", mealSchema);

export default Meal;