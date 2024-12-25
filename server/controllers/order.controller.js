import Order from "../models/order.model.js";
import Restaurant from "../models/restaurant.model.js";
import { buildOrderObj } from '../utils/order.utils.js'



export const addOrder = async (req, res) => {
  try {
    const { order, cartId } = req.body;

    const fullOrder = await buildOrderObj(order, cartId);
    const newOrder = await Order.create(fullOrder);

    const restaurant = await Restaurant.findOne();

    if (!restaurant) throw new Error("Restaurant Not Found!")

    const { dateTime } = newOrder;
    const { date, time } = dateTime;

    const dateIndex = restaurant.restaurantOccupancyTime.findIndex((entry) => entry.date === date);

    if (dateIndex !== -1) {
      const slots = restaurant.restaurantOccupancyTime[dateIndex].slots;
      const slotIndex = slots.findIndex((slot) => slot.time === time);

      if (slotIndex !== -1) {
        slots[slotIndex].reserved += newOrder.numberOfGuests;
        slots[slotIndex].remaining -= newOrder.numberOfGuests;

      } else {
        slots.push({
          time,
          reserved: newOrder.numberOfGuests,
          remaining: restaurant.restaurantMaxOccupancy - newOrder.numberOfGuests,
        });
      }
    } else {
      restaurant.restaurantOccupancyTime.push({
        date,
        slots: [
          {
            time,
            reserved: newOrder.numberOfGuests,
            remaining: restaurant.restaurantMaxOccupancy - newOrder.numberOfGuests,
          },
        ],
      });
    }

    await restaurant.save();

    res.status(200).json({
      success: true,
      msg: "Create Order successfully",
      data: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: error.message || "Create Order Failed",
      error,
    });
  }
};


export const getAllOrders = async (req, res) => {
  console.log("orders");

  try {
    const orders = await Order.find()
      .populate({
        path: "cart.userId",
        select: "userName userEmail",
      })
      .populate({
        path: "cart.meals",
        populate: {
          path: "mealId",
          select: "mealName mealPrice mealImage",
        },
      })
      .exec();

    console.log(orders);
    res
      .status(200)
      .json({ success: true, msg: "success get all orders", data: orders });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      msg: error.message || "not success get all orders",
      error,
    });
  }
};

export const getOrderByOrderId = async (req, res) => {
  console.log(req.params)
  const {orderId, guestEmail} = req.query;
  try {
    const order = await Order.findOne({
      _id: orderId,
      "table.SharedWith":{$elemMatch:{ guestEmail: guestEmail, rated: false }} })
      .populate({
        path: "user.userId",
        select: "userName userEmail",
      })
      .populate({
        path: "table.meals",
        populate: {
          path: "meal",
          select: "mealName mealPrice mealImage",
        },
      })
    console.log(order)
      // TODO if the email doesn't exist or rated already
    res
      .status(200)
      .json({
        success: true,
        msg: "success get order by user id",
        data: order,
      });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      msg: error.message || "not success get order by user id",
      error,
    });
  }
};

export const editOrderById = async (req, res) => {
  console.log("edit-------Order------By-------Id");
  console.log(req.params.id);
  console.log(req.body);
  try {
    const editedOrder = await Order.findByIdAndUpdate(
      req.params.id,

      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: "Order Edited!",
      data: editedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: error.message || "Order NOT Edited!",
      error,
    });
  }
};

export const deleteOrderById = async (req, res) => {
  console.log(req.params.id);
  try {
    const orderToDelete = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      msg: "Order deleted successfully!",
      data: orderToDelete,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      msg: error.message || "Order NOT deleted successfully!",
      error,
    });
  }
};
