import mongoose, { Schema, model } from "mongoose";

const tableSchema = new Schema({
    user: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
            unique: true,
        },
        userName: { type: String, required: true }
    },
    sharedWith: {
        type: [Object],
        
    },
    meals: [
        {
            meal: {
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

    }

}, { timestamps: true })


tableSchema.pre('save', async function (next) {
    await this.populate('meals.meal');
    
    const totalPrice = this.meals.reduce((total, mealItem) => {
      const mealPrice = mealItem.meal.mealPrice || 0; 
      return total + mealPrice * mealItem.quantity;
    }, 0);
  
    this.totalPrice = totalPrice;
  
    console.log("Calculated Total Price:", totalPrice);
    next();
  });

const Table = model("Tables", tableSchema);

export default Table;