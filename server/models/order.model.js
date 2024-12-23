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
      name: {
        type: String,
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: false,
      },
    },

    status: {
      type: String,
      enum: ["pending", "completed", "paid"],
      default: "pending",
    },
    cart: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: false,
      },
      guests: {
        type: [String],
        required: false,
      },
      meals: [
        {
          mealId: {
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

    // meals: [
    //   {
    //     mealId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Meals",
    //     },
    //     quantity: Number,
    //   },
    // ],

    specialRequests: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Order = model("OrderTable", OrderTableSchema);

export default Order;
