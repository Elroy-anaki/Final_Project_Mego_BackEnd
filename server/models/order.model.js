import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema(
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
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ueals",
    },

    status: {
      type: String,
      enum: ["pending", "completed", "paid"],
      default: "pending",
    },
    cart: {
      
    },

    meals: [
      {
        meal: {
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

const Order = model("Order", orderSchema);

export default Order;
