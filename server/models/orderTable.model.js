import mongoose, { Schema, model } from "mongoose";

const orderTableSchema = new Schema(
  {
    dateTime: {
      date: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
    numberOfGuests: {
      type: Number,
      required: true,
    },
    payment: {
      cardNumber: {
        type: String,
        required: false,
        match: /^\d{16}$/,
      },
      cardHolderName: {
        type: String,
        required: false,
      },
      expirationDate: {
        type: String,
        required: false,
        match: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      },
    },
    user: {
      userName: {
        type: String,
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: false,
        default: null
      },
    },

    status: {
      type: String,
      enum: ["paid", "eating", "completed"],
      default: "paid",
    },
    table: {
      sharedWith: {
        type: [Object],
        required: false,
      },
      meals: [
        {
          meal: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Meals",
            required: false,
          },

          quantity: {
            type: Number,
            required: false,
          },
        },
      ],
      totalPrice: {type: Number, required: true, default: 0}
    },



    specialRequests: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);


orderTableSchema.pre('save', async function (next) {
  console.log("_________________________________________________________")
  await this.populate('table.meals.meal');
  console.log("Populated meals:", this.table.meals);
  
  const totalPrice = this.table.meals.reduce((acc, mealItem) => {
    const mealPrice = mealItem.meal.mealPrice || 0; 
    return acc + mealPrice * mealItem.quantity;
  }, 0);

  this.table.totalPrice = totalPrice;

  console.log("Calculated Total Price:", totalPrice);
  next();
});

const OrderTable = model("OrderTable", orderTableSchema);

export default OrderTable;
