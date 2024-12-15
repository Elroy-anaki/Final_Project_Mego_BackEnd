import mongoose,  { Schema, model } from "mongoose";

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
        match: /^\d{16}$/
      },
      cardHolderName: {
        type: String,
        required: true
      },
      expirationDate: {
        type: String,
        required: true,
        match: /^(0[1-9]|1[0-2])\/([0-9]{2})$/
      },
      paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'paid'],
        default: 'pending'
      },
      amount: {
        type: Number,
        required: true
      }
    },
    customerInfo: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
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

    specialRequests:{
      type: String,
    },
    orderPrice: {
      type: Number,
      required: true,
      default: 0
    },
    codeCoupon: {
      type: String,
      default: null
    }
    
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;
