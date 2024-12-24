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
      enum: ["pending", "completed", "paid", "reviewed"],
      default: "pending",
    },
    table: {
      SharedWith: {
        type: [String],
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
    },



    specialRequests: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Order = model("OrderTable", OrderTableSchema);

export default Order;
