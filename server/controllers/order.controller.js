import Order from "../models/order.model.js";
import Table from "../models/table.model.js";

export const addOrder = async (req, res) => {
  try {
    console.log(req.body);
    const { newOrder, cartId } = req.body;
    console.log("new order", newOrder);
    console.log("cart id", cartId);

    const order = await Order.create(newOrder);
    await Table.findByIdAndDelete(cartId);
    res.status(200).json({
      success: true,
      msg: "Create Order successfully",
      data: order,
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

export const getOrderByUserId = async (req, res) => {
  try {
    const order = await Order.findOne({ userId: req.params.id })
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
