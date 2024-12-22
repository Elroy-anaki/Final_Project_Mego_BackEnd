import mongoose, { Schema, model } from "mongoose";

const OrderTableSchema = new Schema(
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
        required: true,
        match: /^\d{16}$/,
      },
      cardHolderName: {
        type: String,
        required: true,
      },
      expirationDate: {
        type: String,
        required: true,
        match: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      },
    },
    userId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    }],

    status: {
      type: String,
      enum: ["pending", "completed", "paid"],
      default: "pending",
    },
    cart: {
      
    },

    meals: [
      {
        mealId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Meals",
        },
        quantity: Number,
      },
    ],

    specialRequests: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = model("OrderTable", OrderTableSchema);

export default Order;
